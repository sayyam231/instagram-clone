function btnclick(e) {
    var x = document.getElementById(e);
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function closeOverlay() {
    var x = document.getElementById('addost');
    x.style.display = 'none';
}

// to hide back the "DROPDOWN" div if clicked outside it
document.addEventListener('mouseup', function (e) {
    var container = document.getElementById('dropdown');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});