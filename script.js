const registerButton = document.getElementById("showRegister");
const loginButton = document.getElementById("showLogin");
const container = document.getElementById("container");
const loginForm = document.getElementById("loginForm");

// Function to toggle between login and register
registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Handle login form submission
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission
  // Redirect to dashboard.html
  window.location.href = "dashboard.html";
});


