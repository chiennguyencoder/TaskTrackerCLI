#! /usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const program = new Command();
const tasksFile = path.join(__dirname, 'tasks.json');

// Utility functions
function loadTasks() {
    try {
        if (fs.existsSync(tasksFile)) {
            const data = fs.readFileSync(tasksFile, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error(chalk.red('Error loading tasks:', error.message));
        return [];
    }
}

function saveTasks(tasks) {
    try {
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error(chalk.red('Error saving tasks:', error.message));
    }
}

function generateId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

// Task status constants
const STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
};

// CLI Commands
program
    .name('task-tracker')
    .description('CLI để quản lý tasks')
    .version('1.0.0');

// Add new task
program
    .command('add <description>')
    .description('Thêm task mới')
    .action((description) => {
        const tasks = loadTasks();
        const newTask = {
            id: generateId(tasks),
            description: description,
            status: STATUS.TODO,
            createdAt: getCurrentTimestamp(),
            updatedAt: getCurrentTimestamp()
        };
        
        tasks.push(newTask);
        saveTasks(tasks);
        
        console.log(chalk.green(`✓ Task được thêm thành công (ID: ${newTask.id})`));
    });

// Update task
program
    .command('update <id> <description>')
    .description('Cập nhật mô tả của task')
    .action((id, description) => {
        const tasks = loadTasks();
        const taskId = parseInt(id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) {
            console.log(chalk.red(`✗ Không tìm thấy task với ID: ${taskId}`));
            return;
        }
        
        tasks[taskIndex].description = description;
        tasks[taskIndex].updatedAt = getCurrentTimestamp();
        saveTasks(tasks);
        
        console.log(chalk.green(`✓ Task ${taskId} đã được cập nhật`));
    });

// Delete task
program
    .command('delete <id>')
    .description('Xóa task')
    .action((id) => {
        const tasks = loadTasks();
        const taskId = parseInt(id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) {
            console.log(chalk.red(`✗ Không tìm thấy task với ID: ${taskId}`));
            return;
        }
        
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        
        console.log(chalk.green(`✓ Task ${taskId} đã được xóa`));
    });

// Mark task as in-progress
program
    .command('mark-in-progress <id>')
    .description('Đánh dấu task đang thực hiện')
    .action((id) => {
        const tasks = loadTasks();
        const taskId = parseInt(id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) {
            console.log(chalk.red(`✗ Không tìm thấy task với ID: ${taskId}`));
            return;
        }
        
        tasks[taskIndex].status = STATUS.IN_PROGRESS;
        tasks[taskIndex].updatedAt = getCurrentTimestamp();
        saveTasks(tasks);
        
        console.log(chalk.yellow(`✓ Task ${taskId} đã được đánh dấu là đang thực hiện`));
    });

// Mark task as done
program
    .command('mark-done <id>')
    .description('Đánh dấu task hoàn thành')
    .action((id) => {
        const tasks = loadTasks();
        const taskId = parseInt(id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) {
            console.log(chalk.red(`✗ Không tìm thấy task với ID: ${taskId}`));
            return;
        }
        
        tasks[taskIndex].status = STATUS.DONE;
        tasks[taskIndex].updatedAt = getCurrentTimestamp();
        saveTasks(tasks);
        
        console.log(chalk.green(`✓ Task ${taskId} đã được đánh dấu hoàn thành`));
    });

// List tasks
function displayTasks(tasks, filterStatus = null) {
    if (tasks.length === 0) {
        console.log(chalk.gray('Không có task nào.'));
        return;
    }
    
    const filteredTasks = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;
    
    if (filteredTasks.length === 0) {
        console.log(chalk.gray(`Không có task nào với trạng thái: ${filterStatus}`));
        return;
    }
    
    console.log('\n' + chalk.bold('DANH SÁCH TASKS:'));
    console.log('─'.repeat(80));
    
    filteredTasks.forEach(task => {
        let statusColor;
        let statusIcon;
        
        switch (task.status) {
            case STATUS.TODO:
                statusColor = chalk.gray;
                statusIcon = '○';
                break;
            case STATUS.IN_PROGRESS:
                statusColor = chalk.yellow;
                statusIcon = '◐';
                break;
            case STATUS.DONE:
                statusColor = chalk.green;
                statusIcon = '●';
                break;
        }
        
        console.log(`${statusIcon} [${chalk.cyan(task.id)}] ${statusColor(task.description)}`);
        console.log(`   Trạng thái: ${statusColor(task.status.toUpperCase())}`);
        console.log(`   Tạo lúc: ${chalk.dim(new Date(task.createdAt).toLocaleString())}`);
        console.log(`   Cập nhật: ${chalk.dim(new Date(task.updatedAt).toLocaleString())}`);
        console.log('');
    });
}

program
    .command('list')
    .description('Liệt kê tất cả tasks')
    .action(() => {
        const tasks = loadTasks();
        displayTasks(tasks);
    });

// List tasks by status
program
    .command('list-done')
    .description('Liệt kê tasks đã hoàn thành')
    .action(() => {
        const tasks = loadTasks();
        displayTasks(tasks, STATUS.DONE);
    });

program
    .command('list-todo')
    .description('Liệt kê tasks chưa làm')
    .action(() => {
        const tasks = loadTasks();
        displayTasks(tasks, STATUS.TODO);
    });

program
    .command('list-in-progress')
    .description('Liệt kê tasks đang thực hiện')
    .action(() => {
        const tasks = loadTasks();
        displayTasks(tasks, STATUS.IN_PROGRESS);
    });

// Show help by default
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse();
