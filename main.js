/* import './styles/styles'


const cans = [
    {
      id: 1,
      name: 'CanCan',
      price: 10,
      images: [
        {
          src: 'orangecolor.jpg',
          alt: 'Orange sprayflaska',
        },
        {
          src: 'bild2.jpg',
          alt: 'Annan orange sprayflaska',
        },
      ],
      rating: 1,
      amount: 0,
      category: 'Dark colors',
    },
    {
      id: 2,
      name: 'Can you hear me?',
      price: 50,
      images: [
        {
          src: 'bild.jpg',
          alt: 'Stark röd färg på sprayflaska',
        },
        {
          src: 'bild2.jpg',
          alt: 'Annan starkt röd färg på sprayflaska',
        },
      ],
      rating: 2,
      amount: 0,
      category: 'Bright colors',
    },
    {
      id: 3,
      name: 'Candy Cotton',
      price: 20,
      images: [
        {
          src: 'bild.jpg',
          alt: 'Pastellrosa sprayfärg',
        },
        {
          src: 'bild2.jpg',
          alt: 'Annan pastellrosa sprafärg',
        },
      ],
      rating: 3,
      amount: 0,
      category: 'Pastel colors',
    },
  ];
  
function displayCans() {
    const sprayContainer = document.getElementById('sprayContainer');
    let html = '';
  
    cans.forEach(can => {
      html += `
        <div class="can">
          <h2>${can.name}</h2>
          <p>Price: $${can.price}</p>
          <div class="images">
            ${can.images.map(image => `<img src="${image.src}" alt="${image.alt}" />`).join('')}
          </div>
          <p>Rating: ${can.rating}</p>
          <p>Category: ${can.category}</p>
        </div>
      `;
    });
  
    sprayContainer.innerHTML = html;
  }
  
  document.addEventListener('DOMContentLoaded', displayCans); */