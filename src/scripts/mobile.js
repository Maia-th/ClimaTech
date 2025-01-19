function showMenu() {
  var menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

function toggleDropdown() {
  document.getElementById("dropdown-menu").classList.toggle("hidden");
}

function closeDropdown() {
    document.getElementById("dropdown-menu").classList.add("hidden");
}

window.onclick = function (event) {
  if (!event.target.matches(".scroll-link")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains("hidden")) {
        openDropdown.classList.add("hidden");
      }
    }
  }
};