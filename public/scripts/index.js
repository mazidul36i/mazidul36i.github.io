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
    const body = $("body");
    body.toggleClass("dark");
    if (body.hasClass("dark")) {
        localStorage.setItem("sketch-theme", "dark");
    } else {
        localStorage.setItem("sketch-theme", "light");
    }
    updateIcon();
});

function updateIcon() {
    const icon = $(".toggle-theme i");
    if ($("body").hasClass("dark")) {
        icon.removeClass("bx-moon");
        icon.addClass("bx-sun");
    } else {
        icon.removeClass("bx-sun");
        icon.addClass("bx-moon");
    }
}

/*--------------------------Contact Form-----------------------*/
$("#email_form").submit((e) => {
    $("#submit").prop("disabled", true);

    let data = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val(),
        _captcha: false,
        _next: "",
    };
    const subjectInput = $("#subject");
    if (subjectInput.val()) data.subject = subjectInput.val();

    submitForm(data);
    e.preventDefault();
});

const submitForm = (data) => {
    $.ajax({
        method: "POST",
        url: "https://formsubmit.co/islammazidul1369@gmail.com",
        // dataType: "json",
        accepts: "application/json",
        data: data,
    })
        .done(function (data) {
            $("#popup-message").html(
                "Thank you for taking the time to contact me.<br> I appreciate your interest and I will get back to you as soon as possible."
            );
            $("#popupModal").modal("show");
            $("#email_form").trigger("reset");
        })
        .fail(() => {
            $("#popup-message").html(
                "Something went you wrong..!<br>Please try again."
            );
            $("#popupModal").modal("show");
        })
        .always(() => {
            $("#submit").prop("disabled", false);
        });
};
