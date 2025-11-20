import { planCreateHtml, planSessionHtml, sessionExcerciseHtml, previewSessionCardHtml } from '../components/planCreateHtml.js'
import { plansRender } from '../views/plans.js'
import { comboBoxRender } from '../views/comboBox.js'
import { switchRender } from '../views/switch.js'
import { restrictToDigits } from '../utils/inputCtrl.js'


const plansTemplate = [
    "Nuevo Plan",
    "Fuerza Total",
    "Potencia Base",
    "Volumen Progresivo",
    "Hipertrofia Modular",
    "Core Estable",
    "Sprint 21",
    "Carga 45",
    "Endurance X",
    "Shock 30",
    "Ritmo 60",
    "Plan A1",
    "Ciclo Base",
    "Fase Alpha",
    "Módulo 3.2",
    "Stack Funcional",
    "Desafío Titan",
    "Renacer",
    "Modo Bestia",
    "Impulso",
    "Sin Límite",
    "Power Boost",
    "Flex Core",
    "Alpha Reload",
    "Meta Engine",
    "Fit Cycle"
];

const excerciseArray = [
    "Sentadilla con barra",
    "Peso muerto convencional",
    "Press banca",
    "Press militar",
    "Dominadas pronadas",
    "Remo con barra",
    "Curl de bíceps con mancuernas",
    "Extensiones de tríceps en polea",
    "Elevaciones laterales",
    "Curl femoral en máquina",
    "Extensión de cuádriceps",
    "Elevación de talones (gemelos)",
    "Plancha frontal",
    "Plancha lateral",
    "Bird-dog",
    "Dead bug",
    "Rotaciones torácicas",
    "Estiramiento de cadera (hip flexor)",
    "Burpees",
    "Mountain climbers",
    "Jumping jacks",
    "Sprints en cinta",
    "Saltos al cajón",
    "Battle ropes",
    "Flexiones de brazos",
    "Sentadillas al aire",
    "Fondos en banco",
    "Puente de glúteos",
    "Zancadas caminando"
];

let sessionCount = 0;
let excerciseCount = 0;
let excerciseTotalCount = 0;
/*
function getPlanData() {
    const sessions = [];

    document.querySelectorAll("#sessions-container > .plan-session").forEach((session, index) => {

        const sessionName = session.querySelector(".plan-session-accordion input[type='text']").value.trim();
        const sessionOrder = parseInt(session.querySelector(".plan-session-accordion input[type='number']").value);

        const exercises = [];

        session.querySelectorAll(".session-excercise").forEach(ex => {
            const name = ex.querySelector("select").value;
            const series = ex.querySelector(".session-excercise-steps").value;
            const reps = ex.querySelector(".session-excercise-reps").value;
            const weight = ex.querySelector(".session-excercise-weight").value;

            exercises.push({
                exerciseName: name,
                series: parseInt(series) || 0,
                repetitions: parseInt(reps) || 0,
                weight: parseInt(weight) || 0
            });
        });

        sessions.push({
            order: sessionOrder,
            name: sessionName || `Sesión ${index + 1}`,
            exercises
        });
    });

    return { sessions };
}

const data = getPlanData();
console.log(JSON.stringify(data, null, 2));


// resultado
{
  "sessions": [
    {
      "order": 1,
      "name": "Pecho A",
      "exercises": [
        {
          "exerciseName": "Press de banca",
          "series": 4,
          "repetitions": 8,
          "weight": 70
        }
      ]
    },
    {
      "order": 2,
      "name": "Espalda B",
      "exercises": []
    }
  ]
}


// para la api
async function sendPlanToApi() {
    const data = getPlanData();

    const res = await fetch("/api/planes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);
}


*/
function createSessionCard(id) {
    const card = document.createElement("div");
    card.className = "session-card";
    card.dataset.sessionId = id;
    card.innerHTML = previewSessionCardHtml(id);
    document.getElementById("session-cards-container").appendChild(card);
    return card;
}

function updateSessionCard(sessionDiv) {
    const id = [...document.querySelectorAll("#sessions-container > div")].indexOf(sessionDiv) + 1;
    const card = document.querySelector(`.session-card[data-session-id="${id}"]`);

    if (!card) return;

    const nameInput = sessionDiv.querySelector(".plan-session-accordion input[type='text']");
    const exercises = sessionDiv.querySelectorAll(".session-excercise");

    // actualizar título de la sesion
    card.querySelector(".session-card-title").textContent = `Sesión ${id}`;
    card.querySelector(".session-card-name").textContent = nameInput.value || "Nombre de la sesión";

    // actualizar lista de ejercicios
    const detail = card.querySelector(".session-card-detail");
    detail.innerHTML = "";

    exercises.forEach(ex => {
        const selectedOption = ex.querySelector('.combobox #selected-option');
        const title = selectedOption.textContent;
        const series = ex.querySelectorAll("input")[0].value;
        const reps = ex.querySelectorAll("input")[1].value;
        const peso = ex.querySelectorAll("input")[2].value;

        detail.innerHTML += `
                    <div class="flex items-center justify-between text-xs py-1">
                        <span class="flex items-center gap-2">
                            <span class="session-card-detail-excercise"></span>${title}
                        </span>
                        <span>${series}×${reps}${peso ? " @ " + peso + "kg" : ""}</span>
                    </div>`;
    });
}

// Cerrar todos los accordion menos el que se abre
function closeAllExcept(id) {
    document.querySelectorAll(".plan-session-accordion").forEach((el, index) => {
        if (index !== id) {
            el.style.maxHeight = "0";
        }
    });
}

function updateAccordionHeight(content) {
    content.style.maxHeight = content.scrollHeight + "px";
}

function renumberSessions() {
    const sessions = document.querySelectorAll("#sessions-container > div");
    const cards = document.querySelectorAll("#session-cards-container > .session-card");

    sessions.forEach((session, index) => {
        const num = index + 1;

        // Actualizar badge
        const badge = session.querySelector(".plan-session-header .plan-session-pill");
        badge.textContent = `Sesión ${num}`;

        // Orden
        const orderInput = session.querySelector(".session-order");
        if (orderInput) orderInput.value = num;

        // Actualizar tarjeta            
        const card = session.sessionCard;
        card.dataset.sessionId = num;
        card.querySelector(".session-card-title").textContent = `Sesión ${num}`;
        updateSessionCard(session);
    });

    sessionCount = sessions.length;
}

// Crear sesión
function createSession() {
    sessionCount++;

    const planSessionPreviewAmount = document.querySelector("#plan-session-preview-amount");
    planSessionPreviewAmount.textContent = `${sessionCount}`;

    const sessionId = sessionCount - 1;
    const container = document.getElementById("sessions-container");

    const div = document.createElement("div");
    div.className = "plan-session";

    div.innerHTML = planSessionHtml(sessionCount);
    container.appendChild(div);

    const card = createSessionCard(sessionCount);
    div.sessionCard = card;

    const nameInput = div.querySelector(".plan-session-accordion input[type='text']");
    nameInput.addEventListener("input", () => updateSessionCard(div));

    // actualizar el nombre de la sesion
    const planSessionName = div.querySelector('.plan-session-name');
    nameInput.addEventListener('input', (e) => { planSessionName.textContent = e.target.value.trim() || 'Nombre de la sesión'; });

    const header = div.querySelector(".plan-session-header");
    const content = div.querySelector(".plan-session-accordion");
    const exerciseContainer = div.querySelector(".session-excercises");
    const counterText = header.querySelector("span:first-child");

    // Toggle abrir/cerrar
    header.addEventListener("click", () => {
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0";
            header.querySelector('.plan-session-header-icon').classList.toggle('rotate-180');

        } else {
            closeAllExcept(sessionId);
            updateAccordionHeight(content);
            header.querySelector('.plan-session-header-icon').classList.toggle('rotate-180');
        }
    });

    // Agregar ejercicio
    div.querySelector(".add-exercise-btn").onclick = () => {
        excerciseCount++;

        const card = document.createElement("div");
        card.className = "session-excercise m-4 gap-4";
        card.innerHTML = sessionExcerciseHtml(excerciseCount);

        exerciseContainer.appendChild(card);
        updateAccordionHeight(content);

        comboBoxRender('session-excercise-name-' + excerciseCount, excerciseArray);

        // restringir los inputs numericos
        restrictToDigits('#session-excercise-steps-' + excerciseCount, 2);
        restrictToDigits('#session-excercise-reps-' + excerciseCount, 2);
        restrictToDigits('#session-excercise-weight-' + excerciseCount, 3);

        // actualizar los datos del ejercicio en la vista previa
        exerciseContainer.querySelectorAll('.combobox').forEach(combo => {
            combo.addEventListener('combo:change', (e) => updateSessionCard(div));
        });

        const stepsInput = card.querySelector(".session-excercise-steps");
        stepsInput.addEventListener("input", () => updateSessionCard(div));

        const repsInput = card.querySelector(".session-excercise-reps");
        repsInput.addEventListener("input", () => updateSessionCard(div));

        const weightInput = card.querySelector(".session-excercise-weight");
        weightInput.addEventListener("input", () => updateSessionCard(div));

        // actualizar contador
        counterText.textContent = `${exerciseContainer.children.length} ejercicios`;

        // eliminar ejercicio
        card.querySelector(".delete-excercise").onclick = () => {
            // actualizar ejercicios totales en el preview
            excerciseTotalCount = excerciseTotalCount - 1;
            const excerciseTotal = document.querySelector('#plan-excercise-preview-amount');
            excerciseTotal.textContent = excerciseTotalCount;

            card.remove();
            counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
            updateAccordionHeight(content);

            updateSessionCard(div);
        };

        // actualizar ejercicios totales en el preview
        excerciseTotalCount = excerciseTotalCount + 1;
        const excerciseTotal = document.querySelector('#plan-excercise-preview-amount');
        excerciseTotal.textContent = excerciseTotalCount;

        updateSessionCard(div);
    };

    // Eliminar sesión completa
    div.querySelector(".delete-session-btn").onclick = () => {
        // actualizar ejercicios totales en el preview
        excerciseTotalCount = excerciseTotalCount - exerciseContainer.children.length;
        const excerciseTotal = document.querySelector('#plan-excercise-preview-amount');
        excerciseTotal.textContent = excerciseTotalCount;

        div.remove();
        renumberSessions();   //actualizar numeración después de borrar
        div.sessionCard.remove();

        const planSessionPreviewAmount = document.querySelector("#plan-session-preview-amount");
        planSessionPreviewAmount.textContent = `${sessionCount}`;
    };
}

function addListener() {
    const planPreviewName = document.querySelector("#plan-preview-name");
    const planName = document.querySelector('#plan-name');
    planName.addEventListener('input', (e) => { planPreviewName.textContent = e.target.value.trim() || 'Nombre del Plan'; });

    const planPreviewDescription = document.querySelector("#plan-preview-description");
    const planDescription = document.querySelector('#plan-description');
    planDescription.addEventListener('input', (e) => { planPreviewDescription.textContent = e.target.value.trim() || 'Describe el objetivo y características del plan...'; });

    const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    switchContainer.addEventListener("switch:change", (e) => {
        const planType = document.getElementById('plan-preview-type');
        if (e.detail.isOn) {
            planType.classList.remove('opacity-0', 'invisible');
            planType.classList.add('opacity-100', 'visible');
        } else {
            planType.classList.remove('opacity-100', 'visible');
            planType.classList.add('opacity-0', 'invisible');
        }
    });

    const planCreateCancel = document.getElementById('plan-new-cancel');
    planCreateCancel.addEventListener('click', () => {
        sessionCount = 0;
        excerciseCount = 0;
        excerciseTotalCount = 0;
        plansRender();
    });
}

/** render */
export function planCreateRender() {
    const containerMain = document.getElementById("container-main");
    // transicion suave
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(() => {
        containerMain.innerHTML = planCreateHtml();

        comboBoxRender('plan-template-combobox', plansTemplate);
        switchRender('plan-new-template-switch', 'Guardar como plantilla');
        addListener();
        document.getElementById("session-add-btn").onclick = createSession;

        // Aplicar clases de entrada
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duración igual a la transición
}