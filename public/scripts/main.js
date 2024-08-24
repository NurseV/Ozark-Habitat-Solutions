document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function (event) {
        let valid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        // Simple validation
        if (name.value.trim() === "") {
            valid = false;
            alert("Name is required.");
        }

        if (email.value.trim() === "") {
            valid = false;
            alert("Email is required.");
        } else if (!validateEmail(email.value)) {
            valid = false;
            alert("Please enter a valid email address.");
        }

        if (message.value.trim() === "") {
            valid = false;
            alert("Message is required.");
        }

        // Prevent form submission if validation fails
        if (!valid) {
            event.preventDefault();
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
