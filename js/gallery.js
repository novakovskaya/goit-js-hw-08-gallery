import galleryItems from './app.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  closeModalOverlay: document.querySelector('.lightbox__overlay'),
};

const galleryItemsMarkup = createGalleryCardsMarkup(galleryItems);
// console.log(galleryItemsMarkup);

function createGalleryCardsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
        </a>
      </li>`;
    })
    .join('');
}

refs.galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

refs.galleryList.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.closeModalOverlay.addEventListener('click', onCloseModalClickOnOverlay);

function onOpenModal(event) {
  if (event.target.nodeName === 'IMG') {
    event.preventDefault();

    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = event.target.dataset.source;
    refs.lightboxImage.alt = event.target.alt;
  }

  window.addEventListener('keydown', onEscKeyDown);
}

function onCloseModal(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';

  window.removeEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModalClickOnOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onScrollingGalleryImages(event) {}
