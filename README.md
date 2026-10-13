# ScratchBetter

ScratchBetter là ứng dụng lập trình bằng khối lệnh được viết riêng cho dự án này. Ứng dụng không nhúng Scratch Editor và không tải mã nguồn Scratch trong lúc build.

## Hiện có

- Giao diện tiếng Việt được tối ưu cho điện thoại đặt ngang.
- Thêm khối bằng cách chạm, kéo thả bằng cảm ứng hoặc chuột, và sắp xếp lại thứ tự lệnh.
- Khối di chuyển, xoay, đổi tọa độ, nói/suy nghĩ, hiện/ẩn, đổi cỡ, đổi dáng, đổi phông, đợi, lặp lại và sự kiện chạm nhân vật.
- Vòng lặp và sự kiện có vùng riêng để thả những khối cần thực thi.
- Sân khấu xem trước, bốn nhân vật biểu tượng, bốn phông nền và nút chạy/dừng/đặt lại.
- Tự lưu trong bộ nhớ ứng dụng; xuất/mở bản sao dự án dạng JSON.
- Có thể chạy offline sau khi cài app.

## Build APK Android

1. Mở tab Actions của repo.
2. Chọn workflow **Build ScratchBetter APK**.
3. Chọn **Run workflow** hoặc mở lần chạy tự động sau commit.
4. Khi hoàn tất thành công, tải artifact **ScratchBetter-landscape-debug-apk**.

Đây là bản debug dùng thử cá nhân. ScratchBetter là dự án độc lập; giao diện, bộ khối, trình chạy lệnh và phần sân khấu do dự án tự viết. Đây không phải ứng dụng chính thức của Scratch.
