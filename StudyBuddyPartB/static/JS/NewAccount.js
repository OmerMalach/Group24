document.querySelector(".sidebar").addEventListener("click", function () {
  moveToLoginPage();
});

// Function to move to the Login Page
function moveToLoginPage() {
  window.location.href = "loginPage.html";
}
// Function to validate email
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const usernameInput = document.querySelector(
    'input[type="text"][placeholder="Username"]'
  );
  const emailInput = document.querySelector(
    'input[type="text"][placeholder="Email"]'
  );
  const passwordInput = document.querySelector(
    'input[type="text"][placeholder="Password"]'
  );
  const phoneInput = document.querySelector(
    'input[type="text"][placeholder="Phone number"]'
  );

  // Check if any of the fields are empty
  if (
    usernameInput.value.trim() === "" ||
    emailInput.value.trim() === "" ||
    passwordInput.value.trim() === "" ||
    phoneInput.value.trim() === ""
  ) {
    alert("Please fill in all the required fields");
    return;
  }

  // Validate email
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    alert("Invalid email address");
    return;
  }

  // Validate phone number
  const phoneNumber = phoneInput.value.trim();
  if (!/^\d{10,}$/.test(phoneNumber)) {
    alert("Phone number must be at least 10 digits");
    return;
  }

  // Display success message
  alert("Account created successfully!");

  // Reset form
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  phoneInput.value = "";
});
