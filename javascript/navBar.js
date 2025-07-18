document.addEventListener('DOMContentLoaded', () => {
  // 1. Referencias
  const navbarCollapseContainer = document.getElementById('navbarNav');
  const navbarCollapse = new bootstrap.Collapse(navbarCollapseContainer, { toggle: false });
  const menuLinks = document.querySelectorAll('.nav-item-close[href^="#"], .dropdown-item[href^="#"]');

  // 2. Guardaremos el destino al que queremos ir
  let scrollSection = null;

  // 3. Cuando termine de ocultarse el collapse, hacemos el scroll
  navbarCollapseContainer.addEventListener('hidden.bs.collapse', () => {
    if (scrollSection) {
      // Cambiamos el hash en la URL, esto dispara el scroll al elemento
      window.location.hash = scrollSection;
      scrollSection = null;
    }
  });

  // 4. Interceptamos el clic en cada enlace de ancla
  menuLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();                  // Evita el scroll automático inmediato
      const targetHash = link.getAttribute('href'); 
      
      // Solo procedemos si es un enlace interno (#algo)
      if (targetHash.startsWith('#')) {
        scrollSection = targetHash;             // Guardamos hacia dónde queremos ir

        // Si el menú está abierto, lo cerramos; al cerrar se disparará hidden.bs.collapse
        if (navbarCollapseContainer.classList.contains('show')) {
          navbarCollapse.hide();
        } else {
          // Si ya está cerrado, igual forzamos el scroll inmediatamente
          window.location.hash = scrollSection;
          scrollSection = null;
        }
      }
    });
  });
});