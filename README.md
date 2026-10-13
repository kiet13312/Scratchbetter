# ScratchBetter

ScratchBetter là ứng dụng Scratch dùng cá nhân trên Android. Ứng dụng mở thẳng trình biên tập Scratch 3, không còn màn hình trang chủ cũ.

## Thay đổi chính

- Trình biên tập Scratch được đặt ngay ở thư mục gốc của ứng dụng để các tệp giao diện và JavaScript tải đúng đường dẫn.
- App Android tự khóa ở chế độ ngang (landscape), để thấy rõ danh mục khối lệnh, vùng kéo-thả và sân khấu.
- Chỉ thêm một nút hướng dẫn nhỏ; phần kéo-thả và chạy chương trình là trình biên tập Scratch thật.
- Giữ khả năng lưu và mở dự án .sb3 bằng menu File (Tệp) của Scratch.
- Build APK debug tự động bằng GitHub Actions.

## Build APK

Mở tab Actions của repo, chọn workflow Build ScratchBetter APK, rồi chọn Run workflow. Khi kết thúc thành công, tải artifact ScratchBetter-landscape-debug-apk.

Lần build tải và biên dịch mã nguồn Scratch nên có thể mất vài phút. APK debug là bản thử nghiệm cá nhân, chưa phải bản phát hành chính thức.

## Mã nguồn và giấy phép

- Engine: https://github.com/scratchfoundation/scratch-editor
- Engine commit: 0207c22d62b654cc3a28300b633c66fabf1de4d4
- Giấy phép engine: GNU AGPL-3.0-only; giấy phép gốc được chép vào APK.
- ScratchBetter là dự án độc lập, không phải ứng dụng chính thức và không được Scratch Foundation/MIT bảo trợ.
