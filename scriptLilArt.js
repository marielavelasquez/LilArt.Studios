//boton que al hacer click te lleva a la seccion de servicios
document.addEventListener("DOMContentLoaded", function () {

  const boton = document.getElementById("btn-ir-servicios");

  boton.addEventListener("click", function () {

    const seccion = document.getElementById("services");

    seccion.scrollIntoView({ behavior: "smooth" });
  });
});

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

  const allImages = document.querySelectorAll('.carousel-track img');

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

// Lista de fechas disponibles (formato YYYY-MM-DD)

const fechasDisponibles = {
  "2025-06-15": ["10:00", "12:00", "15:30"],
  "2025-06-18": ["09:00", "11:30", "17:00"],
  "2025-06-20": ["13:00", "16:00", "18:30"],

};

const daySelect = document.getElementById("day");
const hourSelect = document.getElementById("hour");

// PASO 1: Llenar el select de días

Object.keys(fechasDisponibles).forEach(fecha => {
  const option = document.createElement("option");
  option.value = fecha;

  //Mostrar las fechas de formato mas bonita
  const fechaBonita = new Date(fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })


  option.textContent = fechaBonita;
  daySelect.appendChild(option);
})

// PASO 2: Cuando la clienta elige un día, se muestran solo las horas de ese día
daySelect.addEventListener("change", () => {
  const fechaElegidda = daySelect.value;
  hourSelect.innerHTML = "<option value=''>-- Elige una hora --</option>";

  const hayHorariosDisponibles = fechasDisponibles[fechaElegidda];
  if (hayHorariosDisponibles) {
    hayHorariosDisponibles.forEach(horario => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      hourSelect.appendChild(option);
    });
  }
})

// Capturar el formulario y controlar el envío
const form = document.querySelector(".form-reserva");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita que recargue la página

  const dia = daySelect.value;
  const hora = hourSelect.value;
  const reference = document.getElementById("reference").value;

  if (!dia || !hora || !reference) { 
    alert("Por favor selecciona una fecha y hora.");
    return;
  }

  // Mostrar mensaje de éxito
  alert(`¡Tu cita ha sido reservada para el ${dia} a las ${hora}! gracias por contactarnos via: ${reference}`);
  
  // Si quieres limpiar el formulario después:
  form.reset();
  hourSelect.innerHTML = "<option value=''>-- Primero elige una fecha --</option>";
});