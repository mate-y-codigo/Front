export function assignmentNewHtml() {
    return `
        <div class="fixed inset-0 bg-white z-50 overflow-y-auto" style="background-color: var(--background);">
            <!-- Header -->
            <div class="assignment-new-header">
                <div class="flex-1">
                    <h1>Asignar Nuevo Plan</h1>
                </div>
                <div class="flex gap-4 items-center">
                    <button class="button-cancel" onclick="closeFullScreenAssignment()">Cancelar</button>
                    <button class="button" id="plan-new-save">
                        <span class="material-symbols-outlined">save</span>
                        Guardar Asignación
                    </button>
                </div>
            </div>

            <!-- Contenido principal -->
            <div class="assignment-new-main">
                <!-- Columna izquierda: Vista previa -->
                <div class="assignment-new-preview">
                    <h2>
                        <span class="material-symbols-outlined">article</span>
                        Resumen de la Asignación
                    </h2>
                    <div class="assignment-preview-container">
                        <div class="p-6 pb-4">
                            <div class="flex items-start justify-between">
                                <div class="flex-1" style="min-width: 0;">
                                    <div id="assignment-preview-student">Seleccione un alumno</div>
                                    <div id="assignment-preview-plan">Seleccione un plan de entrenamiento</div>
                                </div>
                                <div class="opacity-0 invisible transition-opacity duration-300 ease-in-out" id="assignment-preview-status">Pendiente</div>
                            </div>
                        </div>
                        <div class="p-6 pt-0">
                            <div class="assignment-preview-grid">
                                <div class="assignment-preview-item session">
                                    <span class="assignment-preview-icon material-symbols-outlined">calendar_today</span>
                                    <div class="assignment-preview-content">
                                        <div class="assignment-preview-title">Fecha inicio</div>
                                        <div class="assignment-preview-text" id="assignment-preview-start">--/--/----</div>
                                    </div>
                                </div>
                                <div class="assignment-preview-item excercise">
                                    <span class="assignment-preview-icon material-symbols-outlined">event_available</span>
                                    <div class="assignment-preview-content">
                                        <div class="assignment-preview-title">Fecha fin</div>
                                        <div class="assignment-preview-text" id="assignment-preview-end">--/--/----</div>
                                    </div>
                                </div>
                                <div class="assignment-preview-item session double-width">
                                    <span class="assignment-preview-icon material-symbols-outlined">hotel</span>
                                    <div class="assignment-preview-content">
                                        <div class="assignment-preview-title">Días de descanso</div>
                                        <div class="assignment-preview-text" id="assignment-preview-rest">0 días</div>
                                    </div>
                                </div>
                                <div class="assignment-preview-item excercise double-width notes-container">
                                    <span class="assignment-preview-icon material-symbols-outlined">description</span>
                                    <div class="assignment-preview-content">
                                        <div class="assignment-preview-title">Notas</div>
                                        <div class="assignment-preview-text notes-scrollable" id="assignment-preview-notes">--</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna derecha: Formulario -->
                <div class="assignment-new-create">
                    <div class="assignment-new-create-section">
                        <h3>Información de la Asignación</h3>
                        <div class="assignment-form-content">
                            <!-- CAMBIO: Combobox para alumno -->
                            <div class="assignment-form-group">
                                <label>Alumno *</label>
                                <div id="assignment-new-student-combobox"></div>
                            </div>
                            
                            <!-- CAMBIO: Combobox para plan -->
                            <div class="assignment-form-group">
                                <label>Plan de entrenamiento *</label>
                                <div id="assignment-new-plan-combobox"></div>
                            </div>
                            
                            <div class="assignment-form-grid">
                                <div class="assignment-form-group">
                                    <label>Fecha *</label>
                                    <div id="assignment-new-date-range-fullscreen"></div>
                                </div>
                                <div class="assignment-form-group">
                                    <label>Descanso *</label>
                                    <input 
                                        id="rest-days-fullscreen" 
                                        class="assignment-form-input" 
                                        type="number" 
                                        placeholder="Días de descanso"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div class="assignment-form-group">
                                <label>Notas</label>
                                <textarea 
                                    id="notes-fullscreen" 
                                    class="assignment-form-input assignment-form-textarea" 
                                    maxlength="200" 
                                    placeholder="Descripción del plan de entrenamiento..." 
                                    rows="4"
                                ></textarea>
                                <div class="assignment-char-counter">
                                    <span id="notes-counter">0</span>/200 caracteres
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}