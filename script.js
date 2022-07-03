const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '_fMvwoDwUEypy_knHGNP8o0eVIeKsQWVyVgl-KZcCrI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Fetch photos unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {}
}

// Check if all imgs are loaded
function imageLoaded() {
  imageLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create element for links,photos, Add to DOM
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Create link
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create img
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.full);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.full,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // EventlistenerCheck if imgs batch finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Check if scroll reached btm
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
  }
});

// On load
getPhotos();
