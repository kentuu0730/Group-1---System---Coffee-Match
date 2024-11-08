window.onload = function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
    } else {
        favorites.forEach((coffee, index) => {
            const coffeeItem = document.createElement('div');
            coffeeItem.classList.add('favorite-item');
            coffeeItem.innerHTML = `
                <div class="favorite-item-img">
                    <img src="${coffee.image}" alt="${coffee.name}">
                </div>
                <div class="favorite-item-details">
                    <h2>${coffee.name}</h2>
                    <p>${coffee.price}</p>
                </div>
                <button class="trash-btn" onclick="removeFavorite(${index})">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            `;
            favoritesContainer.appendChild(coffeeItem);
        });
    }
};

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.location.reload();
}
