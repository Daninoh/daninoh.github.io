// loading screen
const MIN_HIDDEN_MS = 500;

function loaderFunction() {
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(function () {
    // performance.now() = milliseconds since the visitor started loading the page
    const remaining = MIN_HIDDEN_MS - performance.now();
    setTimeout(showPage, Math.max(0, remaining));
  });
}

function showPage() {
  document.getElementById("loadanim").style.display = "block";
}

// sun/moon theme toggle
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  });
}

function savedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

setTheme(document.documentElement.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light"));

document.querySelectorAll(".theme-toggle").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
});

darkQuery.addEventListener("change", function (e) {
  if (!savedTheme()) setTheme(e.matches ? "dark" : "light");
});

// modal arrows
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("illosModal");
  if (!modal || !modal.classList.contains("show")) return;
  if (e.key === "ArrowLeft") modal.querySelector(".carousel-control-prev").click();
  if (e.key === "ArrowRight") modal.querySelector(".carousel-control-next").click();
});
