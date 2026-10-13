const dialog = document.getElementById("help-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogCopy = document.getElementById("dialog-copy");
const dialogSteps = document.getElementById("dialog-steps");
const dialogAction = document.getElementById("dialog-action");
const dialogSymbol = document.getElementById("dialog-symbol");
let installPrompt = null;

const helpContent = {
  open: {
    symbol: "▣",
    title: "Mở dự án đã lưu",
    copy: "Dự án Scratch được lưu thành tệp .sb3. Mở tệp đó bằng trình biên tập để tiếp tục làm.",
    steps: [
      "Mở trình biên tập.",
      "Chọn File → Load from your computer.",
      "Chọn tệp .sb3 trong thư mục Tải xuống hoặc thư mục bạn đã lưu."
    ],
    action: "Mở trình biên tập"
  },
  save: {
    symbol: "↓",
    title: "Lưu dự án về điện thoại",
    copy: "Hãy lưu bản sao .sb3 để có thể mở lại ngay cả khi không đăng nhập.",
    steps: [
      "Trong trình biên tập, mở menu File.",
      "Chọn Save to your computer.",
      "Tìm tệp .sb3 trong thư mục Tải xuống của điện thoại."
    ],
    action: "Mở trình biên tập"
  }
};

function showGuide(type) {
  const data = helpContent[type];
  if (!data) return;
  dialogSymbol.textContent = data.symbol;
  dialogTitle.textContent = data.title;
  dialogCopy.textContent = data.copy;
  dialogAction.textContent = data.action;
  dialogSteps.replaceChildren(...data.steps.map((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    return item;
  }));
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.alert(data.title + "\n\n" + data.steps.join("\n"));
}

document.getElementById("open-project").addEventListener("click", () => showGuide("open"));
document.getElementById("open-guide").addEventListener("click", () => showGuide("open"));
document.getElementById("save-guide").addEventListener("click", () => showGuide("save"));

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  const button = document.getElementById("install-app");
  button.hidden = false;
  button.addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    button.hidden = true;
  }, { once: true });
});

window.addEventListener("appinstalled", () => {
  document.getElementById("install-app").hidden = true;
  installPrompt = null;
});

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.info("ScratchBetter offline cache is unavailable in this browser.", error);
    });
  });
}