import images from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
gallery.innerHTML = makeGalleryMarkup(images);
const modal = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector(
  "button[data-action='close-lightbox']"
);
const modalImg = document.querySelector(".lightbox__image");
const overlayEl = document.querySelector(".lightbox__overlay");

gallery.addEventListener("click", openModalWindow);
closeModalBtn.addEventListener("click", closeModalWindow);
overlayEl.addEventListener("click", onOverlayClick);

function makeGalleryMarkup(array) {
  return array
    .map(
      (element) =>
        `<li class="gallery__item">
    <a
        class="gallery__link "
        href=${element.original}
    >
        <img
            loading="lazy"
            class="gallery__image lazyload"
            data-src=${element.preview}
            data-source=${element.original}
            alt="${element.description}"
        />
    </a>
</li>`
    )
    .join("");
}

function openModalWindow(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  evt.preventDefault();
  modal.classList.add("is-open");
  modalImg.src = evt.target.dataset.source;
  modalImg.alt = evt.target.alt;
  window.addEventListener("keydown", onKeysPress);
}

function closeModalWindow() {
  modal.classList.remove("is-open");
  modalImg.src = "";
  window.removeEventListener("keydown", onKeysPress);
}
function onOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow();
  }
}
function onKeysPress(evt) {
  const currentImg = images.indexOf(
    images.find((img) => img.original === modalImg.src)
  );
  if (evt.code === "Escape") {
    closeModalWindow();
  } else if (evt.code === "ArrowRight") {
    if (images[currentImg + 1] !== undefined) {
      modalImg.src = images[currentImg + 1].original;
      modalImg.alt = images[currentImg + 1].description;
    }
  } else if (evt.code === "ArrowLeft") {
    if (images[currentImg - 1] !== undefined) {
      modalImg.src = images[currentImg - 1].original;
      modalImg.alt = images[currentImg - 1].description;
    }
  }
}
if ("loading" in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll(".lazyload");
  lazyImages.forEach((image) => (image.src = image.dataset.src));
} else {
  const lazyScript = document.createElement("script");
  lazyScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js";
  lazyScript.integrity =
    "sha512 - TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb + Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF / XjTUg ==";
  lazyScript.crossOrigin = "anonymous";
  document.body.appendChild(lazyScript);
}
