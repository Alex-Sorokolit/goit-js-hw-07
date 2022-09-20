import { galleryItems } from './gallery-items.js';
// Change code below this line


const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

// Генерування розмітки
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery (items) {
 return items
 .map(({preview, original, description})=> {
  return `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>
  `})
  .join(' ');
};
// console.log(galleryContainer);


// Делегування подій, для однакогої дії однотипних елементів
const container = document.querySelector('.gallery');
container.addEventListener('click', onClick);

// Відкриття модалки по натисненню на прев'ю
function onClick(event) {
 event.preventDefault()
 // Перевірка чи ми клікнули в зображення
 if (event.target.nodeName !== 'IMG') {
  return;
};


};

let lightbox = new SimpleLightbox('.gallery a', {
 captionsData: 'alt',
 captionDelay: 250,
 captionPosition: 'bottom',
});

