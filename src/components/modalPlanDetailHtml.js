function exerciseGetNumber(plan) {

    let counter = 0;
    plan.sesionesEntrenamiento.forEach(sesion => {
        counter += sesion.sesionesEjercicio.length;
    });
    return counter;
}

function exerciseGetDetail(exercise){
    return `
        <div class="exercise-detail flex items-center">
            <div class="flex flex-col">
                <div class="flex flex-row items-center">
                    <div class="index flex justify-center items-center">1</div>
                    <div class="name">${exercise.nombreEjercicio}</div>
                </div>
                <div class="flex flex-row items-center pl-8">
                    <div class="flex flex-row items-center">
                        <div class="set">Series:</div>
                        <div class="number">${exercise.seriesObjetivo}</div>
                    </div>
                    <div class="flex flex-row items-center">
                        <div class="repetitions">Repeticiones:</div>
                        <div class="number">${exercise.repeticionesObjetivo}</div>
                    </div>
                    <div class="flex flex-row items-center">
                        <div class="weight">Peso:</div>
                        <div class="number">${exercise.pesoObjetivo}Kg</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function sessionGetExercise(sessions){

    return `
        <div class="border">
            <button class="accordion-header" onclick="toggleAccordion(this)">
                Destalles Sesión ${sessions.orden}
                <span class="accordion-header-icon material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <div class="accordion-content">
                <div class="grid gap-2">
                    ${sessions.sesionesEjercicio.map((exercise) => exerciseGetDetail(exercise)).join('')}
                </div>
            </div>
        </div>
    `;
}

export function modalPlanDetailHtml(plan){
    return `
         <div id="modal-overlay-plan" class="modal-overlay-plan" role="dialog" aria-modal="true" tabindex="-1">
            <div id="modal-plan-detail" class="modal-plan-detail" data-state="close">
                <div class="flex flex-col space-y-1.5">
                    <h2 class="title">Detalle del Plan</h2>
                </div>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <div class="flex items-start justify-between">
                            <h2 class="name">${plan.nombre}</h2>
                            <div class="type">${(plan.esPlantilla === true ? 'Plantilla' : 'Personalizada')}</div>
                        </div>
                        <p class="coach">Creado por <span>${plan.idEntrenador}</span></p>
                    </div>
                    <div class="description">
                        <h3>Descripción</h3>
                        <p>${plan.descripcion}</p>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="summary-session">
                            <div class="p-4 text-center">
                                <div class="number">${plan.sesionesEntrenamiento.length}</div>
                                <div class="txt text-sm text-muted-foreground">Sesiones</div>
                            </div>
                        </div>
                        <div class="summary-exercise">
                            <div class="p-4 text-center">
                                <div class="number">${exerciseGetNumber(plan)}</div>
                                <div class="txt text-sm text-muted-foreground">Ejercicios</div>
                            </div>
                        </div>
                        <div class="summary-student">
                            <div class="p-4 text-center">
                                <div class="number  text-2xl font-bold text-success">7</div>
                                <div class="txt text-sm text-muted-foreground">Alumnos</div>
                            </div>
                        </div>
                    </div>
                    <div class="session">
                        <h3 class="text-lg font-semibold flex items-center gap-2 mb-6">
                            <span class="material-symbols-outlined">list_alt</span>Sesiones
                        </h3>
                        <div class="accordion">
                            ${plan.sesionesEntrenamiento.map((sessions) => sessionGetExercise(sessions)).join('')}                            
                        </div>
                    </div>

                    <div class="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
                        <div class="flex items-center">
                            <div class="creation-date-icon material-symbols-outlined">calendar_today</div>
                            <div class="creation-date">Creado: ${(new Date(plan.fechaActualizacion).toLocaleDateString())}</div>
                        </div>
                    </div>
                    <div class="grid h-18 grid-cols-1 content-end gap-4">
                        <button class="button" onclick="closePlanModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}