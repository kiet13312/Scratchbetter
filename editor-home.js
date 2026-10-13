(() => {
  if (document.getElementById("scratchbetter-home-shortcut")) return;

  const style = document.createElement("style");
  style.id = "scratchbetter-easy-style";
  style.textContent = [
    "#sb-easy-launcher{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:max(10px,env(safe-area-inset-bottom));z-index:2147483646;min-height:44px;padding:0 15px;border:0;border-radius:14px;background:#5436b5;color:#fff;font:800 13px/1 system-ui,sans-serif;box-shadow:0 5px 18px #24134b44;touch-action:manipulation}",
    "#sb-easy-panel{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:max(62px,calc(env(safe-area-inset-bottom) + 62px));z-index:2147483646;width:min(300px,calc(100vw - 20px));max-height:72vh;overflow:auto;padding:14px;border:1px solid #e2dbf5;border-radius:18px;background:#fff;color:#29233b;font:14px/1.45 system-ui,sans-serif;box-shadow:0 12px 36px #21133d44}",
    "#sb-easy-panel[hidden]{display:none!important}",
    ".sb-easy-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}",
    ".sb-easy-head strong,.sb-easy-head small{display:block}",
    ".sb-easy-head strong{font-size:16px}.sb-easy-head small{margin-top:2px;color:#736c83;font-size:11px}",
    ".sb-easy-close{width:36px;height:36px;border:0;border-radius:10px;background:#f1eef8;color:#4a4160;font-size:24px}",
    ".sb-easy-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
    ".sb-easy-actions button{min-height:44px;padding:8px 9px;border:1px solid #e7e1f4;border-radius:11px;background:#f8f6fd;color:#33294c;font:750 12px/1.3 system-ui,sans-serif;touch-action:manipulation}",
    ".sb-easy-actions button:active{transform:scale(.98)}",
    ".sb-easy-help{margin-top:13px;padding:11px;border-radius:12px;background:#f5f2fc}",
    ".sb-easy-help strong{font-size:12px}.sb-easy-help ol{margin:7px 0 0;padding-left:19px;color:#625b72;font-size:12px}.sb-easy-help li+li{margin-top:5px}",
    "#sb-easy-toast{position:fixed;left:10px;bottom:max(64px,calc(env(safe-area-inset-bottom) + 64px));z-index:2147483647;max-width:min(330px,calc(100vw - 20px));padding:11px 13px;border-radius:12px;background:#29213f;color:#fff;font:12px/1.45 system-ui,sans-serif;box-shadow:0 6px 20px #0003}",
    "#scratchbetter-home-shortcut{position:fixed;right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));z-index:2147483646;display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 12px;border:1px solid rgba(255,255,255,.25);border-radius:12px;background:rgba(43,31,79,.94);color:#fff;font:750 12px/1 system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 15px #0003;backdrop-filter:blur(8px)}",
    "button,a{touch-action:manipulation}",
    ".blocklyTreeRow{min-height:38px;display:flex;align-items:center}",
    ".blocklyTreeLabel{padding-top:7px;padding-bottom:7px}",
    ".blocklyWidgetDiv input,.blocklyWidgetDiv textarea{font-size:16px!important}"
  ].join("");
  document.head.appendChild(style);

  const home = document.createElement("a");
  home.id = "scratchbetter-home-shortcut";
  home.href = "../";
  home.textContent = "⌂ Trang chủ";
  home.setAttribute("aria-label", "Quay về trang chủ ScratchBetter");

  const launcher = document.createElement("button");
  launcher.id = "sb-easy-launcher";
  launcher.type = "button";
  launcher.textContent = "⚡ Dễ dùng";
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "sb-easy-panel");

  const panel = document.createElement("section");
  panel.id = "sb-easy-panel";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Công cụ dễ dùng");
  panel.innerHTML = [
    '<div class="sb-easy-head"><div><strong>ScratchBetter</strong><small>Công cụ nhanh cho điện thoại</small></div><button class="sb-easy-close" type="button" data-close aria-label="Đóng">×</button></div>',
    '<div class="sb-easy-actions">',
    '<button type="button" data-action="run">▶ Chạy chương trình</button>',
    '<button type="button" data-action="stop">■ Dừng chương trình</button>',
    '<button type="button" data-action="save">💾 Lưu dự án .sb3</button>',
    '<button type="button" data-action="open">📂 Mở dự án .sb3</button>',
    '</div>',
    '<div class="sb-easy-help"><strong>Làm dự án nhanh</strong><ol>',
    '<li>Chọn nhân vật cần lập trình.</li>',
    '<li>Kéo khối sự kiện “khi bấm cờ xanh” vào vùng lệnh.</li>',
    '<li>Ghép các khối bên dưới rồi nhấn <b>Chạy chương trình</b>.</li>',
    '<li>Dùng <b>Lưu dự án .sb3</b> để giữ bản sao trên máy.</li>',
    '</ol></div>'
  ].join("");

  const toast = document.createElement("div");
  toast.id = "sb-easy-toast";
  toast.hidden = true;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  document.body.append(home, launcher, panel, toast);

  let toastTimer;
  const notify = (message) => {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
  };

  const togglePanel = (force) => {
    const open = typeof force === "boolean" ? force : panel.hidden;
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
  };
  launcher.addEventListener("click", () => togglePanel());
  panel.querySelector("[data-close]").addEventListener("click", () => togglePanel(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") togglePanel(false);
  });

  const clickVisible = (root, matcher) => {
    const elements = root.querySelectorAll('button,[role="button"],[role="menuitem"],[role="menuitemcheckbox"],[class*="menu-bar-item"],img[title],img[alt]');
    for (const element of elements) {
      if (!element.isConnected || element.getClientRects().length === 0) continue;
      const label = [
        element.innerText,
        element.textContent,
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.getAttribute("alt")
      ].filter(Boolean).join(" ").replace(/\s+/g, " ").trim().toLowerCase();
      if (label && matcher.test(label)) {
        element.click();
        return true;
      }
    }
    return false;
  };

  const doRun = () => {
    const button = document.querySelector('img[title="Go"],img[title="Green Flag"],img[alt*="green flag" i]');
    if (button) button.click();
    else notify("Không tìm thấy nút cờ xanh. Hãy nhấn nút cờ xanh gốc trên sân khấu.");
  };
  const doStop = () => {
    const button = document.querySelector('img[title="Stop"],img[alt="Stop" i]');
    if (button) button.click();
    else notify("Không tìm thấy nút dừng. Hãy nhấn nút dừng gốc cạnh cờ xanh.");
  };

  const doFileAction = (kind) => {
    const isSave = kind === "save";
    const actionPattern = isSave
      ? /save to your computer|save to computer|lưu.{0,35}(máy tính|thiết bị|máy)/
      : /load from your computer|open from your computer|tải.{0,35}(máy tính|thiết bị|máy)|mở.{0,35}(máy tính|thiết bị|máy)/;
    if (clickVisible(document, actionPattern)) return;

    const menuRoot = document.querySelector('[class*="menu-bar_menu-bar"]') ||
      document.querySelector('[class*="menu-bar"]') || document;
    const opened = clickVisible(menuRoot, /^(file|tệp|tập tin)(\s|$)/);
    if (opened) {
      setTimeout(() => {
        if (!clickVisible(document, actionPattern)) {
          notify(isSave
            ? "Mở menu File (Tệp) → Save to your computer (Lưu về máy) để lưu .sb3."
            : "Mở menu File (Tệp) → Load from your computer (Mở từ máy) rồi chọn tệp .sb3.");
        }
      }, 220);
    } else {
      notify(isSave
        ? "Mở menu File (Tệp) → Save to your computer (Lưu về máy) để lưu .sb3."
        : "Mở menu File (Tệp) → Load from your computer (Mở từ máy) rồi chọn tệp .sb3.");
    }
  };

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    switch (button.dataset.action) {
      case "run": doRun(); break;
      case "stop": doStop(); break;
      case "save": doFileAction("save"); break;
      case "open": doFileAction("open"); break;
    }
  });
})();