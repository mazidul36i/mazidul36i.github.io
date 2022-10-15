$(window).on("load", function () {
    $(".preloader").fadeOut("slow");
});

/*------------------------Navbar Shrink------------------*/
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 90) {
        $(".navbar").addClass("navbar-shrink");
    } else {
        $(".navbar").removeClass("navbar-shrink");
    }
});

/*-------------------------Page Scrollibg - ScrollIt------------------------*/
$.scrollIt({
    topOffset: -50,
});

/*--------------------------Navbar Collapse---------------------------------*/
$(".nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
});

/*--------------------Toggle Theme - light and dark theme--------------------*/
function toggleTheme() {
    if (localStorage.getItem("sketch-theme") !== null) {
        if (localStorage.getItem("sketch-theme") === "dark") {
            $("body").addClass("dark");
        } else {
            $("body").removeClass("dark");
        }
    }
    updateIcon();
}
toggleTheme();
$(".toggle-theme").on("click", function () {
    $("body").toggleClass("dark");
    if ($("body").hasClass("dark")) {
        localStorage.setItem("sketch-theme", "dark");
    } else {
        localStorage.setItem("sketch-theme", "light");
    }
    updateIcon();
});
function updateIcon() {
    if ($("body").hasClass("dark")) {
        $(".toggle-theme i").removeClass("bx-moon");
        $(".toggle-theme i").addClass("bx-sun");
    } else {
        $(".toggle-theme i").removeClass("bx-sun");
        $(".toggle-theme i").addClass("bx-moon");
    }
}
