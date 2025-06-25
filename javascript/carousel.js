document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const images = document.querySelectorAll('.carousel-track img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carousel = document.querySelector('.gallery-carousel');

  let currentIndex = 1; // empezamos en el primer slide real
  let autoSlideInterval;
  let isMoving = false;

  // Clonar primer y último slide para efecto bucle infinito
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);
  firstClone.classList.add('first-clone');
  lastClone.classList.add('last-clone');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  function updateCarousel(animate = true) {
    const width = carousel.offsetWidth;
    if (animate) track.style.transition = 'transform 0.5s ease-in-out';
    else track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  track.addEventListener('transitionend', () => {
    const imagesNow = document.querySelectorAll('.carousel-track img');
    isMoving = false;
    if (imagesNow[currentIndex].classList.contains('first-clone')) {
      currentIndex = 1;
      updateCarousel(false);
    }
    if (imagesNow[currentIndex].classList.contains('last-clone')) {
      currentIndex = imagesNow.length - 2;
      updateCarousel(false);
    }
  });

  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (isMoving) return;
      isMoving = true;
      currentIndex++;
      updateCarousel();
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function goToNext() {
    if (isMoving) return;
    isMoving = true;
    stopAutoSlide();
    currentIndex++;
    updateCarousel();
    startAutoSlide();
  }

  function goToPrev() {
    if (isMoving) return;
    isMoving = true;
    stopAutoSlide();
    currentIndex--;
    updateCarousel();
    startAutoSlide();
  }

  nextBtn.addEventListener('click', goToNext);
  prevBtn.addEventListener('click', goToPrev);

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  [prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('mouseenter', stopAutoSlide);
    btn.addEventListener('mouseleave', startAutoSlide);
  });

  window.addEventListener('resize', () => updateCarousel(false));

  updateCarousel(false);
  startAutoSlide();
});