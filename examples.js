#!/usr/bin/env node

/**
 * Example sử dụng TaskTracker CLI
 * Chạy: node examples.js
 */

const { exec } = require('child_process');
const path = require('path');

const cliPath = path.join(__dirname, 'index.js');

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(`node ${cliPath} ${command}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}

async function demo() {
    console.log('🚀 TaskTracker CLI Demo\n');
    
    try {
        // Thêm tasks
        console.log('1. Thêm các tasks mới...');
        await runCommand('add "Hoàn thành dự án web"');
        await runCommand('add "Đọc sách Clean Code"');
        await runCommand('add "Học TypeScript"');
        await runCommand('add "Viết blog về Node.js"');
        
        // Liệt kê tất cả
        console.log('\n2. Danh sách tất cả tasks:');
        const allTasks = await runCommand('list');
        console.log(allTasks);
        
        // Đánh dấu một số tasks
        console.log('3. Cập nhật trạng thái...');
        await runCommand('mark-in-progress 1');
        await runCommand('mark-done 2');
        
        // Cập nhật mô tả
        await runCommand('update 3 "Học TypeScript từ cơ bản đến nâng cao"');
        
        // Liệt kê theo trạng thái
        console.log('\n4. Tasks đang thực hiện:');
        const inProgress = await runCommand('list-in-progress');
        console.log(inProgress);
        
        console.log('5. Tasks đã hoàn thành:');
        const done = await runCommand('list-done');
        console.log(done);
        
        console.log('6. Tasks chưa làm:');
        const todo = await runCommand('list-todo');
        console.log(todo);
        
        console.log('\n✅ Demo hoàn thành!');
        console.log('\nCác lệnh khả dụng:');
        const help = await runCommand('--help');
        console.log(help);
        
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

// Chạy demo
if (require.main === module) {
    demo();
}

module.exports = { demo };
