var loadVar;

function loaderFunction() {
  loadVar = setTimeout(showPage, 850);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loadanim").style.display = "block";
}
