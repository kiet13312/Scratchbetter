(() => {
  "use strict";

  const STORAGE_KEY = "khoivui.project.v1";
  const sprites = {
    cat: { name: "Mèo Mây", emoji: "🐱" },
    robot: { name: "Rô-bốt Tí Hon", emoji: "🤖" },
    astronaut: { name: "Phi Hành Gia", emoji: "🧑‍🚀" },
    fish: { name: "Cá Bong Bóng", emoji: "🐠" },
    custom: { name: "Nhân vật tự vẽ", emoji: "🎨" }
  };
  const backdrops = [
    { value: "garden", label: "Vườn xanh" },
    { value: "night", label: "Đêm sao" },
    { value: "sea", label: "Biển xanh" },
    { value: "sunset", label: "Hoàng hôn" }
  ];
  const categories = {
    motion: { label: "Di chuyển", color: "#4286f5", icon: "↗" },
    looks: { label: "Hiển thị", color: "#9b62d8", icon: "◉" },
    control: { label: "Điều khiển", color: "#e6a33f", icon: "⟳" },
    events: { label: "Sự kiện", color: "#34a981", icon: "⚑" },
    data: { label: "Biến", color: "#d99a31", icon: "▦" }
  };
  const defs = {
    move: { category: "motion", label: "di chuyển", icon: "↗", fields: [{ key: "steps", type: "number", value: 40, suffix: "bước", min: -500, max: 500 }] },
    turn: { category: "motion", label: "xoay", icon: "⤾", fields: [{ key: "degrees", type: "number", value: 30, suffix: "độ", min: -360, max: 360 }] },
    goTo: { category: "motion", label: "đi đến", icon: "⌖", fields: [{ key: "x", type: "number", value: 0, prefix: "x", min: -220, max: 220 }, { key: "y", type: "number", value: 0, prefix: "y", min: -140, max: 140 }] },
    changeX: { category: "motion", label: "đổi vị trí X", icon: "↔", fields: [{ key: "amount", type: "number", value: 30, suffix: "bước", min: -300, max: 300 }] },
    changeY: { category: "motion", label: "đổi vị trí Y", icon: "↕", fields: [{ key: "amount", type: "number", value: 25, suffix: "bước", min: -250, max: 250 }] },
    say: { category: "looks", label: "nói", icon: "💬", fields: [{ key: "text", type: "text", value: "Xin chào!", wide: true }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] },
    think: { category: "looks", label: "suy nghĩ", icon: "☁", fields: [{ key: "text", type: "text", value: "Mình đang nghĩ...", wide: true }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] },
    show: { category: "looks", label: "hiện nhân vật", icon: "◉", fields: [] },
    hide: { category: "looks", label: "ẩn nhân vật", icon: "⊘", fields: [] },
    size: { category: "looks", label: "đặt cỡ", icon: "⤢", fields: [{ key: "percent", type: "number", value: 100, suffix: "%", min: 20, max: 220 }] },
    costume: { category: "looks", label: "đổi dáng", icon: "♧", fields: [] },
    backdrop: { category: "looks", label: "đổi phông", icon: "▧", fields: [{ key: "scene", type: "select", value: "garden", options: backdrops.map(item => ({ value: item.value, label: item.label })) }] },
    wait: { category: "control", label: "đợi", icon: "◷", fields: [{ key: "seconds", type: "number", value: 1, suffix: "giây", min: 0, max: 30 }] },
    repeat: { category: "control", label: "lặp lại", icon: "⟳", fields: [{ key: "times", type: "number", value: 3, suffix: "lần", min: 1, max: 30 }], nested: true },
    spin: { category: "control", label: "xoay nhanh", icon: "✧", fields: [{ key: "times", type: "number", value: 4, suffix: "lần", min: 1, max: 20 }] },
    forever: { category: "control", label: "liên tục", icon: "∞", fields: [], nested: true },
    ifVar: { category: "control", label: "nếu biến", icon: "◆", fields: [
      { key: "variableId", type: "variable", value: "" },
      { key: "operator", type: "select", value: "eq", options: [{ value: "eq", label: "=" }, { value: "neq", label: "≠" }, { value: "gt", label: ">" }, { value: "lt", label: "<" }] },
      { key: "testValue", type: "text", value: "0" }
    ], nested: true },
    whenTap: { category: "events", label: "khi chạm nhân vật", icon: "☝", fields: [], nested: true },
    setVar: { category: "data", label: "đặt biến", icon: "＝", fields: [{ key: "variableId", type: "variable", value: "" }, { key: "value", type: "text", value: "0", wide: true }] },
    changeVar: { category: "data", label: "thay đổi biến", icon: "＋", fields: [{ key: "variableId", type: "variable", value: "" }, { key: "amount", type: "number", value: 1, min: -999999, max: 999999 }] },
    showVar: { category: "data", label: "hiện biến", icon: "◉", fields: [{ key: "variableId", type: "variable", value: "" }] },
    hideVar: { category: "data", label: "ẩn biến", icon: "⊘", fields: [{ key: "variableId", type: "variable", value: "" }] },
    sayVar: { category: "data", label: "nói giá trị biến", icon: "▤", fields: [{ key: "variableId", type: "variable", value: "" }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] },
    listAdd: { category: "data", label: "thêm vào danh sách", icon: "＋", fields: [{ key: "listId", type: "list", value: "" }, { key: "item", type: "text", value: "mục mới", wide: true }] },
    listDelete: { category: "data", label: "xóa mục", icon: "−", fields: [{ key: "listId", type: "list", value: "" }, { key: "index", type: "number", value: 1, min: 1, max: 500, suffix: "vị trí" }] },
    listInsert: { category: "data", label: "chèn vào vị trí", icon: "↳", fields: [{ key: "listId", type: "list", value: "" }, { key: "item", type: "text", value: "mục mới", wide: true }, { key: "index", type: "number", value: 1, min: 1, max: 500 }] },
    listReplace: { category: "data", label: "thay mục", icon: "↻", fields: [{ key: "listId", type: "list", value: "" }, { key: "index", type: "number", value: 1, min: 1, max: 500 }, { key: "item", type: "text", value: "mục mới", wide: true }] },
    listClear: { category: "data", label: "xóa hết danh sách", icon: "▤", fields: [{ key: "listId", type: "list", value: "" }] },
    listSay: { category: "data", label: "nói nội dung danh sách", icon: "☰", fields: [{ key: "listId", type: "list", value: "" }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] },
    listLength: { category: "data", label: "nói độ dài danh sách", icon: "≡", fields: [{ key: "listId", type: "list", value: "" }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] },
    listItem: { category: "data", label: "nói mục ở vị trí", icon: "№", fields: [{ key: "listId", type: "list", value: "" }, { key: "index", type: "number", value: 1, min: 1, max: 500 }, { key: "seconds", type: "number", value: 2, suffix: "giây", min: 0, max: 30 }] }
  };
  const paletteOrder = {
    motion: ["move", "turn", "goTo", "changeX", "changeY"],
    looks: ["say", "think", "show", "hide", "size", "costume", "backdrop"],
    control: ["wait", "repeat", "forever", "ifVar", "spin"],
    events: ["whenTap"],
    data: ["setVar", "changeVar", "showVar", "hideVar", "sayVar", "listAdd", "listDelete", "listInsert", "listReplace", "listClear", "listSay", "listLength", "listItem"]
  };

  const $ = id => document.getElementById(id);
  const ui = {
    projectName: $("projectName"), saveState: $("saveState"), categoryTabs: $("categoryTabs"),
    paletteBlocks: $("paletteBlocks"), paletteTitle: $("paletteTitle"), programBlocks: $("programBlocks"),
    workspace: $("workspace"), workspacePanel: $("workspacePanel"), blockCount: $("blockCount"),
    stageScene: $("stageScene"), actor: $("actor"), actorEmoji: $("actorEmoji"), actorName: $("actorName"),
    actorStatus: $("actorStatus"), statX: $("statX"), statY: $("statY"), statSize: $("statSize"),
    speechBubble: $("speechBubble"), runStatus: $("runStatus"), toast: $("toast"), fileInput: $("projectFileInput"),
    helpOverlay: $("helpOverlay"), variablesOverlay: $("variablesOverlay"), variableMonitors: $("variableMonitors"), listMonitors: $("listMonitors")
  };

  let idCounter = 1;
  let activeCategory = "motion";
  let toastTimer = 0;
  let runToken = 0;
  let running = false;
  let currentRunPromise = null;
  let actorTapHandlers = [];
  let actorTapBusy = false;
  let suppressClickUntil = 0;
  let pendingPointer = null;
  let actorState = { x: 0, y: 0, rotation: 0, size: 100, visible: true, sprite: "cat", costumeIndex: 0 };
  let project = { version: 2, name: "Dự án đầu tiên", sprite: "cat", backdrop: "garden", blocks: [], variables: [], lists: [], customSprite: "" }

  const clamp = (number, min, max) => Math.min(max, Math.max(min, number));
  const toNumber = (value, fallback, min, max) => {
    const number = Number(value);
    return clamp(Number.isFinite(number) ? number : fallback, min, max);
  };
  const safeText = (value, fallback = "") => typeof value === "string" ? value.slice(0, 300) : fallback;
  const makeBlock = type => {
    const def = defs[type];
    const block = { id: "b" + idCounter++, type };
    for (const field of def.fields) block[field.key] = field.value;
    if (def.nested) block.children = [];
    return block;
  };
  const initialProject = () => ({ version: 2, name: "Dự án đầu tiên", sprite: "cat", backdrop: "garden", blocks: [], variables: [], lists: [], customSprite: "" });

  function notify(message) {
    ui.toast.textContent = message;
    ui.toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { ui.toast.hidden = true; }, 2300);
  }

  function markSaved(message = "Đã lưu trên máy") {
    ui.saveState.innerHTML = '<span class="status-dot"></span>' + message;
  }

  function setUnsaved() {
    ui.saveState.innerHTML = '<span class="status-dot" style="background:#efb24d"></span>Đang cập nhật…';
    window.clearTimeout(setUnsaved.timer);
    setUnsaved.timer = window.setTimeout(() => saveToStorage(false), 350);
  }

  function saveToStorage(showMessage = true) {
    try {
      project.name = safeText(ui.projectName.value, "Dự án của tôi").trim() || "Dự án của tôi";
      project.sprite = actorState.sprite;
      project.backdrop = ui.stageScene.dataset.backdrop || "garden";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      markSaved();
      if (showMessage) notify("Đã lưu dự án trên thiết bị này.");
      return true;
    } catch (error) {
      markSaved("Không thể lưu");
      if (showMessage) notify("Bộ nhớ app không cho lưu. Hãy dùng Xuất để tạo tệp dự án.");
      return false;
    }
  }

  function countBlocks(blocks = project.blocks) {
    return blocks.reduce((total, block) => total + 1 + (block.children ? countBlocks(block.children) : 0), 0);
  }

  function fieldNode(field, block) {
    const wrap = document.createElement("span");
    wrap.className = "field-wrap";
    if (field.prefix) {
      const prefix = document.createElement("span"); prefix.textContent = field.prefix; wrap.appendChild(prefix);
    }
    let input;
    if (field.type === "select" || field.type === "variable" || field.type === "list") {
      input = document.createElement("select"); input.className = "block-field variable-field";
      input.setAttribute("aria-label", field.type === "variable" ? "Chọn biến" : field.type === "list" ? "Chọn danh sách" : field.key);
      const options = field.type === "variable" ? project.variables.map(v => ({ value: v.id, label: v.name })) : field.type === "list" ? project.lists.map(v => ({ value: v.id, label: v.name })) : field.options;
      if ((field.type === "variable" || field.type === "list") && !options.length) { const node=document.createElement("option");node.value="";node.textContent=field.type === "list" ? "tạo danh sách trước" : "tạo biến trước";node.disabled=true;input.appendChild(node); }
      options.forEach(option => { const node=document.createElement("option");node.value=option.value;node.textContent=option.label;input.appendChild(node); });
      input.value = String(block[field.key] ?? field.value);
    } else {
      input = document.createElement("input");
      input.className = "block-field" + (field.wide ? " field-wide" : "");
      input.type = field.type === "text" ? "text" : "number";
      input.value = String(block[field.key] ?? field.value);
      input.setAttribute("aria-label", field.key);
      if (field.type === "number") {
        input.min = String(field.min ?? -999);
        input.max = String(field.max ?? 999);
        input.step = "1";
      } else input.maxLength = "200";
    }
    input.dataset.field = field.key;
    input.addEventListener("pointerdown", event => event.stopPropagation());
    wrap.appendChild(input);
    if (field.suffix) {
      const suffix = document.createElement("span"); suffix.textContent = field.suffix; wrap.appendChild(suffix);
    }
    return wrap;
  }

  function renderBlock(block) {
    const def = defs[block.type];
    const el = document.createElement("article");
    el.className = "program-block";
    el.dataset.blockId = block.id;
    el.dataset.type = block.type;
    el.dataset.category = def.category;

    const head = document.createElement("div");
    head.className = "block-head";
    head.title = "Giữ để kéo khối này";
    const handle = document.createElement("span"); handle.className = "block-handle"; handle.textContent = "⠿"; handle.setAttribute("aria-hidden", "true");
    head.appendChild(handle);
    const label = document.createElement("span"); label.className = "block-label"; label.textContent = def.label;
    head.appendChild(label);
    def.fields.forEach(field => head.appendChild(fieldNode(field, block)));
    const del = document.createElement("button"); del.type = "button"; del.className = "block-delete"; del.textContent = "×"; del.title = "Xóa khối"; del.dataset.deleteBlock = block.id;
    del.addEventListener("pointerdown", event => event.stopPropagation());
    head.appendChild(del);
    el.appendChild(head);

    if (def.nested) {
      const childStack = document.createElement("div");
      childStack.className = "nested-stack";
      childStack.dataset.parentId = block.id;
      renderStack(childStack, block.children || [], block.id);
      el.appendChild(childStack);
    }
    return el;
  }

  function renderStack(container, blocks, parentId = "root") {
    container.replaceChildren();
    if (!blocks.length) {
      const zone = document.createElement("div");
      zone.className = "dropzone is-empty";
      zone.dataset.parentId = parentId;
      zone.dataset.index = "0";
      container.appendChild(zone);
      return;
    }
    const firstZone = document.createElement("div");
    firstZone.className = "dropzone"; firstZone.dataset.parentId = parentId; firstZone.dataset.index = "0";
    container.appendChild(firstZone);
    blocks.forEach((block, index) => {
      container.appendChild(renderBlock(block));
      const zone = document.createElement("div");
      zone.className = "dropzone"; zone.dataset.parentId = parentId; zone.dataset.index = String(index + 1);
      container.appendChild(zone);
    });
  }

  function renderProgram() {
    renderStack(ui.programBlocks, project.blocks, "root");
    ui.blockCount.textContent = countBlocks() + " khối";
  }

  function renderPalette() {
    ui.paletteTitle.textContent = categories[activeCategory].label;
    ui.paletteBlocks.replaceChildren();
    paletteOrder[activeCategory].forEach(type => {
      const def = defs[type];
      const button = document.createElement("button");
      button.type = "button"; button.className = "palette-block"; button.dataset.paletteType = type; button.dataset.category = def.category;
      const icon = document.createElement("span"); icon.className = "palette-icon"; icon.textContent = def.icon;
      const text = document.createElement("span"); text.textContent = def.label;
      button.append(icon, text);
      def.fields.slice(0, 1).forEach(field => {
        const summary = document.createElement("span"); summary.style.marginLeft = "auto"; summary.style.opacity = ".85"; summary.textContent = field.type === "text" ? "“…”" : field.type === "variable" ? "biến" : field.type === "list" ? "danh sách" : String(field.value) + (field.suffix || "");
        button.appendChild(summary);
      });
      ui.paletteBlocks.appendChild(button);
    });
    $("manageVariablesBtn").hidden = activeCategory !== "data";
    $("paletteFootText").textContent = activeCategory === "data" ? "Tạo biến trước khi dùng khối" : "Không cần kết nối mạng";
  }

  function findBlock(blocks, id, parent = "root") {
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      if (block.id === id) return { array: blocks, index, block, parent };
      if (block.children) {
        const found = findBlock(block.children, id, block.id);
        if (found) return found;
      }
    }
    return null;
  }

  function getArray(parentId) {
    if (parentId === "root") return project.blocks;
    const found = findBlock(project.blocks, parentId);
    return found && found.block.children ? found.block.children : null;
  }

  function containsBlock(block, targetId) {
    if (block.id === targetId) return true;
    return !!(block.children && block.children.some(child => containsBlock(child, targetId)));
  }

  function placeBlock(type, parentId = "root", index = null) {
    const target = getArray(parentId);
    if (!target) return;
    const block = makeBlock(type);
    const at = index === null ? target.length : clamp(index, 0, target.length);
    target.splice(at, 0, block);
    renderProgram(); setUnsaved();
    notify("Đã thêm khối “" + defs[type].label + "”.");
  }

  function removeBlock(id) {
    const found = findBlock(project.blocks, id);
    if (!found) return;
    found.array.splice(found.index, 1);
    renderProgram(); setUnsaved();
  }

  function resolveDropTarget(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) return null;
    const zone = element.closest(".dropzone");
    if (zone) return { parentId: zone.dataset.parentId || "root", index: Number(zone.dataset.index || 0) };
    const nested = element.closest(".nested-stack");
    if (nested) {
      const arr = getArray(nested.dataset.parentId);
      return arr ? { parentId: nested.dataset.parentId, index: arr.length } : null;
    }
    const program = element.closest("#workspace");
    if (program) return { parentId: "root", index: project.blocks.length };
    return null;
  }

  function moveBlockTo(id, target) {
    if (!target) return false;
    const source = findBlock(project.blocks, id);
    const targetArray = getArray(target.parentId);
    if (!source || !targetArray || containsBlock(source.block, target.parentId)) return false;
    let index = clamp(target.index, 0, targetArray.length);
    if (source.array === targetArray && source.index < index) index--;
    source.array.splice(source.index, 1);
    index = clamp(index, 0, targetArray.length);
    targetArray.splice(index, 0, source.block);
    renderProgram(); setUnsaved();
    return true;
  }

  function setActorPosition() {
    const nx = (actorState.x + 240) / 480 * 100;
    const ny = (145 - actorState.y) / 290 * 100;
    ui.actor.style.left = clamp(nx, 1, 99) + "%";
    ui.actor.style.top = clamp(ny, 3, 94) + "%";
    ui.actor.style.transform = "translate(-50%,-50%) rotate(" + actorState.rotation + "deg) scale(" + (actorState.size / 100) + ")";
    ui.actor.style.opacity = actorState.visible ? "1" : "0";
    if (actorState.sprite === "custom" && project.customSprite) {
      let image = ui.actorEmoji.querySelector("img");
      if (!image) { ui.actorEmoji.replaceChildren(); image = document.createElement("img"); image.alt = "Nhân vật tự vẽ"; ui.actorEmoji.appendChild(image); }
      image.src = project.customSprite;
    } else { ui.actorEmoji.textContent = (sprites[actorState.sprite] || sprites.cat).emoji; }
    ui.actorName.textContent = (sprites[actorState.sprite] || sprites.cat).name;
    ui.statX.textContent = Math.round(actorState.x);
    ui.statY.textContent = Math.round(actorState.y);
    ui.statSize.textContent = Math.round(actorState.size) + "%";
    ui.stageScene.dataset.backdrop = project.backdrop || "garden";
    document.querySelectorAll(".sprite-choice").forEach(button => button.classList.toggle("active", button.dataset.sprite === actorState.sprite));
  }

  function resetActor(keepBackdrop = true) {
    stopProgram(false);
    actorState.x = 0; actorState.y = 0; actorState.rotation = 0; actorState.size = 100; actorState.visible = true; actorState.costumeIndex = 0;
    ui.speechBubble.hidden = true;
    ui.actor.classList.remove("speaking");
    if (!keepBackdrop) project.backdrop = "garden";
    setActorPosition();
    ui.actorStatus.textContent = "Sẵn sàng";
    ui.runStatus.textContent = "Sẵn sàng chạy chương trình";
  }

  const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const isCurrentRun = token => token === runToken;

  async function runBlock(block, token) {
    if (!isCurrentRun(token)) return;
    const n = (key, fallback, min, max) => toNumber(block[key], fallback, min, max);
    switch (block.type) {
      case "move": {
        const radians = actorState.rotation * Math.PI / 180;
        actorState.x = clamp(actorState.x + Math.sin(radians) * n("steps", 40, -500, 500), -220, 220);
        actorState.y = clamp(actorState.y - Math.cos(radians) * n("steps", 40, -500, 500), -135, 135);
        setActorPosition(); await delay(260); break;
      }
      case "turn": actorState.rotation = (actorState.rotation + n("degrees", 30, -360, 360)) % 360; setActorPosition(); await delay(170); break;
      case "goTo": actorState.x = n("x", 0, -220, 220); actorState.y = n("y", 0, -135, 135); setActorPosition(); await delay(220); break;
      case "changeX": actorState.x = clamp(actorState.x + n("amount", 30, -300, 300), -220, 220); setActorPosition(); await delay(200); break;
      case "changeY": actorState.y = clamp(actorState.y + n("amount", 25, -250, 250), -135, 135); setActorPosition(); await delay(200); break;
      case "say":
      case "think":
        ui.speechBubble.textContent = safeText(block.text, "Xin chào!");
        ui.speechBubble.classList.toggle("thinking", block.type === "think");
        ui.speechBubble.hidden = false;
        ui.actor.classList.add("speaking");
        await delay(n("seconds", 2, 0, 30) * 1000);
        if (isCurrentRun(token)) { ui.speechBubble.hidden = true; ui.actor.classList.remove("speaking"); }
        break;
      case "show": actorState.visible = true; setActorPosition(); await delay(100); break;
      case "hide": actorState.visible = false; setActorPosition(); await delay(100); break;
      case "size": actorState.size = n("percent", 100, 20, 220); setActorPosition(); await delay(150); break;
      case "costume": {
        const order = ["cat", "robot", "astronaut", "fish"];
        const current = order.indexOf(actorState.sprite);
        actorState.sprite = order[(current + 1) % order.length]; project.sprite = actorState.sprite; setActorPosition(); await delay(150); break;
      }
      case "backdrop": project.backdrop = backdrops.some(item => item.value === block.scene) ? block.scene : "garden"; setActorPosition(); await delay(150); break;
      case "wait": await delay(n("seconds", 1, 0, 30) * 1000); break;
      case "repeat": {
        const times = n("times", 3, 1, 30);
        for (let i = 0; i < times && isCurrentRun(token); i++) await runStack(block.children || [], token);
        break;
      }
      case "forever": {
        while (isCurrentRun(token)) {
          await runStack(block.children || [], token);
          await delay(80);
        }
        break;
      }
      case "ifVar": {
        const v = project.variables.find(item => item.id === block.variableId);
        if (!v) { notify("Hãy chọn biến trong khối nếu."); break; }
        const leftText = String(v.value ?? "");
        const rightText = String(block.testValue ?? "");
        const bothNumeric = leftText.trim() !== "" && rightText.trim() !== "" && Number.isFinite(Number(leftText)) && Number.isFinite(Number(rightText));
        const left = bothNumeric ? Number(leftText) : leftText;
        const right = bothNumeric ? Number(rightText) : rightText;
        const pass = block.operator === "eq" ? left === right
          : block.operator === "neq" ? left !== right
          : bothNumeric && block.operator === "gt" ? left > right
          : bothNumeric && block.operator === "lt" ? left < right : false;
        if (pass) await runStack(block.children || [], token);
        break;
      }
      case "spin": {
        const times = n("times", 4, 1, 20);
        for (let i = 0; i < times && isCurrentRun(token); i++) {
          actorState.rotation = (actorState.rotation + 90) % 360; setActorPosition(); await delay(120);
        }
        break;
      }
      case "setVar": {
        const v=project.variables.find(item=>item.id===block.variableId);
        if(v){const raw=String(block.value??"");v.value=raw.trim()!==""&&Number.isFinite(Number(raw))?Number(raw):raw;renderVariableValues();}
        else notify("Hãy tạo biến trong mục Biến trước.");
        await delay(80);break;
      }
      case "changeVar": {
        const v=project.variables.find(item=>item.id===block.variableId);
        if(v){const cur=Number(v.value);v.value=(Number.isFinite(cur)?cur:0)+n("amount",1,-999999,999999);renderVariableValues();}
        else notify("Hãy tạo biến trong mục Biến trước.");
        await delay(100);break;
      }
      case "showVar": {
        const v=project.variables.find(item=>item.id===block.variableId);if(v){v.visible=true;renderVariableValues();}else notify("Hãy chọn biến trong khối lệnh.");await delay(80);break;
      }
      case "hideVar": {
        const v=project.variables.find(item=>item.id===block.variableId);if(v){v.visible=false;renderVariableValues();}else notify("Hãy chọn biến trong khối lệnh.");await delay(80);break;
      }
      case "sayVar": {
        const v=project.variables.find(item=>item.id===block.variableId);
        if(!v){notify("Hãy chọn biến trong khối lệnh.");break;}
        ui.speechBubble.textContent=String(v.value??0);ui.speechBubble.classList.remove("thinking");ui.speechBubble.hidden=false;ui.actor.classList.add("speaking");
        await delay(n("seconds",2,0,30)*1000);if(isCurrentRun(token)){ui.speechBubble.hidden=true;ui.actor.classList.remove("speaking");}break;
      }
      case "listAdd": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(list){if(list.items.length>=500)list.items.shift();list.items.push(safeText(block.item,"").slice(0,200));renderListValues();setUnsaved();}
        else notify("Hãy tạo danh sách trong mục Biến trước.");
        await delay(80);break;
      }
      case "listDelete": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(list){const index=n("index",1,1,500)-1;if(index<list.items.length)list.items.splice(index,1);renderLists();renderListValues();setUnsaved();}
        else notify("Hãy chọn danh sách trong khối lệnh.");
        await delay(80);break;
      }
      case "listInsert": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(list){const index=clamp(n("index",1,1,500)-1,0,list.items.length);list.items.splice(index,0,safeText(block.item,"").slice(0,200));if(list.items.length>500)list.items.pop();renderLists();renderListValues();setUnsaved();}
        else notify("Hãy chọn danh sách trong khối lệnh.");
        await delay(80);break;
      }
      case "listReplace": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(list){const index=n("index",1,1,500)-1;if(index<list.items.length&&index>=0)list.items[index]=safeText(block.item,"").slice(0,200);renderLists();renderListValues();setUnsaved();}
        else notify("Hãy chọn danh sách trong khối lệnh.");
        await delay(80);break;
      }
      case "listClear": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(list){list.items.length=0;renderLists();renderListValues();setUnsaved();}
        else notify("Hãy chọn danh sách trong khối lệnh.");
        await delay(80);break;
      }
      case "listLength":
      case "listItem": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(!list){notify("Hãy chọn danh sách trong khối lệnh.");break;}
        const message=block.type==="listLength" ? String(list.items.length) : String(list.items[n("index",1,1,500)-1]??"");
        ui.speechBubble.textContent=message;ui.speechBubble.classList.remove("thinking");ui.speechBubble.hidden=false;ui.actor.classList.add("speaking");
        await delay(n("seconds",2,0,30)*1000);
        if(isCurrentRun(token)){ui.speechBubble.hidden=true;ui.actor.classList.remove("speaking");}
        break;
      }
      case "listSay": {
        const list=project.lists.find(item=>item.id===block.listId);
        if(!list){notify("Hãy chọn danh sách trong khối lệnh.");break;}
        ui.speechBubble.textContent=list.items.join(", ")||"(danh sách trống)";
        ui.speechBubble.classList.remove("thinking");ui.speechBubble.hidden=false;ui.actor.classList.add("speaking");
        await delay(n("seconds",2,0,30)*1000);
        if(isCurrentRun(token)){ui.speechBubble.hidden=true;ui.actor.classList.remove("speaking");}
        break;
      }
      case "whenTap": actorTapHandlers.push({ block, token }); break;
    }
  }

  async function runStack(blocks, token) {
    for (const block of blocks) {
      if (!isCurrentRun(token)) return;
      await runBlock(block, token);
    }
  }

  async function startProgram() {
    if (running) stopProgram(false);
    resetActor(true);
    actorTapHandlers = [];
    running = true;
    const token = ++runToken;
    ui.runBtn.disabled = true;
    ui.actorStatus.textContent = "Đang chạy";
    ui.runStatus.textContent = "Chương trình đang chạy…";
    currentRunPromise = runStack(project.blocks, token);
    try { await currentRunPromise; }
    catch (error) { console.error(error); notify("Chương trình gặp lỗi. Hãy kiểm tra các khối lệnh."); }
    if (isCurrentRun(token)) {
      running = false;
      ui.runBtn.disabled = false;
      ui.actorStatus.textContent = actorTapHandlers.length ? "Đang chờ chạm" : "Hoàn tất";
      ui.runStatus.textContent = actorTapHandlers.length ? "Chạm vào nhân vật để chạy khối sự kiện màu xanh" : "Đã chạy hết các khối lệnh";
      markSaved();
    }
  }

  function stopProgram(showToast = true) {
    runToken++;
    actorTapHandlers = [];
    actorTapBusy = false;
    running = false;
    ui.runBtn.disabled = false;
    ui.actor.classList.remove("speaking");
    ui.speechBubble.hidden = true;
    if (ui.actorStatus) ui.actorStatus.textContent = "Đã dừng";
    if (ui.runStatus) ui.runStatus.textContent = "Chương trình đã dừng";
    if (showToast) notify("Đã dừng chương trình.");
  }

  function applyProject(data) {
    if (!data || typeof data!=="object" || !Array.isArray(data.blocks)) throw new Error("Tệp dự án không hợp lệ.");
    idCounter=1;const rawVars=Array.isArray(data.variables)?data.variables.slice(0,100):[];
    const variables=[],ids=new Set(),names=new Set();
    rawVars.forEach((item,i)=>{if(!item||typeof item!=="object")return;let id=typeof item.id==="string"?item.id.slice(0,50):"v"+(i+1);if(!id||ids.has(id))id="v"+(i+1);ids.add(id);let name=safeText(item.name,"").trim()||"Biến "+(i+1);if(names.has(name.toLowerCase()))return;names.add(name.toLowerCase());const m=/^v(\d+)$/.exec(id);if(m)idCounter=Math.max(idCounter,Number(m[1])+1);variables.push({id,name:name.slice(0,40),value:item.value??0,visible:item.visible!==false});});
    const rawLists=Array.isArray(data.lists)?data.lists.slice(0,100):[];
    const lists=[],listIds=new Set(),listNames=new Set();
    rawLists.forEach((item,i)=>{if(!item||typeof item!=="object")return;let id=typeof item.id==="string"?item.id.slice(0,50):"l"+(i+1);if(!id||listIds.has(id))id="l"+(i+1);listIds.add(id);let name=safeText(item.name,"").trim()||"Danh sách "+(i+1);if(listNames.has(name.toLowerCase()))return;listNames.add(name.toLowerCase());const m=/^l(\d+)$/.exec(id);if(m)idCounter=Math.max(idCounter,Number(m[1])+1);const items=Array.isArray(item.items)?item.items.slice(0,500).map(value=>safeText(String(value??""),"")):[];lists.push({id,name:name.slice(0,40),items,visible:item.visible!==false});});
    const cleanBlock=(item,depth=0)=>{if(depth>15||!item||!defs[item.type])return null;const id=typeof item.id==="string"?item.id.slice(0,50):"b"+idCounter++;const m=/^b(\d+)$/.exec(id);if(m)idCounter=Math.max(idCounter,Number(m[1])+1);const result={id,type:item.type};defs[item.type].fields.forEach(field=>{if(field.type==="text")result[field.key]=safeText(item[field.key],field.value);else if(field.type==="select")result[field.key]=field.options.some(option=>option.value===item[field.key])?item[field.key]:field.value;else if(field.type==="variable")result[field.key]=variables.some(v=>v.id===item[field.key])?item[field.key]:"";else if(field.type==="list")result[field.key]=lists.some(v=>v.id===item[field.key])?item[field.key]:"";else result[field.key]=toNumber(item[field.key],field.value,field.min??-999,field.max??999);});if(defs[item.type].nested)result.children=(Array.isArray(item.children)?item.children:[]).slice(0,200).map(child=>cleanBlock(child,depth+1)).filter(Boolean);return result;};
    project={version:2,name:safeText(data.name,"Dự án của tôi").trim()||"Dự án của tôi",sprite:Object.prototype.hasOwnProperty.call(sprites,data.sprite)?data.sprite:"cat",backdrop:backdrops.some(item=>item.value===data.backdrop)?data.backdrop:"garden",blocks:data.blocks.slice(0,500).map(item=>cleanBlock(item)).filter(Boolean),variables,lists,customSprite:typeof data.customSprite==="string"&&/^data:image\/png;base64,/.test(data.customSprite)&&data.customSprite.length<1500000?data.customSprite:""};
    actorState.sprite=project.sprite;ui.projectName.value=project.name;ui.stageScene.dataset.backdrop=project.backdrop;resetActor(true);renderProgram();renderVariables();setActorPosition();saveToStorage(false);
  }

  function exportProject() {
    saveToStorage(false);
    const data = JSON.stringify(project, null, 2);
    const blob = new Blob([data], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = (project.name || "Du-an-Khoi-Vui").replace(/[^\p{L}\p{N}._ -]+/gu, "").trim().replace(/\s+/g, "-").slice(0, 50) || "Du-an-Khoi-Vui";
    link.href = url; link.download = filename + ".khoivui.json"; link.style.display = "none";
    document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    notify("Đã xuất tệp sao lưu dự án.");
  }

  async function importProject(file) {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      applyProject(data);
      notify("Đã mở dự án: " + project.name);
    } catch (error) {
      notify("Không mở được tệp này. Hãy chọn tệp dự án Khối Vui đã xuất.");
    } finally { ui.fileInput.value = ""; }
  }

  function renderVariableValues(){
    const editor=$("variablesList");
    if(editor)editor.querySelectorAll("[data-var-value]").forEach(node=>{
      const variable=project.variables.find(item=>item.id===node.dataset.varValue);
      if(variable)node.textContent="Giá trị: "+String(variable.value??0);
    });
    const monitors=$("variableMonitors");
    if(monitors){
      monitors.replaceChildren();
      project.variables.filter(item=>item.visible!==false).forEach(variable=>{
        const row=document.createElement("div");row.className="variable-monitor";
        const name=document.createElement("span");name.textContent=variable.name;
        const value=document.createElement("button");value.type="button";value.className="variable-monitor-value";
        value.textContent=String(variable.value??0);value.title="Chạm để chỉnh giá trị";
        value.addEventListener("click",()=>{
          const next=prompt("Giá trị của "+variable.name,String(variable.value??0));
          if(next===null)return;
          const raw=next.trim();variable.value=raw!==""&&Number.isFinite(Number(raw))?Number(raw):next;
          renderVariableValues();renderVariables();setUnsaved();
        });
        row.append(name,value);monitors.appendChild(row);
      });
    }
    renderListValues();
  }

  function renderVariables(){
    const list=$("variablesList");list.replaceChildren();
    if(!project.variables.length){const empty=document.createElement("div");empty.className="empty-state";empty.textContent="Chưa có biến nào. Nhập tên bên dưới rồi nhấn Tạo biến.";list.appendChild(empty);renderVariableValues();return;}
    project.variables.forEach(v=>{const row=document.createElement("div");row.className="variable-row";const left=document.createElement("div");left.className="variable-row-main";const name=document.createElement("input");name.className="variable-name-input";name.value=v.name;name.maxLength=40;name.setAttribute("aria-label","Tên biến");
      name.addEventListener("change",()=>{const val=safeText(name.value,"").trim();if(!val||project.variables.some(other=>other!==v&&other.name.toLowerCase()===val.toLowerCase())){name.value=v.name;notify("Tên biến trống hoặc đã tồn tại.");return;}v.name=val;name.value=val;renderProgram();renderVariableValues();setUnsaved();});
      const value=document.createElement("small");value.dataset.varValue=v.id;value.textContent="Giá trị: "+String(v.value??0);left.append(name,value);
      const right=document.createElement("div");right.className="variable-row-actions";const label=document.createElement("label");label.className="variable-show-label";const check=document.createElement("input");check.type="checkbox";check.checked=v.visible!==false;check.addEventListener("change",()=>{v.visible=check.checked;renderVariableValues();setUnsaved();});label.append(check,document.createTextNode("Hiện"));
      const del=document.createElement("button");del.type="button";del.className="variable-delete";del.textContent="Xóa";del.addEventListener("click",()=>{if(!confirm("Xóa biến "+v.name+"?"))return;project.variables=project.variables.filter(x=>x!==v);const clear=arr=>arr.forEach(b=>{if(b.variableId===v.id)b.variableId="";if(b.children)clear(b.children);});clear(project.blocks);renderVariables();renderProgram();setUnsaved();});
      right.append(label,del);row.append(left,right);list.appendChild(row);});renderVariableValues();
  }
  function openVariables(){$("variablesOverlay").hidden=false;switchDataMode("variables");}
  $("manageVariablesBtn").addEventListener("click",openVariables);
  $("createVariableForm").addEventListener("submit",event=>{event.preventDefault();const input=$("newVariableName"),name=safeText(input.value,"").trim();if(!name){notify("Hãy nhập tên biến.");return;}if(project.variables.some(v=>v.name.toLowerCase()===name.toLowerCase())){notify("Tên biến đã tồn tại.");return;}project.variables.push({id:"v"+idCounter++,name:name.slice(0,40),value:0,visible:true});input.value="";renderVariables();renderProgram();renderPalette();setUnsaved();notify("Đã tạo biến "+name);});
  $("closeVariablesBtn").addEventListener("click",()=>{$("variablesOverlay").hidden=true;});$("doneVariablesBtn").addEventListener("click",()=>{$("variablesOverlay").hidden=true;});
  $("variablesOverlay").addEventListener("click",event=>{if(event.target===$("variablesOverlay"))$("variablesOverlay").hidden=true;});
  function renderListValues(){
    const monitors=$("listMonitors");
    if(monitors){
      monitors.replaceChildren();
      project.lists.filter(list=>list.visible!==false).forEach(list=>{
        const panel=document.createElement("div");panel.className="list-monitor";
        const heading=document.createElement("strong");heading.textContent=list.name+" ("+list.items.length+")";panel.appendChild(heading);
        const entries=document.createElement("ol");
        list.items.slice(0,40).forEach(value=>{const item=document.createElement("li");item.textContent=String(value);entries.appendChild(item);});
        if(list.items.length>40){const item=document.createElement("li");item.textContent="… "+(list.items.length-40)+" mục nữa";entries.appendChild(item);}
        panel.appendChild(entries);monitors.appendChild(panel);
      });
    }
    const editor=$("listsEditor");
    if(editor)editor.querySelectorAll("[data-list-count]").forEach(node=>{
      const list=project.lists.find(item=>item.id===node.dataset.listCount);
      if(list)node.textContent=list.items.length+" mục";
    });
  }

  function renderLists(){
    const editor=$("listsEditor");editor.replaceChildren();
    if(!project.lists.length){
      const empty=document.createElement("div");empty.className="empty-state";
      empty.textContent="Chưa có danh sách nào. Nhập tên bên dưới để tạo danh sách trống.";
      editor.appendChild(empty);renderListValues();return;
    }
    project.lists.forEach(list=>{
      const card=document.createElement("div");card.className="list-editor-row";
      const head=document.createElement("div");head.className="list-editor-head";
      const name=document.createElement("input");name.className="list-editor-name";name.value=list.name;
      name.maxLength=40;name.setAttribute("aria-label","Tên danh sách");
      name.addEventListener("change",()=>{
        const value=safeText(name.value,"").trim();
        if(!value||project.lists.some(other=>other!==list&&other.name.toLowerCase()===value.toLowerCase())){
          name.value=list.name;notify("Tên danh sách trống hoặc đã tồn tại.");return;
        }
        list.name=value;name.value=value;renderProgram();renderPalette();renderListValues();setUnsaved();
      });
      const count=document.createElement("small");count.dataset.listCount=list.id;count.textContent=list.items.length+" mục";
      const label=document.createElement("label");label.className="variable-show-label";
      const check=document.createElement("input");check.type="checkbox";check.checked=list.visible!==false;
      check.addEventListener("change",()=>{list.visible=check.checked;renderListValues();setUnsaved();});
      label.append(check,document.createTextNode("Hiện"));
      const remove=document.createElement("button");remove.type="button";remove.className="variable-delete";remove.textContent="Xóa";
      remove.addEventListener("click",()=>{
        if(!confirm("Xóa danh sách "+list.name+"?"))return;
        project.lists=project.lists.filter(item=>item!==list);
        const clear=blocks=>blocks.forEach(block=>{if(block.listId===list.id)block.listId="";if(block.children)clear(block.children);});
        clear(project.blocks);renderLists();renderProgram();renderPalette();setUnsaved();
      });
      head.append(name,count,label,remove);
      const items=document.createElement("div");items.className="list-items";
      list.items.forEach((value,index)=>{
        const row=document.createElement("div");row.className="list-item-edit";
        const input=document.createElement("input");input.value=String(value);input.maxLength=200;
        input.setAttribute("aria-label","Mục "+(index+1));
        input.addEventListener("change",()=>{list.items[index]=safeText(input.value,"").slice(0,200);renderListValues();setUnsaved();});
        const deleteItem=document.createElement("button");deleteItem.type="button";deleteItem.textContent="×";deleteItem.title="Xóa mục";
        deleteItem.addEventListener("click",()=>{list.items.splice(index,1);renderLists();setUnsaved();});
        row.append(input,deleteItem);items.appendChild(row);
      });
      const add=document.createElement("button");add.type="button";add.className="mini-button";add.textContent="＋ Thêm mục";
      add.addEventListener("click",()=>{
        if(list.items.length>=500){notify("Danh sách tối đa 500 mục.");return;}
        list.items.push("");renderLists();renderListValues();setUnsaved();
      });
      card.append(head,items,add);editor.appendChild(card);
    });
    renderListValues();
  }

  function switchDataMode(mode){
    const variablesMode=mode!=="lists";
    $("variablesPanel").hidden=!variablesMode;$("listsPanel").hidden=variablesMode;
    $("variablesModeBtn").classList.toggle("active",variablesMode);
    $("listsModeBtn").classList.toggle("active",!variablesMode);
    $("variablesTitle").textContent=variablesMode?"Biến của bạn":"Danh sách của bạn";
    $("newVariableName").value="";$("newListName").value="";
    if(variablesMode)renderVariables();else renderLists();
  }
  $("variablesModeBtn").addEventListener("click",()=>switchDataMode("variables"));
  $("listsModeBtn").addEventListener("click",()=>switchDataMode("lists"));
  $("createListForm").addEventListener("submit",event=>{
    event.preventDefault();
    const input=$("newListName");const name=safeText(input.value,"").trim();
    if(!name){notify("Hãy nhập tên danh sách.");return;}
    if(project.lists.some(list=>list.name.toLowerCase()===name.toLowerCase())){notify("Tên danh sách đã tồn tại.");return;}
    project.lists.push({id:"l"+idCounter++,name:name.slice(0,40),items:[],visible:true});
    input.value="";renderLists();renderListValues();renderProgram();renderPalette();setUnsaved();notify("Đã tạo danh sách "+name);
  });

  // Simple canvas paint editor; custom drawing is saved with the project.
  const paintCanvas = $("paintCanvas");
  const paintContext = paintCanvas.getContext("2d", { willReadFrequently: true });
  let paintTool = "pencil";
  let paintDrawing = false;
  let paintStart = null;
  let paintLast = null;
  let paintBaseImage = null;
  const paintUndo = [];

  function paintPoint(event) {
    const rect = paintCanvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * paintCanvas.width / rect.width, y: (event.clientY - rect.top) * paintCanvas.height / rect.height };
  }
  function paintSnapshot() {
    try { paintUndo.push(paintContext.getImageData(0, 0, paintCanvas.width, paintCanvas.height)); if (paintUndo.length > 20) paintUndo.shift(); } catch (_) {}
  }
  function paintStyle() {
    paintContext.lineWidth = Number($("paintSize").value) || 7;
    paintContext.lineCap = "round"; paintContext.lineJoin = "round";
    paintContext.strokeStyle = $("paintColor").value;
  }
  function paintShape(tool, start, end) {
    paintStyle(); paintContext.globalCompositeOperation = "source-over"; paintContext.beginPath();
    if (tool === "line") { paintContext.moveTo(start.x, start.y); paintContext.lineTo(end.x, end.y); paintContext.stroke(); }
    else if (tool === "rect") { paintContext.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y); }
    else if (tool === "circle") { paintContext.arc(start.x, start.y, Math.hypot(end.x - start.x, end.y - start.y), 0, Math.PI * 2); paintContext.stroke(); }
  }
  function resetPaintCanvas() {
    paintUndo.length = 0;
    paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    paintContext.fillStyle = "#fff"; paintContext.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
    if (project.customSprite) {
      const image = new Image();
      image.onload = () => { paintContext.clearRect(0, 0, paintCanvas.width, paintCanvas.height); paintContext.drawImage(image, 0, 0, paintCanvas.width, paintCanvas.height); };
      image.src = project.customSprite;
    }
  }
  function openPaint() { resetPaintCanvas(); $("paintOverlay").hidden = false; }
  function closePaint() { $("paintOverlay").hidden = true; paintDrawing = false; }

  document.querySelectorAll("[data-paint-tool]").forEach(button => button.addEventListener("click", () => {
    paintTool = button.dataset.paintTool;
    document.querySelectorAll("[data-paint-tool]").forEach(item => item.classList.toggle("active", item === button));
  }));
  paintCanvas.addEventListener("pointerdown", event => {
    event.preventDefault(); paintCanvas.setPointerCapture(event.pointerId); paintDrawing = true;
    paintStart = paintPoint(event); paintLast = paintStart; paintSnapshot();
    paintBaseImage = paintContext.getImageData(0, 0, paintCanvas.width, paintCanvas.height);
    if (paintTool === "pencil" || paintTool === "eraser") {
      paintStyle(); paintContext.globalCompositeOperation = paintTool === "eraser" ? "destination-out" : "source-over";
      paintContext.beginPath(); paintContext.moveTo(paintStart.x, paintStart.y); paintContext.lineTo(paintStart.x + 0.1, paintStart.y + 0.1);
      paintContext.stroke(); paintContext.globalCompositeOperation = "source-over";
    }
  });
  paintCanvas.addEventListener("pointermove", event => {
    if (!paintDrawing) return;
    const point = paintPoint(event);
    if (paintTool === "pencil" || paintTool === "eraser") {
      paintStyle(); paintContext.globalCompositeOperation = paintTool === "eraser" ? "destination-out" : "source-over";
      paintContext.beginPath(); paintContext.moveTo(paintLast.x, paintLast.y); paintContext.lineTo(point.x, point.y);
      paintContext.stroke(); paintContext.globalCompositeOperation = "source-over";
    } else {
      if (paintBaseImage) paintContext.putImageData(paintBaseImage, 0, 0);
      paintShape(paintTool, paintStart, point);
    }
    paintLast = point;
  });
  function finishPaintStroke() { paintDrawing = false; paintBaseImage = null; }
  paintCanvas.addEventListener("pointerup", finishPaintStroke);
  paintCanvas.addEventListener("pointercancel", finishPaintStroke);
  $("paintSize").addEventListener("input", () => { $("paintSizeValue").textContent = $("paintSize").value + " px"; });
  $("undoPaintBtn").addEventListener("click", () => {
    const previous = paintUndo.pop();
    if (!previous) { notify("Không còn nét để hoàn tác."); return; }
    paintContext.putImageData(previous, 0, 0);
  });
  $("clearPaintBtn").addEventListener("click", () => {
    paintSnapshot(); paintContext.fillStyle = "#fff"; paintContext.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
  });
  $("savePaintBtn").addEventListener("click", () => {
    project.customSprite = paintCanvas.toDataURL("image/png");
    actorState.sprite = "custom"; project.sprite = "custom";
    setActorPosition(); setUnsaved(); closePaint(); notify("Đã lưu nhân vật tự vẽ vào dự án.");
  });
  $("paintBtn").addEventListener("click", openPaint);
  $("closePaintBtn").addEventListener("click", closePaint);
  $("cancelPaintBtn").addEventListener("click", closePaint);
  $("paintOverlay").addEventListener("click", event => { if (event.target === $("paintOverlay")) closePaint(); });

  // Offline tips for app features. The link in the dialog opens the real ChatGPT service.
  function answerAssistant(question) {
    const q = question.toLocaleLowerCase();
    if (/(biến|điểm|score|variable|dữ liệu)/.test(q)) return "Mở nhóm “Biến” → “Tạo / chỉnh sửa biến” → nhập tên rồi Tạo biến. Thêm khối “đặt biến” hoặc “thay đổi biến”, chọn biến; bật “Hiện” để xem giá trị trên sân khấu.";
    if (/(vẽ|nhân vật|bút|tẩy|hình)/.test(q)) return "Bấm “Vẽ”. Chọn Bút, Tẩy, Đường, HCN hoặc Tròn; chỉnh màu và độ dày; bấm “Lưu thành nhân vật”. Chọn 🎨 để sử dụng hình đó.";
    if (/(lặp|repeat|vòng lặp)/.test(q)) return "Trong nhóm “Điều khiển”, thêm khối “lặp lại”, rồi kéo các khối cần lặp vào vùng trống bên trong khối lặp.";
    if (/(lưu|xuất|mở|sao lưu|tệp)/.test(q)) return "“Lưu” cất dự án trên thiết bị. “Xuất” tải tệp .khoivui.json để sao lưu/chuyển máy; “Mở” nhập lại tệp đã xuất.";
    if (/(chạy|dừng|lệnh|khối|code|mã)/.test(q)) return "Chạm một khối trong thư viện để thêm hoặc giữ và kéo vào vùng Mã lệnh. Kéo khối để đổi thứ tự, sửa giá trị trong khối rồi nhấn Chạy. Nút ■ dùng để dừng.";
    if (/(rộng|màn hình|sân khấu|phóng)/.test(q)) return "Nhấn “Mở rộng” trên thanh trên để ẩn sân khấu và dành thêm chỗ cho mã lệnh; nhấn lại để hiện sân khấu.";
    return "Mình chưa có câu trả lời offline phù hợp. Hỏi cụ thể về biến, khối lệnh, vẽ, chạy hoặc lưu dự án. Để hỏi AI tự do, bấm liên kết “Mở ChatGPT để hỏi AI trực tuyến”.";
  }
  function addAssistantMessage(message, role) {
    const area = $("assistantMessages");
    const item = document.createElement("div");
    item.className = "assistant-message " + (role === "user" ? "assistant-user" : "assistant-reply");
    item.textContent = message; area.appendChild(item); area.scrollTop = area.scrollHeight;
  }
  $("assistantBtn").addEventListener("click", () => { $("assistantOverlay").hidden = false; $("assistantQuestion").focus(); });
  $("closeAssistantBtn").addEventListener("click", () => { $("assistantOverlay").hidden = true; });
  $("closeAssistantFooterBtn").addEventListener("click", () => { $("assistantOverlay").hidden = true; });
  $("assistantOverlay").addEventListener("click", event => { if (event.target === $("assistantOverlay")) $("assistantOverlay").hidden = true; });
  $("assistantForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("assistantQuestion");
    const question = safeText(input.value, "").trim();
    if (!question) return;
    addAssistantMessage(question, "user"); addAssistantMessage(answerAssistant(question), "assistant");
    input.value = ""; input.focus();
  });

  function openHelp() { ui.helpOverlay.hidden = false; }
  function closeHelp() { ui.helpOverlay.hidden = true; }

  ui.categoryTabs.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    ui.categoryTabs.querySelectorAll(".category-tab").forEach(tab => tab.classList.toggle("active", tab === button));
    renderPalette();
  });

  ui.programBlocks.addEventListener("change", event => {
    const field = event.target.closest("[data-field]");
    if (!field) return;
    const blockEl = field.closest("[data-block-id]");
    const found = blockEl && findBlock(project.blocks, blockEl.dataset.blockId);
    if (!found) return;
    const definition = defs[found.block.type].fields.find(item => item.key === field.dataset.field);
    if (!definition) return;
    if (definition.type === "text") found.block[definition.key] = safeText(field.value, definition.value);
    else if (definition.type === "select") found.block[definition.key] = definition.options.some(item => item.value === field.value) ? field.value : definition.value;
    else if (definition.type === "variable") found.block[definition.key] = project.variables.some(item => item.id === field.value) ? field.value : "";
    else if (definition.type === "list") found.block[definition.key] = project.lists.some(item => item.id === field.value) ? field.value : "";
    else found.block[definition.key] = toNumber(field.value, definition.value, definition.min ?? -999, definition.max ?? 999);
    if (definition.type === "number") field.value = String(found.block[definition.key]);
    setUnsaved();
  });

  ui.programBlocks.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete-block]");
    if (deleteButton) { removeBlock(deleteButton.dataset.deleteBlock); return; }
  });

  ui.paletteBlocks.addEventListener("click", event => {
    const button = event.target.closest("[data-palette-type]");
    if (!button || Date.now() < suppressClickUntil) return;
    placeBlock(button.dataset.paletteType);
  });

  document.addEventListener("pointerdown", event => {
    const palette = event.target.closest("[data-palette-type]");
    const head = event.target.closest(".block-head");
    if (!palette && !head) return;
    if (event.target.closest("input,select,.block-delete")) return;
    const sourceBlock = head && head.closest("[data-block-id]");
    if (head && !sourceBlock) return;
    pendingPointer = {
      pointerId: event.pointerId, startX: event.clientX, startY: event.clientY,
      x: event.clientX, y: event.clientY, paletteType: palette ? palette.dataset.paletteType : null,
      blockId: sourceBlock ? sourceBlock.dataset.blockId : null, dragged: false, ghost: null, sourceEl: sourceBlock
    };
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("pointermove", event => {
    if (!pendingPointer || event.pointerId !== pendingPointer.pointerId) return;
    pendingPointer.x = event.clientX; pendingPointer.y = event.clientY;
    const distance = Math.hypot(event.clientX - pendingPointer.startX, event.clientY - pendingPointer.startY);
    if (!pendingPointer.dragged && distance > 8) {
      pendingPointer.dragged = true;
      if (pendingPointer.sourceEl) pendingPointer.sourceEl.classList.add("dragging-source");
      const source = pendingPointer.paletteType ? ui.paletteBlocks.querySelector('[data-palette-type="' + pendingPointer.paletteType + '"]') : pendingPointer.sourceEl;
      const ghost = document.createElement("div"); ghost.className = "drag-ghost";
      if (source) ghost.innerHTML = source.outerHTML;
      document.body.appendChild(ghost); pendingPointer.ghost = ghost;
    }
    if (pendingPointer.dragged && pendingPointer.ghost) {
      pendingPointer.ghost.style.left = event.clientX + "px";
      pendingPointer.ghost.style.top = event.clientY + "px";
      document.querySelectorAll(".dropzone.drag-over").forEach(el => el.classList.remove("drag-over"));
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const zone = element && element.closest(".dropzone");
      if (zone) zone.classList.add("drag-over");
    }
  }, { passive: true });

  document.addEventListener("pointerup", event => {
    if (!pendingPointer || event.pointerId !== pendingPointer.pointerId) return;
    const drag = pendingPointer;
    const dragged = drag.dragged;
    if (drag.sourceEl) drag.sourceEl.classList.remove("dragging-source");
    if (drag.ghost) drag.ghost.remove();
    document.querySelectorAll(".dropzone.drag-over").forEach(el => el.classList.remove("drag-over"));
    pendingPointer = null;
    if (dragged) {
      suppressClickUntil = Date.now() + 500;
      const target = resolveDropTarget(event.clientX, event.clientY);
      if (drag.paletteType) {
        if (target) placeBlock(drag.paletteType, target.parentId, target.index);
        else notify("Thả khối vào vùng Mã lệnh để thêm.");
      } else if (drag.blockId && target) {
        if (moveBlockTo(drag.blockId, target)) notify("Đã sắp xếp lại khối lệnh.");
      }
    } else if (drag.paletteType) {
      suppressClickUntil = Date.now() + 300;
      placeBlock(drag.paletteType);
    }
  });
  document.addEventListener("pointercancel", () => {
    if (pendingPointer?.ghost) pendingPointer.ghost.remove();
    if (pendingPointer?.sourceEl) pendingPointer.sourceEl.classList.remove("dragging-source");
    pendingPointer = null;
  });

  ui.actor.addEventListener("click", async () => {
    const handlers = actorTapHandlers.filter(item => isCurrentRun(item.token));
    if (!handlers.length || actorTapBusy) return;
    actorTapBusy = true;
    ui.actorStatus.textContent = "Đang xử lý chạm";
    ui.runStatus.textContent = "Đang chạy lệnh sau khối chạm nhân vật…";
    try {
      for (const item of handlers) {
        if (isCurrentRun(item.token)) await runStack(item.block.children || [], item.token);
      }
    } finally {
      actorTapBusy = false;
      if (handlers.some(item => isCurrentRun(item.token))) {
        ui.actorStatus.textContent = "Đang chờ chạm";
        ui.runStatus.textContent = "Chạm nhân vật để chạy lại khối sự kiện";
      }
    }
  });

  $("runBtn").addEventListener("click", startProgram);
  $("stopBtn").addEventListener("click", () => stopProgram(true));
  $("resetBtn").addEventListener("click", () => { resetActor(); notify("Đã đưa nhân vật về vị trí ban đầu."); });
  $("saveBtn").addEventListener("click", () => saveToStorage(true));
  $("exportBtn").addEventListener("click", exportProject);
  $("importBtn").addEventListener("click", () => ui.fileInput.click());
  ui.fileInput.addEventListener("change", () => importProject(ui.fileInput.files && ui.fileInput.files[0]));
  $("newProjectBtn").addEventListener("click", () => {
    project = initialProject(); actorState.sprite = "cat"; ui.projectName.value = project.name;
    resetActor(false); renderProgram(); renderVariables(); renderPalette(); setActorPosition(); saveToStorage(false); notify("Dự án mới trống, chưa có khối lệnh hay biến.");
  });
  $("clearBlocksBtn").addEventListener("click", () => {
    if (!project.blocks.length) { notify("Vùng mã lệnh đang trống."); return; }
    project.blocks = []; stopProgram(false); renderProgram(); setUnsaved(); notify("Đã xóa tất cả khối lệnh.");
  });
  ui.projectName.addEventListener("input", () => { project.name = safeText(ui.projectName.value, "Dự án của tôi"); setUnsaved(); });
  document.querySelectorAll(".sprite-choice").forEach(button => button.addEventListener("click", () => {
    actorState.sprite = button.dataset.sprite; project.sprite = actorState.sprite; setActorPosition(); setUnsaved();
  }));
  $("helpBtn").addEventListener("click", openHelp);
  $("workspaceExpandBtn").addEventListener("click", () => {
    const expanded = document.querySelector(".editor-layout").classList.toggle("workspace-expanded");
    $("workspaceExpandBtn").setAttribute("aria-pressed", String(expanded));
    $("workspaceExpandBtn").querySelector("span").textContent = expanded ? "Hiện sân khấu" : "Mở rộng";
    $("workspaceExpandBtn").title = expanded ? "Hiện lại sân khấu" : "Mở rộng vùng mã lệnh";
  });
  $("closeHelpBtn").addEventListener("click", closeHelp);
  $("gotItBtn").addEventListener("click", closeHelp);
  ui.helpOverlay.addEventListener("click", event => { if (event.target === ui.helpOverlay) closeHelp(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeHelp(); });

  function loadStartup() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applyProject(JSON.parse(saved));
      else { project = initialProject(); renderProgram(); setActorPosition(); saveToStorage(false); }
    } catch (error) {
      project = initialProject(); renderProgram(); setActorPosition(); saveToStorage(false);
    }
    renderPalette(); renderVariables();
  }

  loadStartup();
  if (!localStorage.getItem("khoivui.help.seen")) {
    window.setTimeout(() => openHelp(), 500);
    localStorage.setItem("khoivui.help.seen", "1");
  }
})();