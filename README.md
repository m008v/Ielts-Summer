# IELTS Summer Dashboard

Dự án trực quan hóa kế hoạch học hè IELTS 60 ngày. 
Ứng dụng kết hợp giữa **React (Vite)** cho Frontend và **PHP** cho Backend API.

## Tính năng
- Xem kế hoạch Thử thách 60 ngày học IELTS.
- Lộ trình A (Nền tảng): Dành cho học viên bắt đầu lại từ đầu hoặc cần xây chắc nền tiếng Anh (mục tiêu 6.0+).
- Lộ trình B (Nâng cao): Dành cho học viên đã có nền tảng nhưng cần phá vỡ "trần" band 6.0-6.5 để lên mức cao hơn.
- Giao diện dạng thẻ (Cards) tích hợp Popup (Modal) để xem chi tiết bài học từng ngày theo lộ trình.

## Cấu trúc dự án
- `api.php`: Server API viết bằng PHP để phục vụ dữ liệu.
- `data.json`: Database tĩnh chứa thông tin khóa học và lộ trình.
- `src/`: Thư mục chứa mã nguồn React Frontend.
- `public/`: Chứa các tệp tĩnh.

## Yêu cầu cài đặt
Để chạy ứng dụng, bạn cần cài đặt:
- [Node.js](https://nodejs.org/) (Khuyến nghị bản LTS)
- [PHP](https://www.php.net/) (Đã thêm vào biến môi trường PATH để dùng command `php`)

## Hướng dẫn chạy dự án

Bạn cần mở **2 cửa sổ Terminal** tại thư mục gốc của dự án này.

### 1. Chạy Backend (PHP)
Mở cửa sổ Terminal thứ nhất và chạy lệnh sau để khởi động PHP Server ở cổng `8000`:
```bash
php -S localhost:8000
```
*API sẽ có sẵn tại: `http://localhost:8000/api.php`*

### 2. Chạy Frontend (React)
Mở cửa sổ Terminal thứ hai, cài đặt các gói phụ thuộc (nếu chưa cài) và khởi động Vite Server:
```bash
npm install
npm run dev
```

Sau khi chạy xong, Vite sẽ cung cấp một đường link localhost (thường là `http://localhost:5173/`).
Mở link đó trong trình duyệt web để bắt đầu sử dụng ứng dụng.

## Tùy chỉnh Dữ liệu
Bạn có thể dễ dàng thay đổi lịch học hoặc lộ trình bằng cách chỉnh sửa trực tiếp nội dung trong tệp `data.json`.
Sau khi lưu tệp, tải lại trang web (F5) để xem những thay đổi mới.
