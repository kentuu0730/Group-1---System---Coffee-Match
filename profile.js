const getElement = (id) => document.getElementById(id);

const updateElement = (id, attribute, value) => {
  const element = getElement(id);
  element[attribute] = value;
};

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getLocalStorageData = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const handleProfilePicChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    readFile(file).then((dataUrl) => updateElement('profile-pic', 'src', dataUrl));
  }
};

const disableFields = (fields) => {
  fields.forEach((field) => field.disabled = true);
};

const enableFields = (fields) => {
  fields.forEach((field) => field.disabled = false);
};

const getFormValues = () => {
  return {
    name: getElement('name').value,
    phone: getElement('phone').value,
    dob: getElement('dob').value,
    email: getElement('email').value,
  };
};

const saveProfileData = () => {
  const profileData = getFormValues();
  Object.keys(profileData).forEach(key => saveToLocalStorage(key, profileData[key]));

  disableFields([getElement('name'), getElement('phone'), getElement('dob'), getElement('email')]);
  updateElement('save-btn', 'disabled', true);
  updateElement('edit-btn', 'disabled', false);
};

const loadProfileData = () => {
  const profileData = ['profileName', 'profilePhone', 'profileDob', 'profileEmail']
    .map(key => getLocalStorageData(key))
    .filter(Boolean);

  if (profileData.length) {
    const [name, phone, dob, email] = profileData;
    getElement('name').value = name;
    getElement('phone').value = phone;
    getElement('dob').value = dob;
    getElement('email').value = email;

    disableFields([getElement('name'), getElement('phone'), getElement('dob'), getElement('email')]);
    updateElement('save-btn', 'disabled', true);
    updateElement('edit-btn', 'disabled', false);
  } else {
    updateElement('edit-btn', 'disabled', false);
    updateElement('save-btn', 'disabled', false);
  }
};

const enableProfileEditing = () => {
  enableFields([getElement('name'), getElement('phone'), getElement('dob'), getElement('email')]);
  updateElement('save-btn', 'disabled', false);
  updateElement('edit-btn', 'disabled', true);
};

getElement('file-upload').addEventListener('change', handleProfilePicChange);
getElement('profile-pic').addEventListener('click', () => getElement('file-upload').click());
getElement('save-btn').addEventListener('click', saveProfileData);
getElement('edit-btn').addEventListener('click', enableProfileEditing);

window.addEventListener('load', loadProfileData);
