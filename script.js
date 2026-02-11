
    function toggleMenu() {
        const menu = document.getElementById('side-menu');
        if (menu.style.transform === "translateX(0px)") {
            menu.style.transform = "translateX(-100%)";
        } else {
            menu.style.transform = "translateX(0px)";
        }
    }