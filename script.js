const registerButton = document.getElementById("showRegister");
const loginButton = document.getElementById("showLogin");
const container = document.getElementById("container");
const loginForm = document.getElementById("loginForm");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); 
  window.location.href = "dashboard.html";
});


