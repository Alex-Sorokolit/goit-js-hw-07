import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGallery (items) {
 return items
 .map(({preview, original, description})=> {
  return `
  <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
  `
 }).join(' ');
}
console.log(createGallery(galleryItems));

