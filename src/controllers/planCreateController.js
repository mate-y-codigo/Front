import { getExcerciseActiveAll, getPlanTemplateAll, getPlanTemplateById, setPlanNew } from '../services/planApi.js'
import { switchSetState } from '../views/switch.js';
import { plansRender } from '../views/plans.js'
import { restrictToDigits } from '../utils/inputCtrl.js';
import { planPreviewHtml, planSessionHtml, sessionExcerciseHtml, previewSessionCardHtml } from '../components/planCreateHtml.js';
import { comboBoxRender, comboBoxUpdateOptions, comboBoxReset } from '../views/comboBox.js';
import { authHelper } from '../helpers/authHelper.js'
import { AppModal } from '../views/modalNotice.js'
import { showToast } from '../views/toast.js'

/* --- datos de prueba (tu JSON) --- */
const testTemplateJson = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "nombre": "Hipertrofia Inicial",
    "descripcion": "Programa enfocado en ganancia de masa muscular para principiantes",
    "esPlantilla": true,
    "idEntrenador": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fechaCreacion": "2025-11-11T17:47:47.553Z",
    "fechaActualizacion": "2025-11-11T17:47:47.553Z",
    "activo": true,
    "sesionesEntrenamiento": [
        {
            "id": "s1",
            "nombre": "Calentamiento",
            "orden": 1,
            "sesionesEjercicio": [
                { "id": "e1", "idEjercicio": "ej1", "nombreEjercicio": "Abdominales 1", "seriesObjetivo": 5, "repeticionesObjetivo": 10, "pesoObjetivo": 0 },
                { "id": "e2", "idEjercicio": "ej2", "nombreEjercicio": "Abdominales 2", "seriesObjetivo": 5, "repeticionesObjetivo": 10, "pesoObjetivo": 0 },
                { "id": "e3", "idEjercicio": "ej3", "nombreEjercicio": "Abdominales 3", "seriesObjetivo": 5, "repeticionesObjetivo": 10, "pesoObjetivo": 0 }
            ]
        },
        {
            "id": "s2",
            "nombre": "Fuerza",
            "orden": 2,
            "sesionesEjercicio": [
                { "id": "e4", "idEjercicio": "ej4", "nombreEjercicio": "Press en Banco", "seriesObjetivo": 3, "repeticionesObjetivo": 12, "pesoObjetivo": 50 }
            ]
        },
        {
            "id": "s3",
            "nombre": "Fuerza",
            "orden": 3,
            "sesionesEjercicio": [
                { "id": "e5", "idEjercicio": "ej5", "nombreEjercicio": "Sentadilla", "seriesObjetivo": 5, "repeticionesObjetivo": 10, "pesoObjetivo": 70 }
            ]
        },
        {
            "id": "s4",
            "nombre": "Fuerza",
            "orden": 4,
            "sesionesEjercicio": [
                { "id": "e6", "idEjercicio": "ej6", "nombreEjercicio": "Sentadilla", "seriesObjetivo": 5, "repeticionesObjetivo": 10, "pesoObjetivo": 70 }
            ]
        }
    ]
};

/* --- estado global (controlado por el módulo) --- */
let sessionCount = 0;
let excerciseCount = 0;
let excerciseTotalCount = 0;

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Render exercise programmatically (used by load)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
async function renderExercise(sessionDiv, ex) {
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    excerciseCount++;
    const exCard = document.createElement("div");
    exCard.className = "session-excercise m-4 gap-4";
    exCard.innerHTML = sessionExcerciseHtml(excerciseCount);

    exerciseContainer.appendChild(exCard);

    // combobox
    const comboContainerId = `session-excercise-name-${excerciseCount}`;

    const listExcercises = await getListExcerciseActive();
    if (listExcercises.length) {
        comboBoxRender(comboContainerId, listExcercises);
    }
    else {
        comboBoxRender(comboContainerId, [{ id: 0, name: "No hay ejerccios definidos" }]);
    }

    // set combobox selected text
    const selected = exCard.querySelector('.combobox #selected-option');
    if (selected) selected.textContent = ex.nombreEjercicio || excerciseArray[0];

    if (ex.idEjercicio === null) {
        // dispatch change so preview listeners pick it up
        exCard.querySelector('.combobox').dispatchEvent(new CustomEvent('combo:change', { detail: { value: selected ? selected.textContent : '' } }));
    }
    else {
        const comboEl = exCard.querySelector('.combobox');
        if (comboEl) comboEl.dataset.selectedId = ex.idEjercicio || ex.id || null;
        if (comboEl) comboEl.dataset.selectedName = ex.nombreEjercicio || null;
    }

    // set inputs
    const steps = exCard.querySelector(".session-excercise-steps");
    const reps = exCard.querySelector(".session-excercise-reps");
    const weight = exCard.querySelector(".session-excercise-weight");
    const rest = exCard.querySelector(".session-excercise-rest");
    if (steps) { steps.value = ex.seriesObjetivo ?? steps.value; steps.dispatchEvent(new Event('input')); }
    if (reps) { reps.value = ex.repeticionesObjetivo ?? reps.value; reps.dispatchEvent(new Event('input')); }
    if (weight) { weight.value = ex.pesoObjetivo ?? weight.value; weight.dispatchEvent(new Event('input')); }
    if (rest) { rest.value = ex.descanso ?? weight.value; weight.dispatchEvent(new Event('input')); }

    // listeners
    exCard.querySelectorAll('.combobox').forEach(combo => combo.addEventListener('combo:change', () => updateSessionCard(sessionDiv)));
    exCard.querySelectorAll('input').forEach(i => i.addEventListener('input', () => updateSessionCard(sessionDiv)));

    // delete button
    const delBtn = exCard.querySelector('.delete-excercise');
    if (delBtn) {
        delBtn.onclick = () => {
            excerciseTotalCount = Math.max(0, excerciseTotalCount - 1);
            document.getElementById('plan-excercise-preview-amount').textContent = excerciseTotalCount;
            exCard.remove();
            updateSessionCard(sessionDiv);
        };
    }

    // update counter excercise
    updateExerciseCounter(sessionDiv);

    excerciseTotalCount++;
    document.getElementById('plan-excercise-preview-amount').textContent = excerciseTotalCount;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Render a full session from JSON (uses createSession to keep bindings)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function renderSession(sessionData) {
    // create base session via standard flow
    createSession();
    const sessionDiv = document.querySelector('#plan-sessions-container > .plan-session:last-child');

    // fill name and order
    const nameInput = sessionDiv.querySelector(".plan-session-name-input");
    if (nameInput) {
        nameInput.value = sessionData.nombre || '';
        nameInput.dispatchEvent(new Event('input'));
    }
    const orderInput = sessionDiv.querySelector('.session-order');
    if (orderInput && sessionData.orden) orderInput.value = sessionData.orden;

    // add exercises
    (sessionData.sesionesEjercicio || []).forEach(ex => renderExercise(sessionDiv, ex));

    // update preview card
    updateSessionCard(sessionDiv);

    // open the accordion for visibility and set height
    const content = sessionDiv.querySelector('.plan-session-accordion');
    if (content) {
        //updateAccordionHeight(content);
        // the container is given time to calculate the accordion's height.
        setTimeout(() => { updateAccordionHeight(content); }, 100);
        const hdr = sessionDiv.querySelector('.plan-session-header');
        if (hdr) hdr.classList.add('active');
    }
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   get list template plan
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export async function getListTemplate() {
    const templates = await getPlanTemplateAll();
    const result = [];

    if (templates === null)
        return false;

    templates.forEach(template => {
        result.push({ id: template.id, name: template.nombre });
    });

    return result;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   get list all excercise
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export async function getListExcerciseActive() {
    const excercises = await getExcerciseActiveAll();
    const result = [];

    if (excercises === null)
        return false;

    excercises.forEach(excercise => {
        result.push({ id: excercise.id, name: excercise.nombre });
    });

    return result;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   reset plan form
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function resetPlanForm() {
    // Clear main fields of the plan
    const nombrePlan = document.getElementById("plan-name");
    const descripcionPlan = document.getElementById("plan-description");

    if (nombrePlan) nombrePlan.value = "";
    if (descripcionPlan) descripcionPlan.value = "";

    // Reset switch isTemplate
    const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    if (switchContainer) {
        switchContainer.dataset.isOn = "false";
        switchContainer.classList.remove("switch-on");
        switchContainer.classList.add("switch-off");
    }

    // Delete all created sessions
    const sessionsContainer = document.getElementById("plan-sessions-container");
    if (sessionsContainer) {
        sessionsContainer.innerHTML = ""; // clears all sessions
    }

    // Reset global counters
    sessionCount = 0;
    excerciseCount = 0;
    excerciseTotalCount = 0;

    /*if (window.sessionCount !== undefined) {
        window.sessionCount = 0;
    }
    if (window.excerciseTotalCount !== undefined) {
        window.excerciseTotalCount = 0;
    }*/

    // Clear plan preview
    const preview = document.querySelector("#plan-preview-container");
    if (preview) preview.innerHTML = planPreviewHtml();
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   build json from de plan
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function buildPlanJson() {
    // === General plan details ===
    const nombre = document.getElementById("plan-name").value.trim();
    const descripcion = document.getElementById("plan-description").value.trim();

    // Switch isTemplate (your switch issues switch:change and modifies dataset)
    const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    const esPlantilla = switchContainer?.dataset?.isOn === "true";

    // ID entrenador
    const token = authHelper.getAccessToken();
    const info = authHelper.parseTokens(token);
    const idEntrenador = info.sub;

    // === SESIONES ===
    const sesionesDOM = document.querySelectorAll(".plan-session-accordion");

    const sesionesEntrenamiento = [...sesionesDOM].map((sessionEl, sessionIndex) => {

        // Nombre de la sesión
        const nombreSesion = sessionEl.querySelector(".plan-session-name-input").value.trim();

        // EJERCICIOS dentro de la sesión
        const exerciseRows = sessionEl.querySelectorAll(".session-excercise-row");

        const sesionesEjercicio = [...exerciseRows].map((rowEl, exIndex) => {

            // Localizar combobox dentro del contenedor dinámico
            const nameContainer = rowEl.querySelector("[id^='session-excercise-name']");
            const combo = nameContainer?.querySelector(".combobox");
            const selectedId = combo?.dataset?.selectedId || null;
            const selectedName = combo?.dataset?.selectedName || null;

            // Inputs
            const steps = parseInt(rowEl.querySelector(".session-excercise-steps")?.value || "0");
            const reps = parseInt(rowEl.querySelector(".session-excercise-reps")?.value || "0");
            const weight = parseFloat(rowEl.querySelector(".session-excercise-weight")?.value || "0");
            const rest = parseInt(rowEl.querySelector(".session-excercise-rest")?.value || "0");

            return {
                id: selectedId,
                seriesObjetivo: steps,
                repeticionesObjetivo: reps,
                pesoObjetivo: weight,
                descanso: rest,
                orden: exIndex + 1
            };
        });

        return {
            nombre: nombreSesion,
            orden: sessionIndex + 1,
            sesionesEjercicio
        };
    });

    // JSON FINAL COMPLETO
    return {
        nombre,
        descripcion,
        esPlantilla,
        idEntrenador,
        sesionesEntrenamiento
    };
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Utils: accordion helpers
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function closeAllExcept(currentId) {
    document.querySelectorAll(".plan-session-accordion").forEach((acc) => {
        if (acc.dataset.sessionId !== currentId) {
            acc.style.maxHeight = "0";
            const hdr = document.querySelector(`.plan-session-header[data-session-id="${acc.dataset.sessionId}"]`);
            if (hdr) hdr.classList.remove("active");
        }
    });
}

export function updateAccordionHeight(content) {
    // measure and set max-height for smooth transition
    content.style.maxHeight = content.scrollHeight + "px";
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   create a preview card (right side)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function createSessionCard(id) {
    const card = document.createElement("div");
    card.className = "session-card";
    card.dataset.sessionId = `session-${id}`;
    card.innerHTML = previewSessionCardHtml(id);
    document.getElementById("session-cards-container").appendChild(card);
    return card;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   update preview of a session
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function updateSessionCard(sessionDiv) {
    // sessionDiv is the .plan-session element
    if (!sessionDiv) return;
    // find its position among sessions to compute a number
    const sessions = Array.from(document.querySelectorAll("#plan-sessions-container > .plan-session"));
    const index = sessions.indexOf(sessionDiv);
    const numericId = index + 1;
    const card = document.querySelector(`.session-card[data-session-id="session-${numericId}"]`);
    if (!card) return;

    const nameInput = sessionDiv.querySelector(".plan-session-accordion .plan-session-name-input");
    const exercises = sessionDiv.querySelectorAll(".session-excercises > div");

    // Update session title
    card.querySelector(".session-card-title").textContent = `Sesión ${numericId}`;
    card.querySelector(".session-card-name").textContent = (nameInput && nameInput.value) ? (nameInput.value.length > 34 ? nameInput.value.slice(0, 34) + "..." : nameInput.value) : "Nombre de la sesión"
    //(nameInput && nameInput.value) ? nameInput.value : "Nombre de la sesión";

    // update exercise list
    const detail = card.querySelector(".session-card-detail");
    detail.innerHTML = "";

    exercises.forEach(ex => {
        const comboSelected = ex.querySelector('.combobox #selected-option');
        const title = comboSelected ? comboSelected.textContent : 'Ejercicio';
        const series = ex.querySelector(".session-excercise-steps")?.value || '';
        const reps = ex.querySelector(".session-excercise-reps")?.value || '';
        const weight = ex.querySelector(".session-excercise-weight")?.value || '';
        const rest = ex.querySelector(".session-excercise-rest")?.value || '';

        detail.innerHTML += `
            <div class="flex items-center justify-between text-xs py-1">
                <span class="flex items-center gap-2">
                <span class="session-card-detail-excercise"></span>${title}
                </span>
                <span>${series}×${reps}${weight ? " @ " + weight + "kg" : ""} (${rest}min)</span>
            </div>`;
    });
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   update number excercises by session
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function updateExerciseCounter(sessionDiv) {
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    const counterText = sessionDiv.querySelector(".plan-session-excercise-number");

    counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   renumber sessions after remove
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function renumberSessions() {
    const sessions = Array.from(document.querySelectorAll("#plan-sessions-container > .plan-session"));
    const cards = Array.from(document.querySelectorAll("#session-cards-container > .session-card"));

    sessions.forEach((session, index) => {
        const num = index + 1;
        // update badge
        const badge = session.querySelector(".plan-session-pill");
        if (badge) badge.textContent = `Sesión ${num}`;

        // order input
        const orderInput = session.querySelector(".session-order");
        if (orderInput) orderInput.value = num;

        // update linked card dataset and title
        const card = cards[index];
        if (card) {
            session.sessionCard = card;
            card.dataset.sessionId = `session-${num}`;
            card.querySelector(".session-card-title").textContent = `Sesión ${num}`;
        }
    });

    sessionCount = sessions.length;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Create session (clean + binding)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function createSession() {
    sessionCount++;

    const planSessionPreviewAmount = document.querySelector("#plan-session-preview-amount");
    if (planSessionPreviewAmount) planSessionPreviewAmount.textContent = `${sessionCount}`;

    const container = document.getElementById("plan-sessions-container");
    if (!container) return;

    // insert session HTML
    container.insertAdjacentHTML("beforeend", planSessionHtml(sessionCount));
    const sessionDiv = container.lastElementChild; // the newly added .plan-session
    const sid = sessionDiv.dataset.sessionId; // e.g. session-1

    // create preview card and link it
    const card = createSessionCard(sessionCount);
    sessionDiv.sessionCard = card;

    // elements
    const header = sessionDiv.querySelector(".plan-session-header");
    const content = sessionDiv.querySelector(".plan-session-accordion");
    const nameInput = sessionDiv.querySelector(".plan-session-name-input");
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    const addExerciseBtn = sessionDiv.querySelector(".add-exercise-btn");
    const counterText = sessionDiv.querySelector(".plan-session-excercise-number");

    // ensure initial values
    counterText.textContent = `${exerciseContainer.children.length} ejercicios`;

    // name input -> update preview + header text
    if (nameInput) {
        nameInput.addEventListener("input", (e) => {
            const title = e.target.value.trim() || 'Nombre de la sesión';
            sessionDiv.querySelector(".plan-session-name").textContent = title;
            updateSessionCard(sessionDiv);
        });
    }

    // header accordion toggle
    if (header && content) {
        header.addEventListener("click", () => {
            const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
            if (isOpen) {
                content.style.maxHeight = "0";
                header.classList.remove("active");
            } else {
                closeAllExcept(content.dataset.sessionId);
                updateAccordionHeight(content);
                header.classList.add("active");
            }
        });
    }

    // add exercise handler
    if (addExerciseBtn) {
        addExerciseBtn.onclick = async () => {
            excerciseCount++;
            const exCard = document.createElement("div");
            exCard.className = "session-excercise m-4 gap-4";
            exCard.innerHTML = sessionExcerciseHtml(excerciseCount);

            exerciseContainer.appendChild(exCard);
            // the container is given time to calculate the accordion's height.
            setTimeout(() => { updateAccordionHeight(content); }, 100);

            // render combobox inside new exCard
            const comboContainerId = `session-excercise-name-${excerciseCount}`;

            // create wrapper node if needed
            const listExcercises = await getListExcerciseActive();
            if (listExcercises.length) {
                comboBoxRender(comboContainerId, listExcercises);
            }
            else {
                comboBoxRender(comboContainerId, [{ id: 0, name: "No hay ejerccios definidos" }]);
            }

            // apply input restrictions
            restrictToDigits(`#session-excercise-steps-${excerciseCount}`, 2);
            restrictToDigits(`#session-excercise-reps-${excerciseCount}`, 2);
            restrictToDigits(`#session-excercise-weight-${excerciseCount}`, 3);
            restrictToDigits(`#session-excercise-rest-${excerciseCount}`, 2);

            // listen combobox changes inside this exercise
            exCard.querySelectorAll('.combobox').forEach(combo => {
                combo.addEventListener('combo:change', () => updateSessionCard(sessionDiv));
            });

            // inputs update preview
            exCard.querySelectorAll('input').forEach(i => {
                i.addEventListener('input', () => updateSessionCard(sessionDiv));
            });

            // delete exercise
            const delBtn = exCard.querySelector('.delete-excercise');
            if (delBtn) {
                delBtn.onclick = () => {
                    // update global counters
                    excerciseTotalCount = Math.max(0, excerciseTotalCount - 1);
                    document.getElementById('plan-excercise-preview-amount').textContent = excerciseTotalCount;

                    exCard.remove();
                    counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
                    updateAccordionHeight(content);
                    updateSessionCard(sessionDiv);
                };
            }

            // update counters
            excerciseTotalCount++;
            document.getElementById('plan-excercise-preview-amount').textContent = excerciseTotalCount;
            counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
            updateSessionCard(sessionDiv);
        };
    }

    // delete whole session
    const deleteSessionBtn = sessionDiv.querySelector(".delete-session-btn");
    if (deleteSessionBtn) {
        deleteSessionBtn.onclick = () => {
            // update global counters
            excerciseTotalCount = Math.max(0, excerciseTotalCount - exerciseContainer.children.length);
            document.getElementById('plan-excercise-preview-amount').textContent = excerciseTotalCount;

            // remove card and session
            if (sessionDiv.sessionCard) sessionDiv.sessionCard.remove();
            sessionDiv.remove();

            // renumber remaining
            renumberSessions();
            document.getElementById("plan-session-preview-amount").textContent = `${sessionCount}`;
        };
    }
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Load whole plan from Template
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function loadPlanFromTamplate(plan) {
    // basic fields
    const planNameEl = document.getElementById("plan-name");
    const planPreviewName = document.getElementById("plan-preview-name");
    const planDescEl = document.getElementById("plan-description");
    const planPreviewDesc = document.getElementById("plan-preview-description");

    if (planNameEl) planNameEl.value = plan.nombre || '';
    if (planPreviewName) planPreviewName.textContent = plan.nombre || '';
    if (planDescEl) planDescEl.value = plan.descripcion || '';
    if (planPreviewDesc) planPreviewDesc.textContent = plan.descripcion || '';

    // switch
    //const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    //if (switchContainer) switchContainer.dispatchEvent(new CustomEvent("switch:change", { detail: { isOn: !!plan.esPlantilla } }));

    const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    if (switchContainer) { switchSetState(switchContainer, !!plan.esPlantilla); }

    // reset containers and counters
    sessionCount = 0;
    excerciseCount = 0;
    excerciseTotalCount = 0;

    const sessionContainer = document.getElementById("plan-sessions-container");
    const cardsContainer = document.getElementById("session-cards-container");
    if (sessionContainer) sessionContainer.innerHTML = '';
    if (cardsContainer) cardsContainer.innerHTML = '';

    // create sessions
    (plan.sesionesEntrenamiento || []).forEach(ses => renderSession(ses));

    // update totals preview
    document.getElementById("plan-session-preview-amount").textContent = (plan.sesionesEntrenamiento || []).length;
    document.getElementById("plan-excercise-preview-amount").textContent = excerciseTotalCount;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Add global listeners (name/desc/switch/cancel)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function addPlanListener() {
    const planPreviewName = document.querySelector("#plan-preview-name");
    const planName = document.querySelector('#plan-name');
    if (planName) planName.addEventListener('input', (e) => { if (planPreviewName) planPreviewName.textContent = e.target.value.trim() || 'Nombre del Plan'; });

    const planPreviewDescription = document.querySelector("#plan-preview-description");
    const planDescription = document.querySelector('#plan-description');
    if (planDescription) planDescription.addEventListener('input', (e) => { if (planPreviewDescription) planPreviewDescription.textContent = e.target.value.trim() || 'Describe el objetivo y características del plan...'; });

    const switchContainer = document.querySelector("#plan-new-template-switch .switch");
    if (switchContainer) {
        switchContainer.addEventListener("switch:change", (e) => {
            const planType = document.getElementById('plan-preview-type');
            if (!planType) return;
            if (e.detail.isOn) {
                planType.classList.remove('opacity-0', 'invisible');
                planType.classList.add('opacity-100', 'visible');
            } else {
                planType.classList.remove('opacity-100', 'visible');
                planType.classList.add('opacity-0', 'invisible');
            }
        });
    }

    const containerPlanTemplate = document.getElementById("plan-template-combobox");
    const combo = containerPlanTemplate.querySelector(".combobox");
    combo.addEventListener("combo:change", async () => {
        const template = await getPlanTemplateById(combo.dataset.selectedId);
        loadPlanFromTamplate(template);
    });

    document.getElementById("btn-save-plan").addEventListener("click", async () => {
        const res = validateAndBuildPlanJson();
        if (res.valid) {
            const answer = await setPlanNew(res.payload);
            if (!answer.success) {

                AppModal.open({
                    iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
                    titleText: "Ocurrio un error",
                    messageText: answer.errors
                });

                return;
            }

            // render global widgets
            const listTemplate = await getListTemplate();
            if (listTemplate.length) {
                const combo = document.querySelector("#plan-template-combobox .combobox");
                comboBoxReset(combo);
                comboBoxUpdateOptions(combo, listTemplate);
            }
            else {
                comboBoxRender('plan-template-combobox', [{ id: 0, name: "No hay plantillas definidas" }]);
            }

            /*AppModal.open({
                iconHTML: '<span class="material-symbols-outlined text-green-600 text-5xl">check</span>',
                titleText: "Plan guardado",
                messageText: "El plan se guardo correctamente."
            });*/
            showToast('Plan guardado correctamente');
            resetPlanForm();
        }
    });

    document.getElementById('btn-cancel-plan').addEventListener('click', () => {
        resetPlanForm();
        plansRender();
    });
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Helper visual / util
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function clearFieldError(el) {
    if (!el) return;
    el.classList.remove('input-error');
    const next = el.nextElementSibling;
    if (next && next.classList && next.classList.contains('error-msg')) next.remove();
}

function showFieldError(el, message) {
    if (!el) return;
    clearFieldError(el);
    el.classList.add('input-error');
    const msg = document.createElement('div');
    msg.className = 'error-msg';
    msg.textContent = message;
    el.insertAdjacentElement('afterend', msg);
}

function clearSessionError(sessionDiv) {
    // remove session-level error box
    const existing = sessionDiv.querySelector('.session-error');
    if (existing) existing.remove();

    // remove input errors inside
    sessionDiv.querySelectorAll('.input-error').forEach(clearFieldError);
}

function showSessionError(sessionDiv, message) {
    clearSessionError(sessionDiv);
    const box = document.createElement('div');
    box.className = 'session-error';
    box.textContent = message;
    // insert above accordion content
    const accordion = sessionDiv.querySelector('.plan-session-accordion');
    if (accordion) accordion.insertAdjacentElement('beforebegin', box);
    else sessionDiv.prepend(box);
}

// small number helper
function toNumberOrZero(v) {
    const n = parseFloat(String(v).trim());
    return Number.isFinite(n) ? n : 0;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Validación por sesión
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function validateSession(sessionDiv, sessionIndex) {
    // returns { valid: bool, errors: [] , sessionObj? }
    clearSessionError(sessionDiv);
    const errors = [];

    const nameInput = sessionDiv.querySelector('.plan-session-name-input');
    const sessionName = (nameInput?.value || '').trim();
    if (!sessionName) {
        showFieldError(nameInput, 'El nombre de la sesión es obligatorio.');
        errors.push('Nombre vacío');
    } else {
        clearFieldError(nameInput);
    }

    // ejercicios: tus filas tienen clase .session-excercise-row
    const exerciseRows = Array.from(sessionDiv.querySelectorAll('.session-excercise-row'));
    if (exerciseRows.length === 0) {
        showSessionError(sessionDiv, 'Esta sesión no tiene ejercicios. Agregá al menos uno.');
        errors.push('Sin ejercicios');
    }

    const sesionesEjercicio = [];

    exerciseRows.forEach((rowEl, exIndex) => {
        // combobox dentro del div con id^=session-excercise-name
        const nameContainer = rowEl.querySelector("[id^='session-excercise-name']");
        const combo = nameContainer?.querySelector('.combobox');

        const selectedId = combo?.dataset?.selectedId ?? null;
        const selectedName = combo?.dataset?.selectedName ?? (combo?.querySelector('#selected-option')?.textContent ?? '').trim();

        if (!selectedId) {
            if (nameContainer) {
                // mark visual
                const btn = nameContainer.querySelector('#dropdown-button');
                if (btn) showFieldError(btn, 'Seleccioná un ejercicio (con ID).');
                else showFieldError(nameContainer, 'Seleccioná un ejercicio (con ID).');
            }
            errors.push(`Ejercicio ${exIndex + 1} sin selección`);
        }

        // inputs
        const stepsEl = rowEl.querySelector('.session-excercise-steps');
        const repsEl = rowEl.querySelector('.session-excercise-reps');
        const weightEl = rowEl.querySelector('.session-excercise-weight');
        const restEl = rowEl.querySelector('.session-excercise-rest');

        const steps = toNumberOrZero(stepsEl?.value);
        const reps = toNumberOrZero(repsEl?.value);
        const weight = toNumberOrZero(weightEl?.value);
        const rest = toNumberOrZero(restEl?.value);

        if (steps <= 0) {
            showFieldError(stepsEl, 'Series debe ser mayor que 0.');
            errors.push(`Series inválidas (ej ${exIndex + 1})`);
        } else clearFieldError(stepsEl);

        if (reps <= 0) {
            showFieldError(repsEl, 'Repeticiones debe ser mayor que 0.');
            errors.push(`Reps inválidas (ej ${exIndex + 1})`);
        } else clearFieldError(repsEl);

        // build exercise object (even if invalid, to report)
        sesionesEjercicio.push({
            id: selectedId,
            nombreEjercicio: selectedName,
            seriesObjetivo: steps,
            repeticionesObjetivo: reps,
            pesoObjetivo: weight,
            descanso: rest,
            orden: exIndex + 1
        });
    });

    return {
        valid: errors.length === 0,
        errors,
        sessionObj: {
            nombre: sessionName,
            orden: sessionIndex + 1,
            sesionesEjercicio
        }
    };
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Validación general y build JSON
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function validateAndBuildPlanJson() {
    const result = { valid: false, errors: [], payload: null };

    // limpiar errores previos globales
    document.querySelectorAll('.error-msg').forEach(n => n.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.session-error').forEach(n => n.remove());

    // nombre/descripción
    const nombreEl = document.getElementById('plan-name');
    const descripcionEl = document.getElementById('plan-description');

    const nombre = (nombreEl?.value || '').trim();
    const descripcion = (descripcionEl?.value || '').trim();

    if (!nombre) {
        showFieldError(nombreEl, 'El nombre del plan es obligatorio.');
        result.errors.push('Nombre del plan vacío');
    }

    if (!descripcion) {
        showFieldError(descripcionEl, 'La descripción es obligatoria.');
        result.errors.push('Descripción vacía');
    }

    // ID entrenador
    const token = authHelper.getAccessToken();
    const info = authHelper.parseTokens(token);
    const idEntrenador = info.sub;

    // switch
    const switchContainer = document.querySelector('#plan-new-template-switch .switch');
    const esPlantilla = switchContainer?.dataset?.isOn === 'true';

    // sessions
    const sessionDivs = Array.from(document.querySelectorAll('#plan-sessions-container > .plan-session'));
    if (sessionDivs.length === 0) {
        result.errors.push('El plan debe tener al menos una sesión.');
        // attach general message to container
        const container = document.getElementById('plan-sessions-container');
        if (container) {
            const box = document.createElement('div');
            box.className = 'session-error';
            box.textContent = 'El plan no tiene sesiones. Agregá al menos una sesión.';
            container.insertAdjacentElement('beforebegin', box);
        }
    }

    const sesionesEntrenamiento = [];
    sessionDivs.forEach((sessionDiv, idx) => {
        const content = sessionDiv.querySelector(".plan-session-accordion");
        const v = validateSession(sessionDiv, idx);

        updateAccordionHeight(content);

        if (!v.valid) {
            // append errors to result
            result.errors.push(...v.errors.map(e => `Sesión ${idx + 1}: ${e}`));
        }
        sesionesEntrenamiento.push(v.sessionObj);
    });

    if (result.errors.length > 0) {
        result.valid = false;
        return result;
    }

    // build final payload
    const payload = {
        nombre,
        descripcion,
        esPlantilla: !!esPlantilla,
        idEntrenador: idEntrenador, // lo obtenés de otro lado según vos
        sesionesEntrenamiento
    };

    result.valid = true;
    result.payload = payload;
    return result;
}
