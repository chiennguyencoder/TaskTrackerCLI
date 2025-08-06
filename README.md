# Task Tracker CLI

CLI đơn giản để quản lý tasks được viết bằng JavaScript.

## Cài đặt

```bash
npm install
```

## Sử dụng

### Các lệnh cơ bản:

#### 1. Thêm task mới
```bash
node index.js add "Học JavaScript"
```

#### 2. Liệt kê tất cả tasks
```bash
node index.js list
```

#### 3. Liệt kê tasks theo trạng thái
```bash
# Tasks chưa làm
node index.js list-todo

# Tasks đang thực hiện
node index.js list-in-progress

# Tasks đã hoàn thành
node index.js list-done
```

#### 4. Cập nhật task
```bash
node index.js update 1 "Học JavaScript nâng cao"
```

#### 5. Đánh dấu trạng thái task
```bash
# Đánh dấu đang thực hiện
node index.js mark-in-progress 1

# Đánh dấu hoàn thành
node index.js mark-done 1
```

#### 6. Xóa task
```bash
node index.js delete 1
```

#### 7. Xem help
```bash
node index.js --help
```

## Tính năng

- ✅ Thêm, sửa, xóa tasks
- ✅ Đánh dấu trạng thái: todo, in-progress, done
- ✅ Lọc tasks theo trạng thái
- ✅ Lưu trữ persistent trong file JSON
- ✅ Interface đẹp với màu sắc
- ✅ Timestamp cho mỗi task

## Cấu trúc dữ liệu

Tasks được lưu trong file `tasks.json` với cấu trúc:

```json
[
  {
    "id": 1,
    "description": "Học JavaScript",
    "status": "todo",
    "createdAt": "2025-08-06T10:30:00.000Z",
    "updatedAt": "2025-08-06T10:30:00.000Z"
  }
]
```

## Trạng thái task

- `todo`: Chưa bắt đầu (○)
- `in-progress`: Đang thực hiện (◐)
- `done`: Hoàn thành (●)

## Example Usage

```bash
# Thêm một vài tasks
node index.js add "Hoàn thành dự án CLI"
node index.js add "Đọc sách Node.js"
node index.js add "Viết unit tests"

# Xem danh sách
node index.js list

# Bắt đầu làm task đầu tiên
node index.js mark-in-progress 1

# Hoàn thành task
node index.js mark-done 1

# Xem chỉ tasks đã hoàn thành
node index.js list-done
```

Submit : [https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)