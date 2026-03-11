document.addEventListener("DOMContentLoaded", function () {
    const cookieBox = document.querySelector(".cookies-box");
    const acceptBtn = document.querySelector(".btn2");

    function setCookie(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        let cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    if (getCookie("cookieConsent")) {
        cookieBox.classList.add("hide");
    }
    acceptBtn.addEventListener("click", function () {
        setCookie("cookieConsent", "true", 60);
        cookieBox.classList.add("hide");
    });
});
