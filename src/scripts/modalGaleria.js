let currentSlide = 0;
const images = [
  "../assets/images/galeria/foto12.jpg",
  "../assets/images/galeria/foto3.jpg",
  "../assets/images/galeria/foto6.jpg",
  "../assets/images/galeria/foto8.jpg",
  "../assets/images/galeria/foto5.jpg",
  "../assets/images/galeria/foto2.jpg",
  "../assets/images/galeria/foto9.jpg",
  "../assets/images/galeria/foto7.jpg",
  "../assets/images/galeria/foto1.jpg",
  "../assets/images/galeria/foto4.jpg",
  "../assets/images/galeria/foto11.jpg",
  "../assets/images/galeria/foto10.jpg",
];

function openModal(index) {
  currentSlide = index;
  document.getElementById("modalImage").src = images[currentSlide];
  document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function changeSlide(n) {
  currentSlide = (currentSlide + n + images.length) % images.length;
  document.getElementById("modalImage").src = images[currentSlide];
}

document.getElementById("myModal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeModal();
  }
});

let startX;

document
  .getElementById("modalImage")
  .addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
  });

document
  .getElementById("modalImage")
  .addEventListener("touchend", function (event) {
    let endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
      changeSlide(1);
    } else if (startX < endX - 50) {
      changeSlide(-1);
    }
  });
