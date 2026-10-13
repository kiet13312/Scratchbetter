(() => {
  if (document.getElementById("scratchbetter-home-shortcut")) return;

  const link = document.createElement("a");
  link.id = "scratchbetter-home-shortcut";
  link.href = "../";
  link.textContent = "⌂ Trang chủ";
  link.setAttribute("aria-label", "Quay về trang chủ ScratchBetter");
  Object.assign(link.style, {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    zIndex: "2147483647",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "36px",
    padding: "0 12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.25)",
    background: "rgba(43, 31, 79, .92)",
    color: "#fff",
    font: "700 12px/1 system-ui, sans-serif",
    textDecoration: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,.18)",
    backdropFilter: "blur(8px)"
  });
  document.body.appendChild(link);
})();