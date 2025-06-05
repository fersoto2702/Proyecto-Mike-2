function toggleDropdown(id) {
    const menu = document.getElementById(id);
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}