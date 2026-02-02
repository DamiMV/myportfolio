// Función global para cerrar el modal
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
      modal.style.display = 'none';
  }
}

// Función para mostrar el modal
function showModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
      modal.style.display = 'grid';
  }
}

// Cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('successModal');

  // Manejar el envío del formulario con AJAX
  if (form) {
      form.addEventListener('submit', async (e) => {
          e.preventDefault(); // Prevenir el envío tradicional
          
          const formData = new FormData(form);
          const submitBtn = form.querySelector('button[type="submit"]');
          
          // Cambiar texto del botón mientras se envía
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Enviando...';
          submitBtn.disabled = true;

          try {
              const response = await fetch(form.action, {
                  method: 'POST',
                  body: formData,
                  headers: {
                      'Accept': 'application/json'
                  }
              });

              if (response.ok) {
                  // Mostrar el modal de éxito
                  showModal();
                  // Limpiar el formulario
                  form.reset();
              } else {
                  alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
              }
          } catch (error) {
              alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
          } finally {
              // Restaurar el botón
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
          }
      });
  }

  // Cerrar modal al hacer clic fuera
  if (modal) {
      window.addEventListener('click', (e) => {
          if (e.target === modal) {
              closeModal();
          }
      });
  }
});
