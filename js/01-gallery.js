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




// Делегування подій, для однакової дії однотипних елементів
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
  const instance = basicLightbox.create(`<img src="${event.target.dataset.source}" width="800" height="600">`,
// Опції лайтбокс
// Чомусь одночасно обидві опції не хочуть працювати. Якщо включити onShow то тоді не відбувається onClose ні при кліку на модалку, ні при кліку поза модалку, ні при натисненні esc. 
// Якщо виключити onShow і залишити тільки onClose то все працює нормально. Слухача подій ми вішаємо там де instance.show() а прибираємо коли onClose. 


// додавання слухача подій (клавіатури) до показу модалки (не працює)
// {onShow: instance => {
//   console.log('add event listener');
//   window.addEventListener('keydown', onKeyPress);
// }
// },

// видалення слухача подій (клавіатури) перед закриттям модалки
{onClose: instance => {
  console.log('Видаляємо слухача подій функцією noClose перед закриттям модалки');
  window.removeEventListener('keydown', onKeyPress)
} 
});



// Відображаємо модалку
  instance.show()
  window.addEventListener('keydown', onKeyPress);
  console.log('додаємо слухача подій');



  // Закриття модалки по ESCAPE та гортання зображеннь стрілками
  function onKeyPress(event) {
    console.log(event.code);
    if (event.code === 'Escape'){
      instance.close()
      // тут вже не потрібно знімати слухача, ми його знімаємо на опції onClose
      // window.removeEventListener('keydown', onKeyPress)
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



