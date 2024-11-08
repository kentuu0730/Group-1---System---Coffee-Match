class SwiperSlider {
  constructor(selector) {
    this.slider = new Swiper(selector, {
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

    this.addEventListeners();
  }

  addButtonEventListener(buttonSelector, eventHandler) {
    const buttons = document.querySelectorAll(buttonSelector);
    buttons.forEach(button => {
      button.addEventListener('click', eventHandler);
    });
  }

  addEventListeners() {
    this.addButtonEventListener('.like-btn', (event) => {
      event.stopPropagation();
      this.toggleLike(event.target);
    });

    this.addButtonEventListener('.dislike-btn', (event) => {
      event.stopPropagation();
      this.toggleDislike(event);
    });

    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        this.toggleOverlay(slide);
      });
    });
  }

  toggleLike(button) {
    const coffeeName = button.closest('.tranding-slide').querySelector('.coffe-name').innerText;
    const coffeePrice = button.closest('.tranding-slide').querySelector('.Coffee-price').innerText;
    const coffeeImage = button.closest('.tranding-slide').querySelector('.tranding-slide-img img').src;

    const coffeeData = { name: coffeeName, price: coffeePrice, image: coffeeImage };
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some(fav => fav.name === coffeeName)) {
      favorites.push(coffeeData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${coffeeName} has been added to your favorites!`);
    } else {
      alert(`${coffeeName} is already in your favorites.`);
    }
  }

  toggleDislike(event) {
    event.stopPropagation();
    const slide = event.target.closest('.swiper-slide');
    slide.remove();
    this.slider.update();
  }

  loadReviews(overlay) {
    const reviewsSection = overlay.querySelector('.reviews');
    if (!reviewsSection.innerHTML) {
      reviewsSection.innerHTML = `<p>Loading reviews...</p>`;
    }
  }

  loadMap(overlay) {
    const mapsSection = overlay.querySelector('.google-maps');
    if (!mapsSection.innerHTML) {
      mapsSection.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`;
    }
  }

  toggleOverlay(slide) {
    const overlay = slide.querySelector('.overlay');
    overlay.classList.toggle('visible');
    this.loadReviews(overlay);
    this.loadMap(overlay);
  }
}

const trandingSlider = new SwiperSlider('.tranding-slider');
