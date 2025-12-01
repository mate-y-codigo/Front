import { planEditSessionHtml, sessionEditExcerciseHtml, previewEditSessionCardHtml } from '../components/PlanEditHtml.js'
import { editPlan } from '../services/planApi.js'
import { plansRender } from '../views/plans.js'
import { restrictToDigits } from '../utils/inputCtrl.js';
import { AppModal } from '../views/modalNotice.js'
import { showToast } from '../views/toast.js'

/* --- estado global (controlado por el módulo) --- */
let sessionCount = 0;
let excerciseCount = 0;
let excerciseTotalCount = 0;

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
   update number excercises by session
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function editUpdateExerciseCounter(sessionDiv) {
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    const counterText = sessionDiv.querySelector(".plan-session-excercise-number");

    counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   update preview of a session
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function editUpdateSessionCard(sessionDiv) {
    // sessionDiv is the .plan-session element
    if (!sessionDiv) return;
    // find its position among sessions to compute a number
    const sessions = Array.from(document.querySelectorAll("#plan-edit-sessions-container > .plan-session"));
    const index = sessions.indexOf(sessionDiv);
    const numericId = index + 1;
    const card = document.querySelector(`.session-card[data-session-id="session-${numericId}"]`);
    if (!card) return;

    const exercises = sessionDiv.querySelectorAll(".session-excercises > div");

    // Update session title
    card.querySelector(".session-card-title").textContent = `Sesión ${numericId}`;
    card.querySelector(".session-card-name").textContent = sessionDiv.querySelector(".plan-session-name").textContent;

    // update exercise list
    const detail = card.querySelector(".session-card-detail");
    detail.innerHTML = "";

    exercises.forEach(ex => {
        const title = (ex.querySelector(`.session-excercise-name`)).textContent;
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
   create a preview card (right side)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function editCreateSessionCard(id) {
    const card = document.createElement("div");
    card.className = "session-card";
    card.dataset.sessionId = `session-${id}`;
    card.innerHTML = previewEditSessionCardHtml(id);
    document.getElementById("edit-session-cards-container").appendChild(card);
    return card;
}


/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Render exercise programmatically (used by load)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
async function editRenderExercise(sessionDiv, ex) {
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    excerciseCount++;
    const exCard = document.createElement("div");
    exCard.className = "session-excercise m-4 gap-4";
    exCard.innerHTML = sessionEditExcerciseHtml(excerciseCount);

    exerciseContainer.appendChild(exCard);

    const excercise = exCard.querySelector(`#edit-session-excercise-name-${excerciseCount}`);
    excercise.dataset.idSessionsExercise = ex.id;
    excercise.dataset.idExcercise = ex.idEjercicio;
    excercise.textContent = ex.nombreEjercicio;

    // set inputs
    const steps = exCard.querySelector(".session-excercise-steps");
    const reps = exCard.querySelector(".session-excercise-reps");
    const weight = exCard.querySelector(".session-excercise-weight");
    const rest = exCard.querySelector(".session-excercise-rest");

    // apply input restrictions
    restrictToDigits(`#edit-session-excercise-steps-${excerciseCount}`, 2);
    restrictToDigits(`#edit-session-excercise-reps-${excerciseCount}`, 2);
    restrictToDigits(`#edit-session-excercise-weight-${excerciseCount}`, 3);
    restrictToDigits(`#edit-session-excercise-rest-${excerciseCount}`, 2);

    if (steps) { steps.value = ex.seriesObjetivo ?? steps.value; steps.dispatchEvent(new Event('input')); }
    if (reps) { reps.value = ex.repeticionesObjetivo ?? reps.value; reps.dispatchEvent(new Event('input')); }
    if (weight) { weight.value = ex.pesoObjetivo ?? weight.value; weight.dispatchEvent(new Event('input')); }
    if (rest) { rest.value = ex.descanso ?? weight.value; weight.dispatchEvent(new Event('input')); }

    // listeners
    exCard.querySelectorAll('input').forEach(i => i.addEventListener('input', () => editUpdateSessionCard(sessionDiv)));

    // update counter excercise
    editUpdateExerciseCounter(sessionDiv);

    excerciseTotalCount++;
    document.getElementById('plan-edit-excercise-preview-amount').textContent = excerciseTotalCount;
}


/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Create session (clean + binding)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function editCreateSession() {
    sessionCount++;

    const planSessionPreviewAmount = document.querySelector("#plan-edit-session-preview-amount");
    if (planSessionPreviewAmount) planSessionPreviewAmount.textContent = `${sessionCount}`;

    const container = document.getElementById("plan-edit-sessions-container");
    if (!container) return;

    // insert session HTML
    container.insertAdjacentHTML("beforeend", planEditSessionHtml(sessionCount));
    const sessionDiv = container.lastElementChild; // the newly added .plan-session
    const sid = sessionDiv.dataset.sessionId; // e.g. session-1

    // create preview card and link it
    const card = editCreateSessionCard(sessionCount);
    sessionDiv.sessionCard = card;

    // elements
    const header = sessionDiv.querySelector(".plan-session-header");
    const content = sessionDiv.querySelector(".plan-session-accordion");
    const nameInput = sessionDiv.querySelector(".plan-session-name-input");
    const exerciseContainer = sessionDiv.querySelector(".session-excercises");
    const counterText = sessionDiv.querySelector(".plan-session-excercise-number");

    // ensure initial values
    counterText.textContent = `${exerciseContainer.children.length} ejercicios`;
    //sessionDiv.querySelector(`plan-edit-session-name-${sessionCount}`).textContent = title;

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
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Render a full session from JSON (uses createSession to keep bindings)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function editRenderSession(sessionData) {
    // create base session via standard flow
    editCreateSession();
    const sessionDiv = document.querySelector('#plan-edit-sessions-container > .plan-session:last-child');

    // save id
    const headerSession = sessionDiv.querySelector('.plan-session-header');
    headerSession.dataset.idTrainingSession = sessionData.id;

    // fill name and order
    const nameSession = sessionDiv.querySelector(".plan-session-name");


    if (nameSession) {
        nameSession.textContent = sessionData.nombre || '';
    }

    // add exercises
    (sessionData.sesionesEjercicio || []).forEach(ex => editRenderExercise(sessionDiv, ex));

    // update preview card
    editUpdateSessionCard(sessionDiv);

    // open the accordion for visibility and set height
    const content = sessionDiv.querySelector('.plan-session-accordion');
    if (content) {
        // the container is given time to calculate the accordion's height.
        setTimeout(() => { updateAccordionHeight(content); }, 100);
        const hdr = sessionDiv.querySelector('.plan-session-header');
        if (hdr) hdr.classList.add('active');
    }
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Load whole plan from Template
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function editPlanLoad(plan) {
    // basic fields
    const planNameEl = document.getElementById("plan-edit-name");
    const planPreviewName = document.getElementById("plan-edit-preview-name");
    const planDescEl = document.getElementById("plan-edit-description");
    const planPreviewDesc = document.getElementById("plan-edit-preview-description");

    if (planNameEl) planNameEl.textContent = plan.nombre || '';
    if (planPreviewName) planPreviewName.textContent = plan.nombre || '';
    if (planDescEl) planDescEl.textContent = plan.descripcion || '';
    if (planPreviewDesc) planPreviewDesc.textContent = plan.descripcion || '';

    // reset containers and counters
    sessionCount = 0;
    excerciseCount = 0;
    excerciseTotalCount = 0;

    const sessionContainer = document.getElementById("plan-edit-sessions-container");
    const cardsContainer = document.getElementById("edit-session-cards-container");
    if (sessionContainer) sessionContainer.innerHTML = '';
    if (cardsContainer) cardsContainer.innerHTML = '';

    // create sessions
    (plan.sesionesEntrenamiento || []).forEach(ses => editRenderSession(ses));

    // update totals preview
    document.getElementById("plan-edit-session-preview-amount").textContent = (plan.sesionesEntrenamiento || []).length;
    document.getElementById("plan-edit-excercise-preview-amount").textContent = excerciseTotalCount;
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
    const ejercicioSesiones = [];

    const exerciseRows = Array.from(sessionDiv.querySelectorAll('.session-excercise-row'));
    exerciseRows.forEach((rowEl, exIndex) => {
        // combobox dentro del div con id^=session-excercise-name
        //const nameContainer = rowEl.querySelector("[id^='session-excercise-name']");
        //const name = nameContainer?.querySelector('.session-excercise-name');

        // excercise id
        const excercise = rowEl?.querySelector('.session-excercise-name');
        const idExcercise = excercise?.dataset?.idExcercise ?? null;
        const idSessionExcercise = excercise?.dataset?.idSessionsExercise;

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
        ejercicioSesiones.push({
            id: idSessionExcercise,
            idEjercicio: idExcercise,
            seriesObjetivo: steps,
            repeticionesObjetivo: reps,
            pesoObjetivo: weight,
            descanso: rest,
            orden: exIndex + 1
        });
    });

    const headerSession = sessionDiv.querySelector('.plan-session-header');

    return {
        valid: errors.length === 0,
        errors,
        sessionObj: {
            idSesionEntrenamiento: headerSession.dataset.idTrainingSession,
            orden: sessionIndex + 1,
            ejercicioSesiones
        }
    };
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Validación general y build JSON
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function validateAndBuildEditPlanJson() {
    const result = { valid: false, errors: [], payload: null };

    // limpiar errores previos globales
    document.querySelectorAll('.error-msg').forEach(n => n.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.session-error').forEach(n => n.remove());

    const sesionesEntrenamiento = [];

    const sessionDivs = Array.from(document.querySelectorAll('#plan-edit-sessions-container > .plan-session'));
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

    const payload = {
        "sesionEntrenamientos": sesionesEntrenamiento        
    }

    result.valid = true;
    result.payload = payload;
    return result;
}

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   Add global listeners (name/desc/switch/cancel)
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export function addPlanListener(plan) {

    document.getElementById("btn-save-edit-plan").addEventListener("click", async () => {
        const res = validateAndBuildEditPlanJson();
        if (res.valid) {

            console.log(res.payload);

            const answer = await editPlan(plan.id, res.payload);
            if (!answer.success) {

                AppModal.open({
                    iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
                    titleText: "Ocurrio un error",
                    messageText: answer.errors
                });

                return;
            }

            showToast('Plan editado correctamente');
            plansRender();
        }
    });

    document.getElementById('btn-cancel-edit-plan').addEventListener('click', () => {
        plansRender();
    });
}
