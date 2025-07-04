//boton que al hacer click te lleva a la seccion de servicios
document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("btn-go-reservar");

  button.addEventListener("click", function () {
    const section = document.getElementById("form-reserve");
    section.scrollIntoView({ behavior: "smooth" });
  });

});
 
  const seconButton = document.getElementById("btn-go-reservar2");
  
  seconButton.addEventListener("click", function (){
    const section = document.getElementById("form-reserve");
    section.scrollIntoView({ behavior: "smooth"})
  });

  const thirdButton = document.getElementById("btn-go-reservar3");

  thirdButton.addEventListener("click", function (){
    const section = document.getElementById("form-reserve");
    section.scrollIntoView({bahavior: "smooth"})
  });