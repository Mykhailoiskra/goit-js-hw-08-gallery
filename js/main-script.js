import images from "./gallery-items.js";

function makeGalleryMarkup(array) {
  return array
    .map(
      (element) =>
        `<li class="gallery__item">
    <a
        class="gallery__link"
        href=${element.original}
    >
        <img
            class="gallery__image"
            src=${element.preview}
            data-source=${element.original}
            alt=${element.description}
        />
    </a>
</li>`
    )
    .join("");
}

const markup = makeGalleryMarkup(images);
const gallery = document.querySelector(".js-gallery");
gallery.innerHTML = markup;
