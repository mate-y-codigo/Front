

export function previewEditSessionCardHtml(id) {
    return `
        <div class="flex flex-col space-y-1.5 p-6 pb-2">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="session-card-title inline-flex items-center">Sesión ${id}</div>
                    <h3 class="session-card-name">Nombre de la sesión</h3>
                </div>
                <span class="material-symbols-outlined"></span>
            </div>
        </div>

        <div class="p-6 pt-0">
            <div class="session-card-detail space-y-1"></div>
        </div>
    `;
}

export function sessionEditExcerciseHtml(excerciseTotalCount) {
    return `
        <div class="flex flex-col session-excercise-row gap-2">
            <div class="pb-2">
                <label>Ejercicio</label>
                <div class="session-excercise-name" id="edit-session-excercise-name-${excerciseTotalCount}"></div>                
            </div>
            <div class="grid grid-cols-4 justify-stretch gap-4 items-center">            
                <div>
                    <label>Series</label>
                    <input class="session-excercise-steps input" type="text" id="edit-session-excercise-steps-${excerciseTotalCount}" value="4" autocomplete="off">
                </div>

                <div>
                    <label>Repeticiones</label>
                    <input class="session-excercise-reps input" type="text" id="edit-session-excercise-reps-${excerciseTotalCount}" value="8" autocomplete="off">
                </div>

                <div>
                    <label>Peso (kg)</label>
                    <input class="session-excercise-weight input" type="text" id="edit-session-excercise-weight-${excerciseTotalCount}" value="0" autocomplete="off">
                </div>

                <div>
                    <label>Descanso (min)</label>
                    <input class="session-excercise-rest input" type="text" id="edit-session-excercise-rest-${excerciseTotalCount}" value="1" autocomplete="off">
                </div>
            </div>
        </div>       
    `;
}

export function planEditSessionHtml(sessionCount) {
    // use data-session-id attribute for robust control
    const sid = `session-${sessionCount}`;
    return `
        <div class="plan-session" data-session-id="${sid}">
            <div class="plan-session-header flex items-center justify-between p-2 cursor-pointer" data-session-id="${sid}">
                <div class="flex items-center space-x-3">
                    <div class="plan-session-pill">Sesión ${sessionCount}</div>
                    <h2 class="plan-session-name" id="plan-edit-session-name-${sessionCount}">Nombre de la sesión</h2>
                </div>
                <div class="flex items-center">
                    <span class="plan-session-excercise-number">0 ejercicios</span>
                    <span class="plan-session-header-icon material-symbols-outlined ml-2 transition-transform duration-300">keyboard_arrow_down</span>
                </div>
            </div>

            <div class="plan-session-accordion" data-session-id="${sid}">
                <div class="flex items-center justify-between pt-3">
                    <h4 class="font-medium pl-4">Ejercicios</h4>
                </div>

                <div class="session-excercises pt-3 space-y-4 mb-4"></div>
            </div>
        </div>
    `;
}

export function planEditPreviewHtml() {
    return `
        <div class="">
            <h2><span class="material-symbols-outlined">article</span> Vista Previa del Plan</h2>
            <div class="general-info">
                <div class="flex flex-col space-y-1.5 p-6 pb-3">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h3 id="plan-edit-preview-name">Nombre del plan</h3>
                            <p  id="plan-edit-preview-description"> Descripción del plan...
                            </p>
                        </div>
                        <div class="opacity-0 invisible transition-opacity duration-300 ease-in-out" id="plan-edit-preview-type">Plantilla</div>
                    </div>
                </div>
                <div class="p-6 pt-0 space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                         <div class="session flex items-center justify-center gap-2">
                            <span class="session-icon material-symbols-outlined">format_list_bulleted</span>                                        
                            <p class="session-title">Sesiones</p>
                            <p class="session-text" id="plan-edit-session-preview-amount">0</p>                                        
                        </div>

                        <div class="excercise flex items-center justify-center gap-2">
                            <span class="excercise-icon material-symbols-outlined">exercise</span>
                            <p class="excercise-title">Ejercicios</p>
                            <p class="excercise-text" id="plan-edit-excercise-preview-amount">0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="session-detail pt-6 space-y-3">
                <h3 class="title">Sesiones</h3>
                <div id="edit-session-cards-container" class="space-y-4 mt-4"></div>
            </div>
        </div>
    `;
}

export function planEditHtml() {
    return `
        <div class="plan-edit-header flex gap-4 items-center pl-20 pr-20">
            <div class="w-64 flex-auto">
                <div class="flex flex-col flex-auto w-full">
                    <div>
                        <h1>Editar Plan de Entrenamiento</h1>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-row gap-4 items-center">
                    <button class="button-cancel" id="btn-cancel-edit-plan">Cancelar</button>
                    <button class="button" id="btn-save-edit-plan"><span class="material-symbols-outlined">save</span>Guardar Cambios</button>
                </div>
            </div>
        </div>
        <div class="flex flex-row w-full">
            <div class="plan-edit-main">
                <div id="plan-edit-preview-container" class="pl-20 pt-6 pb-6 pr-10 space-y-6">
                    ${planEditPreviewHtml()}
                </div>
                <div class="plan-edit-create pr-20 pt-6 pb-6 pl-10  space-y-6">
                    <div class="plan-edit-create-general">
                        <div class="flex flex-row justify-between items-center space-y-1.5 p-6">
                            <h3 class="flex items-center gap-2">Información General</h3>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div class="space-y-1">
                                <label>Nombre del Plan:</label>
                                <div id="plan-edit-name">Test</div>
                            </div>
                            <div class="space-y-1">
                                <label>Descripción:</label>
                                <div id="plan-edit-description">descripocion</div>
                            </div>
                        </div>
                    </div>

                    <div class="plan-edit-create-sessions">
                        <div class="flex flex-row justify-between items-center space-y-1.5 p-6">
                            <h3 class="flex items-center gap-2">Sesiones de Entrenamiento</h3>
                        </div>
                        <div class="p-6 pt-0">
                            <div class="space-y-4">
                                <div id="plan-edit-sessions-container" class="space-y-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
