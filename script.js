class AuthUI {
  constructor(containerId, loginFormId, registerButtonId, loginButtonId) {
    this.container = document.getElementById(containerId);
    this.loginForm = document.getElementById(loginFormId);
    this.registerButton = document.getElementById(registerButtonId);
    this.loginButton = document.getElementById(loginButtonId);
    this._bindEvents();
  }

  _bindEvents() {
    this.registerButton.addEventListener("click", () => this.showRegister());
    this.loginButton.addEventListener("click", () => this.showLogin());
    this.loginForm.addEventListener("submit", (event) => this.handleLoginSubmit(event));
  }

  showRegister() {
    this.container.classList.add("right-panel-active");
  }

  showLogin() {
    this.container.classList.remove("right-panel-active");
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    window.location.href = "dashboard.html";
  }
}


const authUI = new AuthUI("container", "loginForm", "showRegister", "showLogin");
