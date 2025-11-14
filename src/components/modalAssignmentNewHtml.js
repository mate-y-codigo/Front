export function modalAssignmentNewHtml(){
    return `
        <div id="modal-overlay-assignment-new" class="modal-overlay-assignment-new" role="dialog" aria-modal="true"
            tabindex="-1">
            <div id="modal-assignment-new" class="modal-assignment-new flex flex-col" data-state="close">
                <div class="flex-1">
                    <div class="flex flex-col space-y-1.5">
                        <h2 class="title">Nuevo Asignación de Plan de Entrenamiento</h2>
                    </div>
                    <div class="w-full">
                        <div class="space-y-6">
                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <label class="label">Alumno *</label>
                                    <div id="assignment-new-student-name" class="flex-1"></div>
                                </div>
                                <div class="space-y-2">
                                    <label class="label">Plan de entrenamiento *</label>
                                    <div id="assignment-new-coach-name" class="flex-1"></div>
                                </div>
                                
                                <div class="flex flex-row gap-4">
                                    <div class="basis-3/4 space-y-2">
                                        <label class="label">Fecha *</label>
                                        <div id="assignment-new-date-range"></div>
                                    </div>
                                    <div class="basis-1/4 space-y-2">
                                        <label class="label">Descanso</label>
                                        <input id="name" class="input" type="number" />
                                    </div>                                
                                </div>

                                <div class="space-y-2">
                                    <label class="label">Notas</label>
                                    <textarea id="description" class="textarea flex" maxlength="200"placeholder="Descripción del plan de entrenamiento..." rows="4" maxlength="255"></textarea>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-auto">
                    <div class="flex gap-8 ">
                        <button class="button-small-cancel" onclick="closeAssignmentNewModal()">Cancelar</button>
                        <button class="button-small" onclick="closeAssignmentNewModal()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}