// Link de Google Apps Script de Bogado Sergio
const scriptURL = 'https://script.google.com/macros/s/AKfycbxNUCwKOHdZgfp5qhI7vvxx_3z9V_OHhk936LxGtkWuVjo2iVop9dy9BbyE8e64575SAA/exec';

const ctaBtn = document.getElementById('cta-button');
const backBtn = document.getElementById('back-btn');
const mainContent = document.getElementById('main-content');
const regForm = document.getElementById('registration-form');
const googleForm = document.getElementById('google-sheet-form');
const successMsg = document.getElementById('success-message');
const estudiosSelect = document.getElementById('estudios-select');
const detalleContainer = document.getElementById('detalle-estudios-container');
const detalleInput = document.getElementById('detalle-estudios-input');

// Lógica para mostrar el campo "Hasta" según la selección
estudiosSelect.addEventListener('change', () => {
    if (estudiosSelect.value !== "") {
        detalleContainer.classList.remove('hidden');
        detalleInput.required = true;
        if (estudiosSelect.value === "Primaria Incompleta") {
            detalleInput.placeholder = "¿Hasta qué grado hiciste?";
        } else {
            detalleInput.placeholder = "¿Hasta qué año llegaste?";
        }
    }
});

// Navegación entre secciones
ctaBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    regForm.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
    regForm.classList.add('hidden');
    mainContent.classList.remove('hidden');
});

// Envío de datos a Google Sheets
googleForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const submitBtn = googleForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerText = "Registrando...";

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(googleForm)
    })
    .then(response => {
        console.log('¡Éxito!', response);
        regForm.classList.add('hidden');
        successMsg.classList.remove('hidden');
    })
    .catch(error => {
        console.error('¡Error!', error.message);
        alert('Hubo un problema al enviar los datos. Reintentá en unos segundos.');
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirmar Registro 🚀";
    });
});