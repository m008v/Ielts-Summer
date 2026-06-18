<div align="center">
  <img src="./public/favicon.svg" width="100" height="100" alt="IELTS Summer Logo">
  <h1>IELTS Summer 🎯</h1>
  <p><b>Nền tảng học và luyện thi IELTS 60 Ngày (Premium UI/UX)</b></p>

  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge&logo=php)](https://php.net/)
  [![Nginx Ready](https://img.shields.io/badge/Nginx-cPanel_Ready-009639?style=for-the-badge&logo=nginx)](https://nginx.org/)
</div>

<br />

## 📖 Giới thiệu dự án

**IELTS Summer** là một ứng dụng Web giáo dục (EdTech) toàn diện, được thiết kế chuyên biệt để đồng hành cùng người học trong chiến dịch ôn thi IELTS cấp tốc hoặc xây dựng nền tảng dài hạn. 

Thay vì những tài liệu PDF khô khan hay các website học tập với giao diện cũ kỹ, IELTS Summer mang đến một trải nghiệm học tập **sang trọng, hiện đại và tập trung tối đa** thông qua ngôn ngữ thiết kế Glassmorphism, kết hợp cùng chế độ Dark/Light mode linh hoạt. Hệ thống được chia thành 2 lộ trình học tập song song, đi kèm với 112+ bài tập thực hành được chấm điểm tự động ngay lập tức.

---

## ✨ Tính năng nổi bật (Key Features)

### 📚 Hệ thống Bài học & Lộ trình Cá nhân hóa
* **Thử thách 60 Ngày (60-Day Challenge):** Bảng Dashboard theo dõi nhiệm vụ học tập liên tục trong 60 ngày để hình thành thói quen.
* **Lộ trình A (Foundation to 6.0+):** Dành cho người mất gốc, kẹt ở band 3.0 - 5.0. Tập trung xây dựng bộ xương ngôn ngữ, ngữ pháp nền tảng.
* **Lộ trình B (Trần Band 6.0+):** Dành cho học viên đã có nền tảng. Tập trung giải quyết các lỗi sai hệ thống, tăng độ sâu lập luận và từ vựng học thuật.
* **Bài giảng lý thuyết chuyên sâu (Deep Dive):** Các bài học được render bằng Markdown sắc nét. Kết hợp tinh tế giữa font chữ `Be Vietnam Pro` (UI hiện đại) và `Times New Roman` (chữ có chân chuẩn Academic cho văn bản lý thuyết).

### 📝 Hệ thống Luyện tập (Auto-Grading Practice)
* **112+ Bài Mini-Test độc quyền:** Kho bài tập phong phú bám sát nội dung bài học từng ngày, không có bài nào trùng lặp.
* **Chấm điểm theo thời gian thực:** Hỗ trợ đa dạng câu hỏi từ trắc nghiệm (True/False/Not Given) đến điền từ. Hệ thống thuật toán linh hoạt chấp nhận nhiều biến thể đáp án (chữ hoa, chữ thường, viết tắt).
* **Lưu trữ tiến độ (Persistent State):** Tự động lưu đáp án và điểm số của người dùng xuống Local Storage. Đóng trình duyệt mở lại không bao giờ mất bài.
* **Đánh dấu đã học:** Nút "Đánh dấu Đã học xong" giúp bôi xám (grayscale) ngày học, làm mờ và gạch ngang nội dung để dễ dàng quản lý tiến độ.

### 🎨 UI/UX Hạng Thương Gia (Premium Design)
* **Chế độ Sáng/Tối (Dark & Light Mode):** Chuyển đổi siêu mượt mà với bộ biến số CSS Variables chuẩn chỉ.
* **Glassmorphism:** Hiệu ứng thẻ kính mờ (backdrop-filter) mang lại cảm giác cực kỳ tương lai và sang trọng.
* **Micro-animations:** Mọi thao tác cuộn, mở chi tiết (Accordion), hover nút bấm đều đi kèm với các chuyển động mượt mà (0.2s - 0.4s cubic-bezier).

### 🚀 Tối ưu hóa Chuẩn SEO & Routing
* **React Router v6:** Hệ thống định tuyến mạnh mẽ, tách biệt từng Tuần học thành các URL độc lập (vd: `/route-a/tuan/1`). Dễ dàng copy link chia sẻ.
* **Tự động thay đổi Meta Tags (Helmet):** Mỗi khi chuyển trang, tiêu đề Tab (Title) và các thẻ Description, Open Graph (OG), Twitter Card sẽ tự động thay đổi tương ứng với bài học, biến đây thành một ứng dụng cực kỳ thân thiện với Google Search.

---

## 🛠 Ngôn ngữ & Công nghệ sử dụng

Ứng dụng được chia làm 2 phần độc lập nhưng giao tiếp mượt mà qua API:

**Frontend:**
* **React 18:** Thư viện UI cốt lõi.
* **Vite:** Công cụ Build & Development server siêu tốc.
* **React Router DOM (v6):** Quản lý định tuyến trang (SPA).
* **React Helmet Async:** Xử lý thẻ Meta SEO động.
* **React Markdown:** Render nội dung bài giảng phong phú.
* **Lucide React:** Bộ thư viện Icon tinh tế, sắc nét.
* **Vanilla CSS3:** Code CSS thuần tuân thủ biến số (CSS Variables) mà không phụ thuộc vào Framework bên thứ 3.

**Backend:**
* **PHP:** Cung cấp API tĩnh (`api.php`) để phục vụ dữ liệu.
* **JSON (`data.json`):** Đóng vai trò như một Database NoSQL siêu nhẹ, lưu trữ toàn bộ nội dung giáo trình khổng lồ.

---

## 📂 Cấu trúc Thư mục (Folder Structure)

```text
IELTS-SUMMER/
├── public/                 # File tĩnh (Favicon, robots.txt)
│   └── .htaccess           # Cấu hình điều hướng cho cPanel/Apache
├── src/                    # Mã nguồn chính (Frontend)
│   ├── App.jsx             # Component Gốc (Chứa Layout, Routing & Logic chính)
│   ├── index.css           # Toàn bộ linh hồn giao diện (Theme, Animations, Layout)
│   └── main.jsx            # Entry point (Khởi tạo React Root, Helmet, Router)
├── api.php                 # Backend API (Đọc dữ liệu từ JSON trả về Client)
├── data.json               # Kho Dữ liệu Khổng lồ (Lộ trình, Bài học, Bài tập)
├── generate_112_unique.cjs # Script Node.js tự động sinh dữ liệu thực hành unique
├── package.json            # Quản lý dependencies NPM
├── vite.config.js          # Cấu hình Vite (Tích hợp Proxy gọi API cục bộ)
└── README.md               # Tài liệu bạn đang đọc
```

---

## 💻 Hướng dẫn Cài đặt & Chạy ở máy cá nhân (Local Development)

Để chạy dự án này trên máy của bạn, bạn cần cài đặt **Node.js** và **PHP**.

**1. Clone dự án và cài đặt thư viện Frontend:**
```bash
# Di chuyển vào thư mục dự án
cd IELTS-SUMMER

# Cài đặt các gói thư viện phụ thuộc
npm install
```

**2. Khởi động Backend (PHP Server):**
Mở một cửa sổ Terminal mới và chạy lệnh sau để khởi động PHP Server ở cổng 8000:
```bash
php -S localhost:8000
```

**3. Khởi động Frontend (Vite Server):**
Quay lại Terminal cũ, chạy lệnh khởi động React:
```bash
npm run dev
```
Truy cập vào `http://localhost:5173` để trải nghiệm ứng dụng. *(Lưu ý: Vite đã được cấu hình proxy để tự động điều hướng các request `/api.php` sang cổng 8000 của PHP).*

---

## 🌍 Hướng dẫn Triển khai (Deployment lên cPanel / VPS)

Ứng dụng đã được cấu hình sẵn sàng 100% để triển khai lên các Hosting sử dụng **Nginx** hoặc **Apache (cPanel)**.

### Triển khai lên cPanel (chỉ 3 phút):
1. **Build Frontend:** Chạy lệnh `npm run build` trên máy cá nhân. Hệ thống sẽ tạo ra một thư mục tên là `dist`.
2. **Upload Frontend:** Đăng nhập cPanel, vào File Manager -> `public_html`. Chọn toàn bộ các file bên trong thư mục `dist` (bao gồm cả file `.htaccess` ẩn) và Upload lên.
3. **Upload Backend:** Upload tiếp 2 file là `api.php` và `data.json` trực tiếp vào chung thư mục `public_html` đó.
4. **Xong!** cPanel sẽ tự động xử lý PHP. File `.htaccess` đi kèm sẽ lo việc điều hướng React Router (tránh lỗi 404 khi người dùng F5 tải lại trang). Do đường dẫn API đã được cấu hình tương đối `fetch('/api.php')`, nó sẽ tự động nhận diện Domain thực tế của bạn.

---

## 🔮 Lộ trình Phát triển tương lai (Roadmap)
Dự án được xây dựng với kiến trúc mở, rất dễ dàng để tích hợp thêm các tính năng nâng cao trong giai đoạn 2:
- [ ] **Hệ thống Database Thực thụ:** Thay thế `data.json` bằng MySQL/PostgreSQL và viết các API CRUD đầy đủ bằng PHP/Laravel.
- [ ] **Tài khoản Người dùng (Authentication):** Chuyển từ việc lưu tiến độ bằng LocalStorage sang lưu trên Cloud, hỗ trợ đăng nhập đa thiết bị.
- [ ] **Tích hợp Listening (Audio Player):** Thêm trình phát Audio để người dùng thi thử chức năng nghe trực tiếp.
- [ ] **Tích hợp Trí tuệ Nhân tạo (AI Grader):** Kết nối API của OpenAI/Gemini để tự động chấm điểm và chữa lỗi chi tiết cho kỹ năng Writing Task 1 & Task 2.

---

<div align="center">
  <i>Được phát triển với ❤️ nhằm mang lại trải nghiệm học IELTS tuyệt vời nhất.</i>
</div>
