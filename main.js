import './styles/style.scss';

const sprayCansContainer = document.querySelector('#sprayCansForSale');
const cartContainer = document.querySelector('#cartSection');

const sprayCans = [
  { id: 1, name: 'CanCan in Sunset', price: 100, image: { src: '/assets/pictures/orange.jpg', alt: 'Spray Can 1 Image' }, amount: 0 },
  { id: 2, name: 'Yellow Mr. Sunshine', price: 120, image: { src: 'assets/pictures/yellow.jpg', alt: 'Spray Can 2 Image' }, amount: 0 },
  { id: 3, name: 'Red Rush ', price: 140, image: { src: 'assets/pictures/red.jpg', alt: 'Spray Can 3 Image' }, amount: 0 },
  { id: 4, name: 'Pink that Party', price: 110, image: { src: 'assets/pictures/pink.jpg', alt: 'Spray Can 4 Image' }, amount: 0 },
  { id: 5, name: 'Bloom Fusia, bloom', price: 110, image: { src: 'assets/pictures/fusia.jpg', alt: 'Spray Can 5 Image' }, amount: 0 },
  { id: 6, name: 'Cast a spell', price: 100, image: { src: 'assets/pictures/chrome.jpg', alt: 'Spray Can 6 Image' }, amount: 0 },
  { id: 7, name: 'Blue Lagoon', price: 140, image: { src: 'assets/pictures/blue.jpg', alt: 'Spray Can 7 Image' }, amount: 0 },
  { id: 8, name: 'Blue Velvet', price: 130, image: { src: 'assets/pictures/darkblue.jpg', alt: 'Spray Can 8 Image' }, amount: 0 },
  { id: 9, name: 'Greener than grass', price: 140, image: { src: 'assets/pictures/green.jpg', alt: 'Spray Can 9 Image' }, amount: 0 },
];

function getCurrentDiscount() {
  const now = new Date();
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
/*    Hantera bulk rabatt */
    if (can.amount >= 10) {
      can.discountedPrice = can.discountedPrice * 0.90;
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
          </div>
        </article>
      `;
      totalItems += can.amount;
      totalCost += can.discountedPrice * can.amount;
    }
  });

/*  Lägg till rabatterad total */
  const discountInfo = getCurrentDiscount();
  if (discountInfo.type === 'discount') {
    cartContainer.innerHTML += `<div>Måndagsrabatt: 10% på hela beställningen</div>`;
  }

/*    Fraktkostnad */
  let shippingCost = 0;
  if (totalItems > 15) {
    shippingCost = 0;
  } else {
    shippingCost = 25 + (totalCost * 0.10);
  }

  cartContainer.innerHTML += `<div>Shipping: ${shippingCost.toFixed(2)} kr</div>`;
  totalCost += shippingCost;

  cartContainer.innerHTML += `<div>Total: ${totalCost.toFixed(2)} kr</div>`;

/*  Betalningsmetod */
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

function decreaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex(item => item.id === index);

  if (sprayCans[arrayIndex].amount > 0) {
    sprayCans[arrayIndex].amount -= 1;
  }
  printSprayCans();
}

function increaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex(item => item.id === index);

  sprayCans[arrayIndex].amount += 1;
  printSprayCans();
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

printSprayCans();