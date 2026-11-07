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

(function () {
  const grid = document.querySelector(".illo-masonry");
  if (!grid) return;

  const tiles = Array.from(grid.querySelectorAll(".illo-tile"));
  let currentCount = 0;

  // the modal carousel is built from the gallery tiles, so each illustration is listed once (in the HTML)
  const inner = document.querySelector("#carouselExample .carousel-inner");
  const slides = tiles.map(function (tile) {
    const thumb = tile.querySelector("img");
    const title = tile.querySelector("b").textContent;
    const year = tile.querySelector(":scope > h3").textContent;

    const slide = document.createElement("div");
    slide.className = "carousel-item";
    slide.innerHTML = '<img class="d-block w-100" alt="">' + '<div class="modal-footer pb-0"><p class="mt-2 mb-1"></p></div>';
    const img = slide.querySelector("img");
    img.src = thumb.getAttribute("src");
    img.alt = thumb.alt;
    slide.querySelector("p").textContent = title + ", " + year;
    inner.appendChild(slide);

    // open the carousel on the clicked illustration
    tile.querySelector("a").addEventListener("click", function () {
      slides.forEach(function (s) {
        s.classList.toggle("active", s === slide);
      });
    });
    return slide;
  });

  // 2 columns from tablet width up (Bootstrap's md breakpoint), 1 on phones
  function columnCount() {
    return window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
  }

  function layout(force) {
    const count = columnCount();
    if (count === currentCount && force !== true) return;
    currentCount = count;

    const columns = [];
    const heights = [];
    for (let i = 0; i < count; i++) {
      const col = document.createElement("div");
      col.className = "illo-column";
      columns.push(col);
      heights.push(0);
    }

    tiles.forEach(function (tile) {
      const img = tile.querySelector("img");
      const ratio = img && img.naturalWidth ? img.naturalHeight / img.naturalWidth : 1;
      const shortest = heights.indexOf(Math.min.apply(null, heights));
      columns[shortest].appendChild(tile);
      heights[shortest] += ratio + 0.15; // + a little for the title and year
    });

    grid.replaceChildren.apply(grid, columns);
    grid.classList.add("is-columns");
  }

  // images have their real sizes once the page has loaded
  window.addEventListener("load", function () {
    layout(true);
  });
  window.addEventListener("resize", layout);
})();
