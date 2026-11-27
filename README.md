# THACO AUTO Nghệ An - Hệ thống Quản trị Kế hoạch & Vận hành
> *Giao diện trực quan, tinh tế phong cách Notion — Chuyên biệt hóa cho nghiệp vụ Trợ lý Kế hoạch.*

---

## 🎯 1. Giới thiệu Dự án
Hệ thống được thiết kế theo đúng phạm vi nghiệp vụ cốt lõi của **Trợ lý Kế hoạch tại THACO AUTO Nghệ An**:
1. **Quản trị Kế hoạch & Mục tiêu**: Triển khai kế hoạch, tổng hợp số liệu tiến độ KPI, phân tích nguyên nhân sai lệch và chủ động tham mưu các giải pháp nâng cao tỷ lệ hoàn thành mục tiêu chung.
2. **Hệ thống Quy trình, Quy định & Tuân thủ**: Chuẩn hóa thư viện tài liệu quản trị (Quy chế, Quy định, SOP, Biểu mẫu); tổ chức thực thi và giám sát kiểm soát tuân thủ (Checklist & Kế hoạch hành động CAPA).
3. **Cơ cấu Tổ chức & Ma trận RACI**: Trực quan hóa sơ đồ cây bộ máy đơn vị, mô tả chức năng nhiệm vụ và bảng phân nhiệm RACI liên phòng ban.
4. **Chuyển đổi số & Cải tiến Vận hành**: Theo dõi các dự án số hóa (Dashboard BI Realtime, Tra cứu quy trình trực tuyến, Mobile Checklist 5S) và đo lường hiệu quả định lượng.

---

## 🚀 2. Tính năng nổi bật phong cách Notion
* **Giao diện Tối giản, Sang trọng**: Typography chuẩn mực (`Plus Jakarta Sans`), hỗ trợ chế độ **Sáng (Light)** và **Tối (Dark)**.
* **Thanh điều hướng phân cấp (Collapsible Sidebar)**: Thu gọn / Mở rộng linh hoạt, tích hợp huy hiệu đếm số lượng tài liệu/kế hoạch.
* **Tìm kiếm toàn năng (`Ctrl + K`)**: Command Palette tìm kiếm tức thì theo mã hiệu, tên mục tiêu, quy trình, nhân sự.
* **Đa chế độ xem (Multi-view)**:
  * *Table View*: Lọc theo phòng ban, trạng thái, xem trực quan tiến độ % và ý kiến tham mưu.
  * *Kanban Board*: Kéo thả theo các pha: *Đang thực hiện*, *Cần chú ý / Có rủi ro*, *Đã hoàn thành*.
* **Sổ tay Tham mưu Chiến lược**: Trực tiếp ghi chú khuyến nghị và cập nhật danh sách hành động (Checklist) gửi Ban Giám đốc.
* **Xuất Báo cáo Tức thì**: Tự động tổng hợp báo cáo điều hành sang file định dạng Markdown chuẩn chỉ với 1 click.

---

## 🛠️ 3. Cài đặt & Chạy trên máy nội bộ (Local)

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Dev server)**:
   ```bash
   npm run dev
   ```
   *Truy cập trình duyệt tại: `http://localhost:5173`*

3. **Biên dịch bản chạy chính thức (Production Build)**:
   ```bash
   npm run build
   ```
   *Toàn bộ website tĩnh sẽ được tạo trong thư mục `dist/`.*

---

## 🌐 4. Hướng dẫn Deploy lên GitHub Pages (Miễn phí 100%)

Hệ thống đã được tích hợp sẵn tệp cấu hình **GitHub Actions CI/CD** tại [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Các bước đẩy lên GitHub:
1. Tạo một repository mới trên tài khoản GitHub của bạn (ví dụ đặt tên là `thaco-governance`).
2. Mở Terminal tại thư mục này và liên kết repo:
   ```bash
   git init
   git add .
   git commit -m "feat: he thong quan tri ke hoach notion-style"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/thaco-governance.git
   git push -u origin main
   ```
3. Trên GitHub, vào mục **Settings** của repository:
   * Chọn tab **Pages** (ở menu bên trái).
   * Tại mục **Build and deployment > Source**, chọn: **GitHub Actions**.
4. GitHub sẽ tự động build và xuất bản trang web của bạn tại địa chỉ:
   `https://<tai-khoan-cua-ban>.github.io/thaco-governance/`

---

*Hệ thống được phát triển chuyên nghiệp, sẵn sàng đưa vào ứng dụng thực tế tại đơn vị.*
