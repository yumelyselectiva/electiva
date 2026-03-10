const infoData = {
    google: {
        title: "Impacto de Google (2024)",
        content: `
            <p>Google ha escalado su infraestructura para soportar modelos de lenguaje avanzados, lo que ha disparado su consumo hídrico.</p>
            <ul>
                <li><strong>Consumo Operativo:</strong> Aproximadamente 31,000 millones de litros de agua dulce en 2024.</li>
                <li><strong>Retos de IA:</strong> En 2021, solo sus servidores en EE.UU. usaron 12,700 millones de litros para refrigeración.</li>
                <li><strong>Objetivo 2030:</strong> Reponer el 120% del agua dulce consumida en sus centros de datos y oficinas.</li>
                <li><strong>Transparencia:</strong> Actualmente repone cerca del 64% de su consumo global (17,000 millones de litros).</li>
            </ul>
        `
    },
    microsoft: {
        title: "Estrategias de Microsoft",
        content: `
            <p>Microsoft está rediseñando la arquitectura física de sus centros de datos para eliminar la dependencia del agua.</p>
            <ul>
                <li><strong>Inversión IA:</strong> 50,000 millones de dólares destinados a infraestructura optimizada para IA.</li>
                <li><strong>Diseño "Zero-Water":</strong> Nuevos centros en 2025 usarán circuitos cerrados que recirculan el agua sin pérdida.</li>
                <li><strong>Compromiso:</strong> Ser "Agua Positiva" para 2030, devolviendo más agua de la que extraen.</li>
                <li><strong>Eficiencia:</strong> Han reducido su consumo promedio a 0.30 litros por kWh, una mejora sustancial desde 2021.</li>
            </ul>
        `
    },
    global: {
        title: "Escenario Global 2025",
        content: `
            <p>La escala masiva de la IA generativa plantea un desafío sistémico para los recursos hídricos mundiales.</p>
            <ul>
                <li><strong>Proyección 2025:</strong> Se estima un consumo de 765,000 millones de litros asociados solo a la IA.</li>
                <li><strong>Comparativa:</strong> Esta cifra supera la demanda mundial anualizada de agua embotellada.</li>
                <li><strong>Riesgo Geográfico:</strong> El 66% de los nuevos centros de datos se ubican en zonas con alto estrés hídrico.</li>
                <li><strong>Calor y Datos:</strong> La refrigeración líquida por evaporación es hoy el estándar, pero el más costoso en recursos.</li>
            </ul>
        `
    },
    solutions: {
        title: "La IA como Solución",
        content: `
            <p>Aunque consume agua, la IA también es una herramienta poderosa para optimizar su gestión a nivel global.</p>
            <ul>
                <li><strong>Detección de Fugas:</strong> Algoritmos de IA identifican fallos en redes municipales, ahorrando billones de litros.</li>
                <li><strong>Agricultura de Precisión:</strong> Sensores con IA optimizan el riego, reduciendo el gasto agrícola hasta en un 40%.</li>
                <li><strong>Predicción Climática:</strong> Modelos avanzados ayudan a predecir sequías y gestionar embalses de forma dinámica.</li>
                <li><strong>Diseño de Materiales:</strong> Descubrimiento de nuevos catalizadores para desalinización más eficiente.</li>
            </ul>
        `
    }
};

function updateInfo(target) {
    const container = document.getElementById('info-content');
    const data = infoData[target];

    // Add fade-out effect
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
            <h3>${data.title}</h3>
            ${data.content}
        `;
        // Fade-in effect
        container.style.opacity = '1';
    }, 300);
}

// Event Listeners
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Toggle active class
        document.querySelectorAll('.info-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Update content
        const target = e.target.getAttribute('data-target');
        updateInfo(target);
    });
});

// Chatbot Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const sendMsg = document.getElementById('send-msg');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chatbot-messages');

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleBotResponse(text) {
    let response = "Interesante pregunta. La relación entre el agua y la IA es compleja, ¿quieres saber más sobre los datos de Google o Microsoft?";

    const lowerText = text.toLowerCase();
    if (lowerText.includes("google")) {
        response = "Google consumió 31 mil millones de litros en 2024. Su objetivo es reponer el 120% para 2030.";
    } else if (lowerText.includes("microsoft")) {
        response = "Microsoft está usando diseños 'zero-water' y planea ser 'Agua Positiva' para 2030.";
    } else if (lowerText.includes("litros") || lowerText.includes("cuanto") || lowerText.includes("consumo")) {
        response = "Se estima que para 2025, la IA consumirá 765 mil millones de litros a nivel global.";
    }

    setTimeout(() => {
        addMessage(response, 'bot');
    }, 600);
}

sendMsg.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        handleBotResponse(text);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMsg.click();
});

// Initial Content
document.addEventListener('DOMContentLoaded', () => {
    updateInfo('google');
});
