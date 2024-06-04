import './styles/style.scss';

const sprayCansContainer = document.querySelector('#sprayCansForSale');

const sprayCans = [
  {
    id: 1,
    name: 'CanCan in Sunset',
    price: 100,
    image: {
      src: '/assets/pictures/colororange.jpeg',
      alt: 'Spray Can 1 Image',
    },
    amount: 0,
  },
  {
    id: 2,
    name: 'Spray Can 2',
    price: 120,
    image: {
      src: 'path_to_image_2.jpg',
      alt: 'Spray Can 2 Image',
    },
    amount: 0,
  },
  {
    id: 3,
    name: 'Spray Can 3',
    price: 140,
    image: {
      src: 'path_to_image_3.jpg',
      alt: 'Spray Can 3 Image',
    },
    amount: 0,
  },
];

function decreaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex((item) => item.id === index);

  if (sprayCans[arrayIndex].amount > 0) {
    sprayCans[arrayIndex].amount -= 1;
  }
  printSprayCans();
}

function increaseAmount(e) {
  const index = Number(e.currentTarget.dataset.id);
  const arrayIndex = sprayCans.findIndex((item) => item.id === index);

  sprayCans[arrayIndex].amount += 1;
  printSprayCans();
}

function printSprayCans() {
  sprayCansContainer.innerHTML = '';

  sprayCans.forEach((can) => {
    sprayCansContainer.innerHTML += `
      <article>
        <h3>${can.name}</h3>
        <img src="${can.image.src}" alt="${can.image.alt}">
        <div>Price: <span>${can.price}</span> kr</div>
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

  plusBtns.forEach((btn) => {
    btn.addEventListener('click', increaseAmount);
  });
}

printSprayCans();
