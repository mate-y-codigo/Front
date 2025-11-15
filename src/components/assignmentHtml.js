import { progressBarHtml } from '../components/progressBarHtml.js'

function assignmentCardHtml(assignment) {
    return `
        <div class="card-assignment">
            <div class="flex flex-row p-6">
                <div class="flex-1">
                    <div class="flex flex-1 items-center justify-between gap-4">
                        <div class="flex-1 space-y-3">
                            <div class="card-assignment-student flex items-center gap-3">
                                <div class="card-assignment-student-icon flex items-center justify-center">
                                    <span class="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h3>${assignment.name}</h3>
                                    <p>Plan: ${assignment.planName}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4 text-sm">
                                <div class="card-assignment-coach">
                                    <span>Entrenador:</span>
                                    <p>${assignment.coachName}</p>
                                </div>
                                <div class="card-assignment-date">
                                    <span class="card-assignment-date-title">Período:</span>
                                    <div class="card-assignment-date-info flex items-center gap-1"><span
                                            class="card-assignment-date-icon material-symbols-outlined">calendar_today</span>${assignment.dateStart}
                                        - ${assignment.dateEnd}</div>
                                </div>
                                <div class="card-assignment-progress">
                                    <span class="card-assignment-progress-title">Progreso:</span>
                                    <div class="card-assignment-progress-info flex items-center gap-2">
                                        ${progressBarHtml(assignment.progress)}
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
                <div class="flex-none">
                    <div class="card-assignment-status inline-flex items-center">${assignment.status}</div>
                </div>
            </div>
        </div>
    `;
}

export function assignmentHtml(assignmentList) {
    return `
        <div class="flex flex-col w-full pt-6 pb-6 pl-20 pr-20">
            <div class="flex flex-row-reverse items-center gap-6 pb-10">
                <div>
                    <button class="button inline-flex items-center justify-center gap-2" onclick="openAssignmentNewModal()">
                        <span class="material-symbols-outlined">add</span>
                        Nueva Asignación
                    </button>
                </div>
            </div>
            <div class="flex flex-row gap-4 mb-6">
                <div id="assignment-input-search" class="flex-1"></div>
                <div id="assignment-type-combobox"></div>
            </div>

            <div class="space-y-4 pt-4">
                <h2 id="assignment-title" class="text-2xl font-semibold">Ultimas Asignaciones</h2>
                <div id="assignment-cards">
                    ${assignmentList.map((assignment) => assignmentCardHtml(assignment)).join('')}  
                </div>
            </div>
        </div>
        <div id="modal-open-assignment-new"></div>
    `;
}