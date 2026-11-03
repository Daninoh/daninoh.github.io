const MIN_LOADER_MS = 400;
const loaderStart = performance.now();

function loaderFunction() {
  const elapsed = performance.now() - loaderStart;
  setTimeout(showPage, Math.max(0, MIN_LOADER_MS - elapsed));
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loadanim").style.display = "block";
}

// Left/right arrow keys flip through illustrations while the modal is open.
// Pressing a key "clicks" the matching on-screen control, so the keys always
// move in the same direction as the arrows.
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("illosModal");
  if (!modal || !modal.classList.contains("show")) return;
  if (e.key === "ArrowLeft") modal.querySelector(".carousel-control-prev").click();
  if (e.key === "ArrowRight") modal.querySelector(".carousel-control-next").click();
});
