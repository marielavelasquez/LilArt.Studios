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
  const fechaElegida = daySelect.value;
  hourSelect.innerHTML = "<option value=''>-- Elige una hora --</option>";

  const hayHorariosDisponibles = fechasDisponibles[fechaElegida];
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

  const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comment = document.getElementById("comment").value;
    const date = document.getElementById("day").value;
    const hour = document.getElementById("hour").value;
    const system = document.getElementById("system").value;
    const reference = document.getElementById("reference").value;


    const message = `¡Hola! Nueva reserva 

 Nombre: ${name}
 Email: ${email}
 Teléfono: ${phone}
 Fecha: ${date}
 Hora: ${hour}
 ¿Como llegaste hasta aqui?: ${reference}
 Sistema deseado: ${system}
 Comentario: ${comment}
 `;

    const phoneNumber = "34641216186"; 
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  
  const dia = daySelect.value;
  const hora = hourSelect.value;
  
  if (!dia || !hora || !reference) { 
    alert("Por favor selecciona una fecha y hora.");
    return;
  }

  
  // Si quieres limpiar el formulario después:
  form.reset();
  hourSelect.innerHTML = "<option value=''>-- Primero elige una fecha --</option>";
});