document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result; // Set the image source to the uploaded file
        };
        reader.readAsDataURL(file); // Convert the file to a data URL
    }
  });
  
  // Optional: To allow the image to be clickable to trigger the file input
  document.getElementById('profile-pic').addEventListener('click', function() {
    document.getElementById('file-upload').click();
  });