// Un clic sur le Discord copie le pseudo
const discordButton = document.getElementById("copyDiscord");
const discordValue = document.getElementById("discordValue");
discordButton.addEventListener("click", function () {
  const username = "idragood";
  navigator.clipboard.writeText(username).then(function () {
    discordValue.textContent = "Copied!";
    setTimeout(function () {
      discordValue.textContent = username;
    }, 1800);
  }).catch(function () {});
});

// Agrandir les images d'un bloc : on navigue seulement entre les images du même jeu
const zoomButtons = document.querySelectorAll(".zoom");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lbImage");
const closeButton = document.getElementById("lbClose");
let currentButtons = [];
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + currentButtons.length) % currentButtons.length;
  const image = currentButtons[currentIndex].querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

function openLightbox(button) {
  const groupName = button.dataset.group;
  currentButtons = Array.from(zoomButtons).filter(function (item) {
    return item.dataset.group === groupName;
  });
  showImage(currentButtons.indexOf(button));
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  currentButtons[currentIndex].focus();
}

zoomButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    openLightbox(button);
  });
});
closeButton.addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", function () {
  showImage(currentIndex - 1);
});
document.getElementById("lbNext").addEventListener("click", function () {
  showImage(currentIndex + 1);
});
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key === "ArrowRight") showImage(currentIndex + 1);
});

// Un bloc a 4 cases au maximum : s'il y a plus d'images, la 4e affiche +N
document.querySelectorAll(".group").forEach(function (group) {
  const buttons = group.querySelectorAll(".zoom");
  if (buttons.length > 4) {
    const counter = document.createElement("span");
    counter.className = "more-count";
    counter.textContent = "+" + (buttons.length - 4);
    buttons[3].appendChild(counter);
  }
});
