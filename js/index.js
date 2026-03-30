// Run code after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select cookie banner elements
    const cookieBox = document.querySelector(".cookies-box");
    const acceptBtn = document.querySelector(".btn2");

    // Function to set a cookie with expiration in days
    function setCookie(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to retrieve a cookie by name
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

    // Hide cookie banner if consent already exists
    if (getCookie("cookieConsent")) {
        cookieBox.classList.add("hide");
    }
    // Handle user accepting cookies
    acceptBtn.addEventListener("click", function () {
        setCookie("cookieConsent", "true", 60);
        cookieBox.classList.add("hide");
    });
});
