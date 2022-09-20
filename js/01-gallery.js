import { galleryItems } from './gallery-items.js';
// Change code below this line

// Отримання елементів із сторінки
const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);
let currentIndex = 0;


// Генерування розмітки
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
// В розмітку додаємо значення індекс із функції map
function createGallery (items) {
return items.map(({preview, original, description}, index)=> {
  return `
  <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</div>
  `})
  .join(' ');
};
console.log();




// Делегування подій, для однакогої дії однотипних елементів
const container = document.querySelector('.gallery');
container.addEventListener('click', onClick);



// Відкриття модалки по натисненню на прев'ю 
function onClick(event){
  event.preventDefault()

  // Перевірка чи ми клікнули в зображення
  if(event.target.nodeName !== 'IMG'){
    return;
  };

  // Отримуємо значення індекса і перетворюємо його в число
  currentIndex = Number(event.target.dataset.index)
  
  
  
  
  // Генерування модалки
  const instance = basicLightbox.create(`<img src="${event.target.dataset.source}" width="800" height="600">`)
  instance.show()
  window.addEventListener('keydown', onKeyPress);
  
  
  
  
  // Закриття модалки по ESCAPE та гортання зображеннь стрілками
  function onKeyPress(event) {
    console.log(event.code);
    if (event.code === 'Escape'){
      instance.close()
      window.removeEventListener('keydown', onKeyPress)
      console.log(event.code);
    };

    if (event.code === 'ArrowLeft') {
      currentIndex -= 1;
      if (currentIndex < 0) {
        currentIndex = galleryItems.length -1 
      }
      console.log(currentIndex);
      const src = galleryItems[currentIndex].original;
      // console.log(src);
      setIMG(src);
    };

    if (event.code === 'ArrowRight') {
      currentIndex += 1;
      if (currentIndex === galleryItems.length) {
        currentIndex = 0;
      }
      console.log(currentIndex);
      const src = galleryItems[currentIndex].original;
      // console.log(src);
      setIMG(src);
    };
    return;
  }
  
  function setIMG(src) {
    instance.element().querySelector('img').src = src;
  }
};



