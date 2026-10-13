# ScratchBetter

ScratchBetter là bản thử nghiệm dành cho **một người dùng trên Android**. Mục tiêu là giữ trình biên tập dự án Scratch 3 làm nền, nhưng có màn hình bắt đầu đơn giản và hướng dẫn lưu/mở tệp rõ ràng.

## Có gì trong bản đầu

- Trình biên tập Scratch 3 được build từ mã nguồn công khai của Scratch Foundation.
- Màn hình bắt đầu bằng tiếng Việt, ưu tiên màn hình điện thoại.
- Không cần đăng nhập để mở trình biên tập; dự án được lưu/mở bằng tệp `.sb3` trên thiết bị.
- GitHub Actions có thể build APK debug để cài thử.

Đây là **bản nền ban đầu**, chưa có thư viện dự án tự lưu riêng trong ứng dụng, và chưa phải bản APK phát hành ổn định. Trong trình biên tập, dùng menu **File → Save to your computer** để lưu và **File → Load from your computer** để mở tệp `.sb3`.

## Build APK

1. Mở tab **Actions** của repo này.
2. Chọn workflow **Build ScratchBetter APK**.
3. Nhấn **Run workflow**.
4. Khi chạy xong, mở lần chạy đó và tải artifact **ScratchBetter-debug-apk**.

APK debug chỉ để thử nghiệm cá nhân; không phải bản phát hành trên Play Store.

## Công nghệ và ghi công

- Engine: [scratchfoundation/scratch-editor](https://github.com/scratchfoundation/scratch-editor)
- Engine được build tại commit: `0207c22d62b654cc3a28300b633c66fabf1de4d4`
- Mã nguồn Scratch Editor được phát hành theo **GNU AGPL-3.0-only**. Xem [giấy phép gốc](https://github.com/scratchfoundation/scratch-editor/blob/0207c22d62b654cc3a28300b633c66fabf1de4d4/LICENSE).
- Scratch, biểu trưng Scratch và các nhãn hiệu liên quan thuộc chủ sở hữu tương ứng. ScratchBetter là dự án độc lập, không phải ứng dụng chính thức và không được Scratch Foundation/MIT bảo trợ.

Mọi thay đổi dựa trên engine AGPL phải tuân thủ giấy phép đó. Không dùng tên/biểu trưng Scratch để khiến người khác tưởng đây là ứng dụng chính thức.
