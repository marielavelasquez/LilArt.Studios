document.addEventListener("DOMContentLoaded", function () {
  const fechasDisponibles = {
    "2025-06-15": ["10:00", "12:00", "15:30"],
    "2025-06-18": ["09:00", "11:30", "17:00"],
    "2025-06-20": ["13:00", "16:00", "18:30"],
  };

  const daySelect = document.getElementById("day");
  const hourSelect = document.getElementById("hour");

  Object.keys(fechasDisponibles).forEach(fecha => {
    const option = document.createElement("option");
    option.value = fecha;

    const fechaBonita = new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    option.textContent = fechaBonita;
    daySelect.appendChild(option);
  });

  daySelect.addEventListener("change", () => {
    const fechaElegida = daySelect.value;
    hourSelect.innerHTML = "<option value=''>-- Elige una hora --</option>";

    const horarios = fechasDisponibles[fechaElegida];
    if (horarios) {
      horarios.forEach(hora => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        hourSelect.appendChild(option);
      });
    }
  });

  function crearLinkGoogleCalendar(fecha, horaInicio, duracionHoras, titulo, descripcion) {
    const [year, month, day] = fecha.split('-');
    const [hour, minute] = horaInicio.split(':');

    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(start.getTime() + duracionHoras * 60 * 60 * 1000);

    function formatearFecha(fecha) {
      return fecha.toISOString().replace(/[-:]|\.\d{3}/g, '');
    }

    const startStr = formatearFecha(start);
    const endStr = formatearFecha(end);

    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(titulo)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(descripcion)}`;
    return url;
  }

  const form = document.getElementById("whatsapp-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comment = document.getElementById("comment").value;
    const date = document.getElementById("day").value;
    const hour = document.getElementById("hour").value;
    const system = document.getElementById("system").value;
    const reference = document.getElementById("reference").value;

    const tituloEvento = `Reserva LilArt Studios - ${name}`;
    const descripcionEvento = `Sistema: ${system}\nComentario: ${comment}\n¿Cómo llegó?: ${reference}\nEmail: ${email}\nTeléfono: ${phone}`;

    const linkGoogleCalendar = crearLinkGoogleCalendar(date, hour, 1, tituloEvento, descripcionEvento);

    const message = `¡Hola! Nueva reserva

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Fecha: ${date}
Hora: ${hour}
Sistema: ${system}
¿Cómo llegó hasta aquí?: ${reference}
Comentario: ${comment}

Agregar al calendario: ${linkGoogleCalendar}
`;

    const phoneNumber = "34624643500"; 
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    form.reset();
    hourSelect.innerHTML = "<option value=''>-- Primero elige una fecha --</option>";
  });
});
