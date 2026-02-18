document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  let isDrawing = false;

  // resize function + initialize

  function resizeCanvas() {
    const temp = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    const tempCtx = temp.getContext("2d");

    temp.width = canvas.width;
    temp.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    // get new size of container
    const rect = canvas.getBoundingClientRect();
    const width = Math.min(350, rect.width || 350);
    const height = 300;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // redraw old **scale to new size**
    ctx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e61b00";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
  }

  window.addEventListener("resize", () => {
    if (!isDrawing) {
      resizeCanvas();
    }
  });

  // initialize
  window.addEventListener("load", resizeCanvas);

  // helpers for mouse/touch position
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dpr = window.devicePixelRatio || 1;

    // physical / logical pixels
    const scaleX = canvas.width / dpr / rect.width;
    const scaleY = canvas.height / dpr / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  // drawing
  function startDrawing(e) {
    isDrawing = true;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!isDrawing) return;

    const pos = getPos(e);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  // mouse
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  // touch
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      startDrawing(e);
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      draw(e);
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      stopDrawing();
    },
    { passive: false },
  );

  canvas.addEventListener("touchcancel", stopDrawing);
});
