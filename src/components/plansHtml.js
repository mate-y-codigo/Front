function exerciseGetNumber(plan) {

    let counter = 0;
    plan.sesionesEntrenamiento.forEach(sesion => {
        counter += sesion.sesionesEjercicio.length;
    });
    return counter;
}

function planCardHtml(plan) {
    return `
        <div class="card-plan">
            <div class="flex flex-col space-y-1.5 p-6">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="plan-name">${plan.nombre}</h3>
                        <p class="plan-coach">${plan.idEntrenador}</p>
                    </div>
                    <div class="flex flex-col gap-2 items-end">
                        <div class="plan-type">${(plan.esPlantilla === true ? 'Plantilla' : 'Personalizada')}</div>
                    </div>
                </div>
            </div>
            <div class="p-6 pt-0 space-y-4">
                <div class="plan-detail">
                    <div class="text-center">
                        <div class="plan-detail-number-session">${plan.sesionesEntrenamiento.length}</div>
                        <div class="plan-detail-txt">Sesiones</div>
                    </div>
                    <div class="text-center">
                        <div class="plan-detail-number-exercise">${exerciseGetNumber(plan)}</div>
                        <div class="plan-detail-txt">Ejercicios</div>
                    </div>
                    <div class="text-center">
                        <div class="plan-detail-number-student">12</div>
                        <div class="plan-detail-txt">Alumnos</div>
                    </div>
                </div>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                    <div class="plan-detail-date flex items-center gap-1">
                        <span class="material-symbols-outlined">calendar_today</span>
                        Creado: ${(new Date(plan.fechaActualizacion).toLocaleDateString())}
                    </div>
                </div>

                <div class="flex gap-2 pt-2">
                    <button class="button inline-flex items-center justify-center btn-plan-detail" data-plan='${JSON.stringify(plan)}'>
                        <span class="material-symbols-outlined">visibility</span>
                        Ver Detalle
                    </button>
                </div>
            </div>
        </div> 
    `;
}

export function plansHtml(plansList) {
    return `
        <div class="flex flex-col p-6">
            <div class="flex justify-between items-center gap-6 pb-4">
                <div>
                    <h2 class="text-2xl font-semibold">Planes Activos: ${plansList.plans.length}</h2>
                </div>
                <div>
                    <button class="button inline-flex items-center justify-center gap-2" onclick="openPlanNewModal()">
                        <span class="material-symbols-outlined">add</span>
                        Crear Plan
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="relative">
                    <span class="material-symbols-outlined input-icon">search</span>
                    <input class="input-with-icon" placeholder="Buscar plan por nombre..." value="">
                </div>
                <div id="plan-type-combobox"></div>                
            </div>
            <div>
                <h3 class="text-xl font-bold mb-4">Todos los Planes</h3>
                <div class="grid md:grid-cols-3 gap-6 mb-6"> 
                    ${plansList.plans.map((plan) => planCardHtml(plan)).join('')}                   
                </div>
            </div>
        </div>
        <div id="modal-open-plan-detail"></div>
        <div id="modal-open-plan-new"></div>
    `;
}