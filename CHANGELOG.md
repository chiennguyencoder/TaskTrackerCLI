# Changelog

Tất cả các thay đổi quan trọng của project sẽ được ghi lại ở đây.

## [1.0.0] - 2025-08-06

### Thêm mới
- ✅ Lệnh `add` để thêm task mới
- ✅ Lệnh `list` để liệt kê tất cả tasks
- ✅ Lệnh `list-todo`, `list-in-progress`, `list-done` để lọc theo trạng thái
- ✅ Lệnh `update` để cập nhật mô tả task
- ✅ Lệnh `delete` để xóa task
- ✅ Lệnh `mark-in-progress` để đánh dấu task đang thực hiện
- ✅ Lệnh `mark-done` để đánh dấu task hoàn thành
- ✅ Lưu trữ dữ liệu trong file JSON
- ✅ Interface màu sắc với chalk
- ✅ Timestamps cho mỗi task (tạo và cập nhật)
- ✅ Validation cho các lệnh
- ✅ Help menu chi tiết
- ✅ File README.md với hướng dẫn sử dụng
- ✅ File examples.js để demo

### Tính năng
- **Task Management**: Thêm, sửa, xóa tasks
- **Status Tracking**: Ba trạng thái (todo, in-progress, done)
- **Filtering**: Lọc tasks theo trạng thái
- **Persistent Storage**: Lưu trữ trong file tasks.json
- **Rich CLI**: Interface đẹp với màu sắc và icons
- **Timestamps**: Theo dõi thời gian tạo và cập nhật

### Cấu trúc dữ liệu
```json
{
  "id": 1,
  "description": "Task description",
  "status": "todo|in-progress|done",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### Dependencies
- `commander@^14.0.0` - CLI framework
- `chalk@^4.x` - Màu sắc terminal
- `inquirer@^12.9.0` - Interactive prompts (reserved for future use)
