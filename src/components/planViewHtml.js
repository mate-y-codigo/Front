function exerciseGetNumber(plan) {

    let counter = 0;
    plan.sesionesEntrenamiento.forEach(sesion => {
        counter += sesion.sesionesEjercicio.length;
    });
    return counter;
}

function convertDate(isoDate) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // "11/11/2025"
}

function planViewCardHtml(excercise, index) {
    return `
        <div class="plan-view-excercise-detail">
            <div class="flex flex-col">
                <div class="plan-view-excercise-detail-header p-2 pl-4 pr-4">
                    <div class="flex flex-row justify-between items-center gap-2">
                        <div class="plan-view-excercise-detail-name">${excercise.nombreEjercicio}</div>
                        <div class="index flex justify-center items-center">Orden: ${index + 1}</div>
                    </div>
                </div>
                <div class="plan-view-excercise-detail-body p-2 pl-4 pr-4">
                    <div class="flex flex-row justify-between items-center pt-2">
                        <div class="plan-view-excercise-detail-set">Series:</div>
                        <div class="plan-view-excercise-detail-number">${excercise.seriesObjetivo}</div>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <div class="plan-view-excercise-detail-rep">Repeticiones:</div>
                        <div class="plan-view-excercise-detail-number">${excercise.repeticionesObjetivo}</div>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <div class="plan-view-excercise-detail-weight">Peso:</div>
                        <div class="plan-view-excercise-detail-number">${excercise.pesoObjetivo}Kg</div>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <div class="plan-view-excercise-detail-rest">Descanso:</div>
                        <div class="plan-view-excercise-detail-number">${excercise.descanso}min</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function planViewSessionHtml(session) {
    return `
        <div class="plan-view-session-detail pb-6">
            <h3 class="text-lg font-semibold flex items-center gap-2 mb-6">
                <span class="material-symbols-outlined">list_alt</span>
                Sesión ${session.orden}: ${session.nombre}
            </h3>
            <div id="plan-view-sessions-cards" class="grid grid-cols-4 gap-4">
                ${session.sesionesEjercicio.map((excercise, index) => planViewCardHtml(excercise, index)).join('')} 
            </div>
        </div>
    `;
}

export function planViewHtml(plan, planIsInUse) {
    return `
        <div class="plan-new-header flex gap-4 items-center pl-20 pr-20">
            <div class="w-64 flex-auto">
                <div class="flex flex-col flex-auto w-full">
                    <div><h1>Detalles de un Plan de Entrenamiento</h1></div>
                </div>
            </div>
            <div class="flex flex-row gap-4">
                <div class="flex flex-row gap-4 items-center">
                    <button class="button" id="btn-back-plan"><span class="material-symbols-outlined">keyboard_arrow_left</span>Atras</button>
                </div>
                ${(!planIsInUse ? `<div class="flex flex-row gap-4 items-center">
                    <button class="button" id="btn-edit-plan"><span class="material-symbols-outlined">edit_note</span>Editar Plan</button>
                    <button class="button-cancel" id="btn-delete-plan"><span class="material-symbols-outlined">delete</span>Borrar Plan</button>
                </div>` : ``)}                
            </div>
        </div>
        <div id="plan-view-detail" class="plan-view-detail pl-20 pr-20 pt-6 pb-6" data-state="close">
            <div class="space-y-6">
                <div class="space-y-2">
                    <div class="flex items-start items-center justify-between">
                        <h2 class="plan-view-detail-name">${(plan.nombre.length > 80 ? plan.nombre.slice(0, 80) + "..." : plan.nombre)}</h2>
                        <div class="plan-view-detail-type">${(plan.esPlantilla === true ? 'Plantilla' : 'Personalizado')}</div>
                    </div>
                </div>
                <div class="description">
                    <h3>Descripción</h3>
                    <p>${plan.descripcion}</p>
                </div>
                <div class="grid grid-cols-3 gap-12">
                    <div class="summary-session">
                        <div class="p-4 text-center">
                        <div class="summary-session-number">${plan.sesionesEntrenamiento.length}</div>
                        <div class="summary-session-txt text-sm text-muted-foreground">Sesiones</div>
                        </div>
                    </div>
                <div class="summary-exercise">
                    <div class="p-4 text-center">
                        <div class="summary-exercise-number">${exerciseGetNumber(plan)}</div>
                        <div class="summary-exercise-txt text-sm text-muted-foreground">Ejercicios</div>
                    </div>
                </div>
                <div class="summary-update">
                    <div class="p-4 text-center">
                        <div class="summary-update-number">${convertDate(plan.fechaActualizacion)}</div>
                        <div class="summary-update-txt text-sm text-muted-foreground">Última Modificación</div>
                    </div>
                </div>
            </div>
            <div id="plan-view-sessions-details">
                ${plan.sesionesEntrenamiento.map((session) => planViewSessionHtml(session)).join('')} 
            </div>
        </div>
    </div>
    `;
}