// Botones que al hacer click te llevan a la sección de servicios
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("form-reserve");
  if (!section) return;

  const buttonIds = [
    "btn-go-reservar",
    "btn-go-reservar2",
    "btn-go-reservar3",
  ];

  for (const id of buttonIds) {
    const button = document.getElementById(id);
    if (!button) continue;

    button.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
    });
  }
});

