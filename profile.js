document.getElementById('save-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value;

  localStorage.setItem('profileName', name);
  localStorage.setItem('profilePhone', phone);
  localStorage.setItem('profileDob', dob);
  localStorage.setItem('profileEmail', email);

  document.getElementById('name').disabled = true;
  document.getElementById('phone').disabled = true;
  document.getElementById('dob').disabled = true;
  document.getElementById('email').disabled = true;

  document.getElementById('edit-btn').disabled = false;
  document.getElementById('save-btn').disabled = true;
});
  
document.getElementById('edit-btn').addEventListener('click', () => {
  document.getElementById('name').disabled = false;
  document.getElementById('phone').disabled = false;
  document.getElementById('dob').disabled = false;
  document.getElementById('email').disabled = false;

  document.getElementById('save-btn').disabled = false;
  document.getElementById('edit-btn').disabled = true;
});

window.addEventListener('load', () => {
  const name = localStorage.getItem('profileName');
  const email = localStorage.getItem('profileEmail');
  const phone = localStorage.getItem('profilePhone');
  const dob = localStorage.getItem('profileDob');

  if (name && email && phone && dob) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('dob').value = dob;
  }
});


window.addEventListener('load', loadProfileData);
