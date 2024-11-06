var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

// Function to handle the "Like" button click event
function toggleLike(button) {
  const coffeeName = button.closest('.tranding-slide').querySelector('.coffe-name').innerText;
  const coffeePrice = button.closest('.tranding-slide').querySelector('.Coffee-price').innerText;
  const coffeeImage = button.closest('.tranding-slide').querySelector('.tranding-slide-img img').src;

  // Create an object with the details of the liked coffee
  const coffeeData = {
      name: coffeeName,
      price: coffeePrice,
      image: coffeeImage
  };

  // Retrieve the existing favorites from localStorage (if any)
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Check if the item is already in the favorites list
  if (!favorites.some(fav => fav.name === coffeeName)) {
      favorites.push(coffeeData);
      localStorage.setItem('favorites', JSON.stringify(favorites)); // Save the updated favorites list
      alert(coffeeName + ' has been added to your favorites!');
  } else {
      alert(coffeeName + ' is already in your favorites.');
  }
}

// Add event listeners for all like buttons after the Swiper initializes
document.addEventListener('DOMContentLoaded', function () {
  // Get all like buttons inside Swiper slides
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(button => {
      button.addEventListener('click', function() {
          toggleLike(this); // Call the function when a like button is clicked
      });
  });
});
