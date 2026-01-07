// Form elements
const studentForm = document.getElementById("studentForm");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const nameMessage = document.getElementById("nameMessage");
const emailMessage = document.getElementById("emailMessage");
const ageMessage = document.getElementById("ageMessage");
const studentTableBody = document.querySelector("#studentTable tbody");

// Email regex
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Live validation
nameInput.addEventListener("input", () => {
    if(nameInput.value.trim().length < 3){
        nameMessage.textContent = "Name must be at least 3 characters";
        nameMessage.className = "input-message error";
    } else {
        nameMessage.textContent = "Looks good!";
        nameMessage.className = "input-message success";
    }
});

emailInput.addEventListener("input", () => {
    if(!isValidEmail(emailInput.value.trim())){
        emailMessage.textContent = "Invalid email format";
        emailMessage.className = "input-message error";
    } else {
        emailMessage.textContent = "Valid email";
        emailMessage.className = "input-message success";
    }
});

ageInput.addEventListener("input", () => {
    const age = parseInt(ageInput.value);
    if(isNaN(age) || age < 5 || age > 100){
        ageMessage.textContent = "Age must be between 5 and 100";
        ageMessage.className = "input-message error";
    } else {
        ageMessage.textContent = "Valid age";
        ageMessage.className = "input-message success";
    }
});

// Form submit
studentForm.addEventListener("submit", function(e){
    e.preventDefault();

    // Values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = ageInput.value.trim();
    const grade = document.getElementById("grade").value;
    const courses = Array.from(document.getElementById("courses").selectedOptions).map(opt => opt.value);

    // Final validation
    if(name.length < 3 || !isValidEmail(email) || age < 5 || age > 100 || !grade || courses.length === 0){
        formMessage.style.color = "red";
        formMessage.textContent = "Please fix errors before submitting";
        return;
    }

    // Add student to table
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>${grade}</td>
        <td>${courses.join(", ")}</td>
    `;
    studentTableBody.appendChild(row);

    // Success message
    formMessage.style.color = "green";
    formMessage.textContent = `${name} has been registered successfully!`;

    // Reset form
    studentForm.reset();
    nameMessage.textContent = "";
    emailMessage.textContent = "";
    ageMessage.textContent = "";

    // Optional: Send data to Google Sheets
    const formData = new FormData(studentForm);
    const googleFormURL = "YOUR_GOOGLE_FORM_ACTION_URL_HERE"; // Replace with your Google Form URL
    fetch(googleFormURL, { method: "POST", body: formData, mode: "no-cors" });
});
