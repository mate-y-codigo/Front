
export function previewSessionCardHtml(id) {
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

export function sessionExcerciseHtml(excerciseTotalCount){
    return `
        <div class="grid grid-cols-[auto_4rem_4rem_8rem] justify-stretch gap-4 items-center">
            <div>
                <label>Ejercicio</label>
                <div id="session-excercise-name-${excerciseTotalCount}"></div>                
            </div>

            <div>
                <label>Series</label>
                <input class="session-excercise-steps input" type="text" id="session-excercise-steps-${excerciseTotalCount}" value="4">
            </div>

            <div>
                <label>Repet.</label>
                <input class="session-excercise-reps input" type="text" id="session-excercise-reps-${excerciseTotalCount}" value="8">
            </div>

            <div>
                <label>Peso (kg)</label>
                <div class="flex flex-row items-center gap-4">
                    <input class="session-excercise-weight input" type="text" id="session-excercise-weight-${excerciseTotalCount}" value="0">
                    <div><button class="delete-excercise button-small-cancel p-2"><span class="material-symbols-outlined">delete</span></button></div>
                </div>
                
            </div>
        </div>        
    `;
}

export function planSessionHtml(sessionCount){
    return `
        <div class="plan-session-header flex items-center justify-between p-2 cursor-pointer">
            <div class="flex items-center space-x-3">
                <div class="plan-session-pill">Sesión ${sessionCount}</div>
                <h2 class="plan-session-name">Nombre de la sesión</h2>
            </div>
            <div class="flex items-center">
                <span class="plan-session-excercise-number">0 ejercicios</span>
                <span class="plan-session-header-icon material-symbols-outlined ml-2 transition-transform duration-300">keyboard_arrow_down</span>
            </div>
        </div>

        <div class="plan-session-accordion">

            <div class="grid grid-cols-3 gap-4 p-4">
                <div class="col-span-2"> 
                    <label>Nombre de la sesión *</label>
                    <input type="text" class="input">
                </div>
                <div>
                    <label>Orden</label>
                    <input type="number" class="input" value="${sessionCount}">
                </div>
            </div>

            <div class="flex items-center justify-between pt-3">
                <h4 class="font-medium pl-4">Ejercicios</h4>
                <div class="pr-4"><button class="button-small add-exercise-btn" type="button"><span class="material-symbols-outlined">add</span>Agregar ejercicio</button></div>
            </div>

            <div class="session-excercises pt-3 space-y-4"></div>

            <div class="flex flex-row-reverse p-4">
                <div><button class="delete-session-btn button-small-cancel mt-6 mb-3"><span class="material-symbols-outlined">delete</span>Eliminar Sesión</button></div>
            </div>
        </div>
    `;
}

export function planCreateHtml() {
    return `
        <div class="plan-new-header flex gap-4 items-center pl-20 pr-20">
            <div class="w-64 flex-auto">
                <div class="flex flex-col flex-auto w-full">
                    <div>
                        <h1>Crear Plan de Entrenamiento</h1>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex flex-row gap-4 items-center">
                    <button class="button-cancel" id="plan-new-cancel">Cancelar</button>
                    <button class="button" id="plan-new-save"><span class="material-symbols-outlined">save</span>Guardar
                        Plan</button>
                </div>
            </div>
        </div>
        <div class="flex flex-row w-full">
            <div class="plan-new-main">
                <div class="plan-new-preview pl-20 pt-6 pb-6 pr-10 space-y-6">
                    <div class="">
                        <h2><span class="material-symbols-outlined">article</span> Vista Previa del Plan</h2>
                        <div class="general-info">
                            <div class="flex flex-col space-y-1.5 p-6 pb-3">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h3 id="plan-preview-name">Nombre del plan</h3>
                                        <p  id="plan-preview-description"> Descripción del plan...
                                        </p>
                                    </div>
                                    <div class="opacity-0 invisible transition-opacity duration-300 ease-in-out" id="plan-preview-type">Plantilla</div>
                                </div>
                            </div>
                            <div class="p-6 pt-0 space-y-4">
                                <div class="grid grid-cols-2 gap-3">
                                     <div class="session flex items-center justify-center gap-2">
                                        <span class="session-icon material-symbols-outlined">format_list_bulleted</span>                                        
                                        <p class="session-title">Sesiones</p>
                                        <p class="session-text" id="plan-session-preview-amount">0</p>                                        
                                    </div>

                                    <div class="excercise flex items-center justify-center gap-2">
                                        <span class="excercise-icon material-symbols-outlined">exercise</span>
                                        <p class="excercise-title">Ejercicios</p>
                                        <p class="excercise-text" id="plan-excercise-preview-amount">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="session-detail pt-6 space-y-3">
                            <h3 class="title">Sesiones</h3>
                            <div id="session-cards-container" class="space-y-4 mt-4"></div>
                        </div>
                    </div>
                </div>
                <div class="plan-new-create pr-20 pt-6 pb-6 pl-10  space-y-6">
                    <div class="plan-new-create-template">
                        <div class="flex flex-col space-y-1.5 p-6">
                            <h3 class="flex items-center gap-2"><span
                                    class="material-symbols-outlined">content_copy</span>Cargar desde plantilla</h3>
                        </div>
                        <div class="p-6 pt-0">
                            <div id="plan-template-combobox"></div>
                        </div>
                    </div>
                    <div class="plan-new-create-general">
                        <div class="flex flex-row justify-between items-center space-y-1.5 p-6">
                            <h3 class="flex items-center gap-2">Información General</h3>
                            <div class="flex items-center space-x-2">
                                <div id="plan-new-template-switch"></div>
                            </div>
                        </div>
                        <div class="p-6 pt-0 space-y-4">
                            <div class="space-y-2">
                                <label>Nombre del Plan *</label>
                                <input class="input" id="plan-name" placeholder="Ej: Fuerza Avanzada">
                            </div>
                            <div class="space-y-2">
                                <label>Descripción *</label>
                                <textarea class="textarea" id="plan-description" rows="3"
                                    placeholder="Describe el objetivo y características del plan..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="plan-new-create-sessions">
                        <div class="flex flex-row justify-between items-center space-y-1.5 p-6">
                            <h3 class="flex items-center gap-2">Sesiones de Entrenamiento</h3>
                            <div>
                                <button class="button-small" id="session-add-btn">
                                    <span class="material-symbols-outlined">add</span>Agregar Sesión
                                </button>
                            </div>
                        </div>
                        <div class="p-6 pt-0">
                            <div class="space-y-4">
                                <div id="sessions-container" class="space-y-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}