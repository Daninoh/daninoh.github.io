const MIN_HIDDEN_MS = 400;

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

// Left/right arrow keys flip through illustrations while the modal is open.
// Pressing a key "clicks" the matching on-screen control, so the keys always
// move in the same direction as the arrows.
document.addEventListener("keydown", function (e) {
    const modal = document.getElementById("illosModal");
    if (!modal || !modal.classList.contains("show")) return;
    if (e.key === "ArrowLeft") modal.querySelector(".carousel-control-prev").click();
    if (e.key === "ArrowRight") modal.querySelector(".carousel-control-next").click();
});
