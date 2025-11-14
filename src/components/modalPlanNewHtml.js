export function modalPlanNewExcerciseHtml(number) {
    return `
        <div class="session-exercise">
            <div class="flex items-center justify-between">
                <span class="session-exercise-title exerciseTitle">Ejercicio ${number}</span>
                <div>
                    <button type="button" class="button-small-icon-red exerciseDelete">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div id="session-exercise-list-${number}" class="col-span-3 space-y-2"></div>
                <div class="grid grid-cols-3 gap-4 pt-1">
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium">Series *</label>
                        <input type="number" class="input" maxlength="2" placeholder="3" autocomplete="off"/>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium">Repeticiones *</label>
                        <input type="number" class="input" min="1" max="100" maxlength="2" placeholder="12" autocomplete="off"/>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-medium">Peso objetivo (Kg) *</label>
                        <input type="number" class="input" min="0" step="0.5" maxlength="2" placeholder="0" autocomplete="off"/>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function modalPlanNewSessionHtml(sessionNumber) {
    return `
        <div class="session">
            <div class="session-accordion">
                <button type="button" class="session-accordion-open toggle-session">
                    <span class="session-accordion-title">Sesión ${sessionNumber}</span>
                    <span class="material-symbols-outlined accordion-arrow transition-transform">keyboard_arrow_down</span>
                </button>
                <div>
                    <button type="button" class="button-small-icon-red sessionDelete">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>

            <div class="session-accordion-content">
                <div class="grid grid-cols-2 gap-4 pt-2 pl-4 pr-4">
                    <div class="session-accordion-content-name space-y-2">
                        <label class="label">Nombre de la Sesión *</label>
                        <input class="input" maxlength="25" placeholder="Ej: Día de Piernas" autocomplete="off"/>
                    </div>
                    <div class="session-accordion-content-order space-y-2">
                        <label class="label">Orden *</label>
                        <input type="number" class="input" min="1" value="${sessionNumber}" autocomplete="off"/>
                    </div>
                </div>

                <div class="space-y-1">
                    <div class="session-exercises">
                        <label>Ejercicios de la Sesión</label>
                        <div>
                            <button class="exercise-add button-small">
                                <span class="material-symbols-outlined">add</span>
                                Agregar Ejercicio
                            </button>
                        </div>
                    </div>
                    <div class="exercise-list space-y-3"></div>
                </div>
            </div>
        </div>
    `;
}

export function modalPlanNewHtml() {
    return `
        <div id="modal-overlay-plan-new" class="modal-overlay-plan-new" role="dialog" aria-modal="true" tabindex="-1">
            <div id="modal-plan-new" class="modal-plan-new flex flex-col" data-state="close">
                <div class="flex-1">
                    <div class="flex flex-col space-y-1.5">
                        <h2 class="title">Nuevo Plan de Entrenamiento</h2>
                    </div>
                    <div class="w-full">
                        <div class="space-y-6">
                            <div class="space-y-4">
                                <h3 class="subtitle">Datos Generales</h3>
                                <div class="space-y-2">
                                    <label class="label">Nombre del Plan *</label>
                                    <input id="name" class="input" maxlength="25" placeholder="Plan de Hipertrofia 12 sesiones" autocomplete="off"/>
                                </div>
                                <div class="space-y-2">
                                    <label class="label">Descripción *</label>
                                    <textarea id="description" class="textarea flex" maxlength="200" placeholder="Descripción del plan de entrenamiento..." rows="2" name="description"></textarea>
                                </div>

                                <div class="grid grid-cols-2 justify-items-stretch gap-4">
                                    <div class="space-y-2">
                                        <label class="label">Entrenador *</label>
                                        <div id="modal-plan-new-coach" class="w-full"></div>
                                    </div>
                                    <div id="modal-plan-new-switch" class="justify-self-center flex items-center space-x-2 pt-8"></div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold">Sesiones de Entrenamiento</h3>
                                    <div>
                                        <button id="session-button-add" class="button-small">
                                            <span class="material-symbols-outlined">add</span>
                                            Agregar Sesión
                                        </button>
                                    </div>
                                </div>

                                <div id="sessions-container" class="space-y-4"></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="mt-auto">
                    <div class="flex gap-8 ">
                        <button class="button-small-cancel" onclick="closePlanNewModal()">Cancelar</button>
                        <button class="button-small" onclick="closePlanNewModal()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}