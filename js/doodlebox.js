document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let isDrawing = false;

  // ink color
  function inkColor() {
    return getComputedStyle(canvas).getPropertyValue("--doodle-ink").trim() || "#e61b00";
  }

  // pen settings
  function setPen() {
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = ctx.fillStyle = inkColor();
  }

  // resize
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);

    // skip while hidden
    if (!width || !height || (width === canvas.width && height === canvas.height)) return;

    const old = document.createElement("canvas");
    old.width = canvas.width;
    old.height = canvas.height;
    old.getContext("2d").drawImage(canvas, 0, 0);

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(old, 0, 0); // keep drawings at their original size, not stretched

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setPen();
  }

  // recolor on theme change
  function recolorInk() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = inkColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setPen();
  }

  // pointer position inside the canvas
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  canvas.addEventListener("pointerdown", function (e) {
    if (!e.isPrimary) return; // ignore extra fingers
    e.preventDefault(); // no text selection while dragging
    canvas.setPointerCapture(e.pointerId); // keep the stroke going if it leaves the pad
    isDrawing = true;

    const { x, y } = getPos(e);

    ctx.beginPath();
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener("pointermove", function (e) {
    if (!isDrawing || !e.isPrimary) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  function stopDrawing() {
    isDrawing = false;
  }

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);

  // save/share
  function saveDoodle() {
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const outCtx = out.getContext("2d");
    outCtx.fillStyle = getComputedStyle(canvas).backgroundColor;
    outCtx.fillRect(0, 0, out.width, out.height);
    outCtx.drawImage(canvas, 0, 0);

    out.toBlob(async function (blob) {
      const file = new File([blob], "doodle.png", { type: "image/png" });

      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      if (isTouchDevice && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "My doodle" });
          return;
        } catch (err) {
          if (err.name === "AbortError") return; // they closed the share sheet
          // anything else: fall through to a normal download
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "doodle.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  // clear button
  function clearDoodle() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  const saveButton = document.getElementById("saveDoodle");
  if (saveButton) saveButton.addEventListener("click", saveDoodle);

  const clearButton = document.getElementById("clearDoodle");
  if (clearButton) clearButton.addEventListener("click", clearDoodle);

  new ResizeObserver(resizeCanvas).observe(canvas);

  new MutationObserver(recolorInk).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});
