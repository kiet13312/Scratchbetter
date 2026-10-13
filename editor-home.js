(() => {
  if (document.getElementById("sb-help-trigger")) return;

  const style = document.createElement("style");
  style.id = "sb-mobile-style";
  style.textContent = [
    "html,body,#app{width:100%;height:100%;min-height:0;overflow:hidden;overscroll-behavior:none}",
    "button,a{touch-action:manipulation}",
    ".blocklyTreeRow{min-height:36px;display:flex;align-items:center}",
    ".blocklyTreeLabel{padding-top:6px;padding-bottom:6px}",
    ".blocklyWidgetDiv input,.blocklyWidgetDiv textarea{font-size:16px!important}",
    "@media (orientation:landscape) and (max-height:520px){.blocklyTreeRow{min-height:30px}.blocklyTreeLabel{font-size:12px}}",
    "#sb-help-trigger{position:fixed;right:max(8px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));z-index:2147483000;min-width:40px;min-height:40px;padding:0 12px;border:1px solid #d9d0f2;border-radius:13px;background:#5134b2;color:#fff;font:800 12px/1 system-ui,sans-serif;box-shadow:0 3px 12px #22134440}",
    "#sb-help-panel{position:fixed;right:max(8px,env(safe-area-inset-right));bottom:max(56px,calc(env(safe-area-inset-bottom) + 56px));z-index:2147483001;width:min(310px,calc(100vw - 16px));max-height:70dvh;overflow:auto;padding:15px;border:1px solid #ded7ef;border-radius:16px;background:#fff;color:#29243a;font:13px/1.5 system-ui,sans-serif;box-shadow:0 10px 30px #21113d4a}",
    "#sb-help-panel[hidden]{display:none!important}",
    "#sb-help-panel h2{margin:0 0 8px;font-size:17px}#sb-help-panel p{margin:7px 0;color:#514b61}",
    "#sb-help-panel ol{padding-left:20px;margin:8px 0}#sb-help-panel li{margin:5px 0}",
    "#sb-help-panel .sb-close{float:right;min-width:34px;min-height:34px;border:0;border-radius:9px;background:#f1eef8;color:#352b4b;font-size:21px}"
  ].join("");
  document.head.appendChild(style);

  const trigger = document.createElement("button");
  trigger.id = "sb-help-trigger";
  trigger.type = "button";
  trigger.textContent = "? Hướng dẫn";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "sb-help-panel");

  const panel = document.createElement("aside");
  panel.id = "sb-help-panel";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Hướng dẫn lập trình bằng khối lệnh");
  panel.innerHTML = [
    '<button type="button" class="sb-close" aria-label="Đóng">×</button>',
    "<h2>Bắt đầu lập trình</h2>",
    "<p><b>Chỗ kéo thả:</b> vùng lớn ở giữa màn hình trong tab <b>Mã lệnh (Code)</b>. Kéo khối từ danh mục bên trái vào đó, rồi ghép các khối lại với nhau.</p>",
    "<ol>",
    "<li>Chọn nhân vật ở danh sách phía dưới sân khấu.</li>",
    "<li>Chọn tab <b>Mã lệnh / Code</b>.</li>",
    "<li>Kéo khối <b>khi bấm cờ xanh</b> vào vùng giữa, rồi ghép khối chuyển động hoặc hiển thị vào dưới nó.</li>",
    "<li>Nhấn cờ xanh để chạy thử.</li>",
    "</ol>",
    "<p><b>Lưu:</b> mở menu <b>File (Tệp)</b> → <b>Save to your computer</b>. Mở lại bằng <b>Load from your computer</b>, chọn tệp .sb3.</p>"
  ].join("");

  document.body.append(trigger, panel);
  const setOpen = (open) => {
    panel.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
  };
  trigger.addEventListener("click", () => setOpen(panel.hidden));
  panel.querySelector(".sb-close").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();