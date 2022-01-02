var loadVar;

function loaderFunction() {
loadVar = setTimeout(showPage, 500);
}

function showPage() {
document.getElementById("loader").style.display = "none";
document.getElementById("loadanim").style.display = "block";
}

