const registerButton = document.getElementById("showRegister");
const loginButton = document.getElementById("showLogin");
const container = document.getElementById("container");
const registerForm = document.querySelector(".register-container form");
const loginForm = document.getElementById("loginForm");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  const userData = { name, email, password };

  try {
    const response = await fetch('http://127.0.0.1:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.text();

    if (response.ok) {
      alert(result); 
      registerForm.reset();
    } else {
      alert('Error: ' + result); 
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to server');
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const loginData = { email, password };

  try {
    const response = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.text();

    if (response.ok) {
      localStorage.setItem('profileEmail', email); // Save email to localStorage
      alert(result);
      window.location.href = "dashboard.html";
    } else {
      alert('Error: ' + result);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to server');
  }
});


const loadProfileData = async () => {
  try {
      const email = localStorage.getItem('profileEmail'); 
      if (!email) throw new Error("No email found in local storage");

      const response = await fetch(`http://127.0.0.1:3000/profile?email=${email}`);
      if (!response.ok) throw new Error("Failed to fetch profile");

      const profileData = await response.json();
      document.getElementById('name').value = profileData.name;
      document.getElementById('email').value = profileData.email;
      document.getElementById('phone').value = profileData.phone || '';
      document.getElementById('dob').value = profileData.dob || '';
  } catch (error) {
      console.error("Error loading profile data:", error);
  }
};


const enableProfileEditing = () => {
  document.getElementById('phone').disabled = false;
  document.getElementById('dob').disabled = false;

  document.getElementById('save-btn').disabled = false;
  document.getElementById('edit-btn').disabled = true;
};

const saveProfileData = async () => {
  const profileData = {
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      dob: document.getElementById('dob').value,
  };

  try {
      const response = await fetch('http://127.0.0.1:3000/updateProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      document.getElementById('phone').disabled = true;
      document.getElementById('dob').disabled = true;
      document.getElementById('save-btn').disabled = true;
      document.getElementById('edit-btn').disabled = false;

      alert('Profile updated successfully');
  } catch (error) {
      console.error("Error saving profile data:", error);
  }
};

document.getElementById('save-btn').addEventListener('click', saveProfileData);
document.getElementById('edit-btn').addEventListener('click', enableProfileEditing);


document.getElementById('save-btn').addEventListener('click', saveProfileData);
document.getElementById('edit-btn').addEventListener('click', enableProfileEditing);


document.getElementById('save-btn').addEventListener('click', saveProfileData);
document.getElementById('edit-btn').addEventListener('click', enableProfileEditing);
