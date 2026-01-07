// Select form and message element
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Function to validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form submit handler
form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
        formMessage.style.color = "red";
        formMessage.textContent = "All fields are required.";
        return;
    }

    if (!isValidEmail(email)) {
        formMessage.style.color = "red";
        formMessage.textContent = "Please enter a valid email.";
        return;
    }

    // Success
    formMessage.style.color = "green";
    formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;

    // Log data (or send to backend)
    console.log({ name, email, message });

    // Reset form
    form.reset();
});
