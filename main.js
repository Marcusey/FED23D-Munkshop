import './styles/style.scss';

const sprayCansContainer = document.querySelector('#sprayCansForSale');
const cartContainer = document.querySelector('#cartSection');

const sprayCans = [
  { id: 1, name: 'CanCan in Sunset', price: 100, image: { src: '/assets/pictures/orange.jpg', alt: 'Spray Can 1 Image' }, amount: 0, stars: 4, category: 'dark' },
  { id: 2, name: 'Yellow Mr. Sunshine', price: 120, image: { src: 'assets/pictures/yellow.jpg', alt: 'Spray Can 2 Image' }, amount: 0, stars: 3.5, category: 'light' },
  { id: 3, name: 'Red Rush ', price: 140, image: { src: 'assets/pictures/red.jpg', alt: 'Spray Can 3 Image' }, amount: 0, stars: 5, category: 'light' },
  { id: 4, name: 'Pink that Party', price: 110, image: { src: 'assets/pictures/pink.jpg', alt: 'Spray Can 4 Image' }, amount: 0, stars: 4.5, category: 'pastel' },
  { id: 5, name: 'Bloom Fusia, bloom', price: 110, image: { src: 'assets/pictures/fusia.jpg', alt: 'Spray Can 5 Image' }, amount: 0, stars: 3, category: 'light' },
  { id: 6, name: 'Cast a spell', price: 100, image: { src: 'assets/pictures/chrome.jpg', alt: 'Spray Can 6 Image' }, amount: 0, stars: 4, category: 'light' },
  { id: 7, name: 'Blue Lagoon', price: 140, image: { src: 'assets/pictures/blue.jpg', alt: 'Spray Can 7 Image' }, amount: 0, stars: 4.5, category: 'light' },
  { id: 8, name: 'Blue Velvet', price: 130, image: { src: 'assets/pictures/darkblue.jpg', alt: 'Spray Can 8 Image' }, amount: 0, stars: 3.5, category: 'dark' },
  { id: 9, name: 'Greener than grass', price: 140, image: { src: 'assets/pictures/green.jpg', alt: 'Spray Can 9 Image' }, amount: 0, stars: 4, category: 'dark' },
];


/* Hämta varukorgen från localStorage */
function getCartFromStorage() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

/* Spara varukorgen till localStorage */
function saveCartToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* Lägg till en händelselyssnare för att spara varukorgen varje gång den uppdateras */
function addCartEventListener() {
  window.addEventListener('beforeunload', () => {
    saveCartToStorage(sprayCans);
  });
}

/* Initialiserar varukorgen */
function initializeCart() {
  const savedCart = getCartFromStorage();
  if (savedCart.length > 0) {
    sprayCans.forEach(can => {
      const savedItem = savedCart.find(item => item.id === can.id);
      if (savedItem) {
        can.amount = savedItem.amount;
      }
    });
  }
}

initializeCart();
addCartEventListener();

// Funktion för att sortera produkter efter rating
function sortByRating() {
  sprayCans.sort((a, b) => b.stars - a.stars);
  printSprayCans(); // Uppdatera visningen efter sortering
}

// Funktion för att sortera produkter efter kategori
function sortByCategory(category) {
  const filteredCans = sprayCans.filter(can => can.category === category);
  sprayCansContainer.innerHTML = ''; // Rensa container innan uppdatering
  filteredCans.forEach(can => {
    sprayCansContainer.innerHTML += `
      <article>
        <h3>${can.name}</h3>
        <img src="${can.image.src}" alt="${can.image.alt}">
        <div>Price: <span>${can.discountedPrice.toFixed(2)}</span> kr</div>
        <div>Amount: <span>${can.amount}</span></div>
        <button class="minus" data-id="${can.id}">-</button>
        <button class="plus" data-id="${can.id}">+</button>
      </article>
    `;
  });
  // Lägg till händelselyssnare för knapparna
  addEventListenersToButtons();
}

// Lyssnare för knappar för att sortera produkter
const sortByRatingButton = document.querySelector('#sortByRating');
sortByRatingButton.addEventListener('click', sortByRating);

const sortByCategoryButton = document.querySelector('#sortByCategory');
sortByCategoryButton.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  sortByCategory(selectedCategory);
});


function getCurrentDiscount() {
  const now = new Date(); // Simulerad måndag 7 juni 2023
  const day = now.getDay();
  const hour = now.getHours();

  if (day === 1 && hour < 10) {
    return { type: 'discount', value: 0.10 }; /* 10% rabatt på måndagar före kl. 10 */
  } else if ((day === 5 && hour >= 15) || (day === 6) || (day === 0) || (day === 1 && hour < 3)) {
    return { type: 'surcharge', value: 0.15 }; /*  15% påslag från fredag kl. 15 till måndag kl. 03 */
  }

  return { type: 'none', value: 0 };
}

function applyDiscounts() {
  const discountInfo = getCurrentDiscount();
  sprayCans.forEach(can => {
    if (discountInfo.type === 'surcharge') {
      can.discountedPrice = can.price * (1 + discountInfo.value);
    } else {
      can.discountedPrice = can.price;
    }
    /* Hantera bulk rabatt */
    if (can.amount >= 10) {
      can.discountedPrice = can.discountedPrice * 0.90;
      can.bulkDiscountApplied = true; // Lägg till flagga för bulk rabatt
    } else {
      can.bulkDiscountApplied = false; // Återställ flagga om mängden är under 10
    }
  });
}

function calculateTotal() {
  let total = 0;
  sprayCans.forEach(can => {
    total += can.discountedPrice * can.amount;
  });

  const discountInfo = getCurrentDiscount();
  if (discountInfo.type === 'discount') {
    total *= (1 - discountInfo.value);
  }

  return total;
}

function updateCart() {
  cartContainer.innerHTML = '<h1>Shoppingcart</h1>';

  let totalItems = 0;
  let totalCost = 0;

  sprayCans.forEach(can => {
    if (can.amount > 0) {
      cartContainer.innerHTML += `
        <article class="cart-item">
          <img src="${can.image.src}" alt="${can.image.alt}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${can.name}</h3>
            <div>Price per unit: <span>${can.discountedPrice.toFixed(2)}</span> kr</div>
            <div>Amount: <span>${can.amount}</span></div>
            ${can.bulkDiscountApplied ? '<div>10% avdrag</div>' : ''}
          </div>
        </article>
      `;
      totalItems += can.amount;
      totalCost += can.discountedPrice * can.amount;
    }
  });

  /* Lägg till rabatterad total */
  const discountInfo = getCurrentDiscount();
  if (discountInfo.type === 'discount') {
    cartContainer.innerHTML += `<div>Måndagsrabatt: 10% på hela beställningen</div>`;
  }

  /* Fraktkostnad */
  let shippingCost = 0;
  if (totalItems > 15) {
    shippingCost = 0;
  } else {
    shippingCost = 25 + (totalCost * 0.10);
  }

  cartContainer.innerHTML += `<div>Shipping: ${shippingCost.toFixed(2)} kr</div>`;
  totalCost += shippingCost;

  cartContainer.innerHTML += `<div>Total: ${totalCost.toFixed(2)} kr</div>`;

  /* Betalningsmetod */
  if (totalCost > 800) {
    cartContainer.innerHTML += `<div>Betalsätt: Faktura ej tillgänglig för order över 800 kr</div>`;
  } else {
    cartContainer.innerHTML += `
      <div>Betalsätt:
        <select>
          <option value="card">Kort</option>
          <option value="invoice">Faktura</option>
        </select>
      </div>
    `;
  }
}

/* Timer för att rensa varukorgen efter 15 minuter */
let inactivityTimer;

function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert('Du var för långsam, din varukorg har rensats.');
    sprayCans.forEach(can => can.amount = 0); // Rensa varukorgen
    saveCartToStorage(sprayCans); // Uppdatera localStorage
    printSprayCans(); // Uppdatera visningen
  }, 15 * 60 * 1000); // 15 minuter
}

function decreaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex(item => item.id === index);

  if (sprayCans[arrayIndex].amount > 0) {
    sprayCans[arrayIndex].amount -= 1;
  }
  printSprayCans();
  startInactivityTimer(); // Starta om timern
}

function increaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex(item => item.id === index);

  sprayCans[arrayIndex].amount += 1;
  printSprayCans();
  startInactivityTimer(); // Starta om timern
}

function printSprayCans() {
  sprayCansContainer.innerHTML = '';

  applyDiscounts();

  sprayCans.forEach(can => {
    sprayCansContainer.innerHTML += `
      <article>
        <h3>${can.name}</h3>
        <img src="${can.image.src}" alt="${can.image.alt}">
        <div>Price: <span>${can.discountedPrice.toFixed(2)}</span> kr</div>
        <div>Amount: <span>${can.amount}</span></div>
        <button class="minus" data-id="${can.id}">-</button>
        <button class="plus" data-id="${can.id}">+</button>
      </article>
    `;
  });

  const minusBtns = document.querySelectorAll('button.minus');
  const plusBtns = document.querySelectorAll('button.plus');

  minusBtns.forEach(btn => {
    btn.addEventListener('click', decreaseAmount);
  });

  plusBtns.forEach(btn => {
    btn.addEventListener('click', increaseAmount);
  });

  updateCart();
}

/* Återställ formuläret */
function resetForm() {
  const form = document.querySelector('form');
  form.reset();
}

/* Lyssna på knappen för att återställa formuläret */
const resetFormButton = document.querySelector('#resetForm');
resetFormButton.addEventListener('click', resetForm);

initializeCart();
addCartEventListener();
printSprayCans();
startInactivityTimer(); // Starta timern när sidan laddas
