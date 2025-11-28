function exerciseGetNumber(plan) {

    let counter = 0;
    plan.sesionesEntrenamiento.forEach(sesion => {
        counter += sesion.sesionesEjercicio.length;
    });
    return counter;
}

export function planCardHtml(plan) {
    return `
        <div class="card-plan visible" data-name="${plan.nombre}" data-type="${(plan.esPlantilla === true ? 'Plantilla' : 'Personalizado')}">
            <div class="flex flex-col space-y-1.5 p-4">
                <div class="flex flex-col items-end">
                    <div class="plan-type">${(plan.esPlantilla === true ? 'Plantilla' : 'Personalizado')}</div>
                </div>
                <div>
                    <h3 class="plan-name">${(plan.nombre.length > 38 ? plan.nombre.slice(0, 38) + "..." : plan.nombre)}</h3>
                </div>
            </div>
            <div class="p-4 pt-0 space-y-4">
                <div class="grid grid-cols-2 gap-8">
                    <div class="plan-detail-summary-session">
                        <div class="p-2 text-center">
                            <div class="plan-detail-number-session">${plan.sesionesEntrenamiento.length}</div>
                            <div class="plan-detail-txt">Sesiones</div>
                        </div>
                    </div>
                    <div class="plan-detail-summary-exercise">
                        <div class="p-2 text-center">
                            <div class="plan-detail-number-exercise">${exerciseGetNumber(plan)}</div>
                            <div class="plan-detail-txt">Ejercicios</div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm text-muted-foreground">
                    <div class="plan-detail-date flex flex-row items-center">
                        <span class="material-symbols-outlined pr-2">calendar_today</span>
                        Última modificación: ${(new Date(plan.fechaActualizacion).toLocaleDateString())}
                    </div>
                </div>

                <div class="flex">
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
        <div class="flex flex-col pt-6 pb-6 pl-20 pr-20">
            <div class="flex justify-between items-center gap-6 pb-4">
                <div>
                    <h2 class="text-2xl font-semibold">Planes Activos: ${plansList.length}</h2>
                </div>
                <div>
                    <button class="button inline-flex items-center justify-center gap-2" onclick="openPlanCreate()">
                        <span class="material-symbols-outlined">add</span>
                        Crear Plan
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mb-8">
                <div id="plan-input-search" class="relative col-span-2">
                    <span class="material-symbols-outlined input-icon">search</span>
                    <input class="input-with-icon" placeholder="Buscar plan por nombre..." value="" maxlength="100" autocomplete="off"/>
                </div>
                <div id="plan-type-filter-combobox"></div>                
            </div>
            <div class="space-y-4">
                <h2 id="plans-filter-title" class="text-xl font-bold mb-4">Todos los Planes</h2>
                <div id="plans-cards" class="grid grid-cols-3 gap-10 mb-6"> 
                    ${plansList.map((plan) => planCardHtml(plan)).join('')}                  
                </div>
            </div>
        </div>
    `;
}