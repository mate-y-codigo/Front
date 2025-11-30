function cardInfoStudent(data) {
    return `
        <div id="card-info-student" class="flex-auto p-6">
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <p class="title">Alumnos Activos</p>
                    <p class="number">${data.number}</p>
                    <p class="percentage">${data.percentage}%</p>
                </div>
                <div class="icon material-symbols-outlined">group</div>
            </div>
        </div>`;
}

function cardInfoPlans(data) {
    return `
        <div id="card-info-plans" class="flex-auto p-6">
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <p class="title">Planes Asignados</p>
                    <p class="number">${data.number}</p>
                    <p class="percentage">${data.percentage}%</p>
                </div>
                <div class="icon material-symbols-outlined">assignment</div>
            </div>
        </div>`;
}

function cardInfoIncome(number, percentage) {
    return `
        <div id="card-info-income" class="flex-auto p-6">
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <p class="title">Ingresos del Mes</p>
                    <p class="number">$${number}</p>
                    <p class="percentage">${percentage}%</p>
                </div>
                <div class="icon material-symbols-outlined">attach_money</div>
            </div>
        </div>`;
}

function cardInfoSession(data) {
    return `
        <div id="card-info-session" class="flex-auto p-6">
            <div class="flex items-start justify-between">
                <div class="space-y-1">
                    <p class="title">Sesiones Completadas</p>
                    <p class="number">${data.number}</p>
                    <p class="percentage">${data.percentage}%</p>
                </div>
                <div class="icon material-symbols-outlined">moving</div>
            </div>
        </div>`;
}

function cardActivityDetail(name, activity, time) {
    return `
        <div class="card-activity-detail">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="card-activity-detail-icon flex items-center justify-center">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <div>
                        <p class="font-medium">${name}</p>
                        <p class="text-sm text-muted-foreground">${activity}</p>
                    </div>
                </div>
                <span class="text-xs text-muted-foreground">${time}</span>
            </div>
        </div>`;
}

function cardNextSessionInfo(name, hour, type) {
    return `
        <div class="flex-auto">
            <div class="card-next-session-info">
                <div class="flex items-center justify-between mb-2">
                    <span class="card-next-session-hour">${hour}</span>
                    <span class="card-next-session-type">Programada</span>
                </div>
                <p class="card-next-session-student font-medium">${name}</p>
                <p class="card-next-session-detail text-sm text-muted-foreground">${type}</p>
            </div>
        </div>`;
}


export function dashboardHtml(cardInfo, cardActivity, cardNextSession) {
    return `
        <div class="flex flex-col pt-6 pb-6 pl-20 pr-20">
            <div class="flex justify-center gap-6 m-2">
                ${cardInfoStudent(cardInfo[0])}
                ${cardInfoPlans(cardInfo[1])}
                ${cardInfoIncome(cardInfo[0].number, cardInfo[0].percentage)} 
                ${cardInfoSession(cardInfo[2])}
            </div>
            
            <div class="flex justify-center gap-6 m-2">
                <div id="card-activity" class="basis-2/3 pb-6">
                    <div class="card-activity-title p-2">
                        <h3 class="flex items-center gap-2">
                            <span class="material-symbols-outlined">earthquake</span>
                            Planes Activos
                        </h3>
                    </div>
                    <div class="flex flex-col">
                        ${cardActivity.map((info, index) => cardActivityDetail(info.name, info.activity, info.time)).join('')}
                    </div>
                </div>
                <div id="card-quick-action" class="basis-1/3 pb-6">
                    <div class="card-quick-action-title p-2">
                        <h3 class="flex items-center gap-2">
                            <span class="material-symbols-outlined">acute</span>
                            Acciones Rápidas
                        </h3>
                    </div>
                    <div class="flex flex-col p-6 gap-4">
                        <div id="quick-action-add-student" class="button flex items-center justify-center">
                            <span class="material-symbols-outlined">person_add</span>
                            Nuevo Alumno
                        </div>
                        <div id="quick-action-new-plan" class="button flex items-center justify-center">
                            <span class="material-symbols-outlined">fitness_center</span>
                            Crear Plan
                        </div>
                        <div id="quick-action-see-calendar" class="button flex items-center justify-center">
                            <span class="material-symbols-outlined">calendar_today</span>
                            Ver Agenda
                        </div>
                        <div id="quick-action-add-exercise" class="button flex items-center justify-center">
                            <span class="material-symbols-outlined">fitness_center</span>
                            Crear Ejercicio
                        </div>
                        <div id="quick-action-add-payment" class="button flex items-center justify-center">
                            <span class="material-symbols-outlined">attach_money</span>
                            Registrar pago
                        </div>
                    </div>
                </div>
            </div >
            <div id="card-next-session" class="gap-6 m-2">
                <div class="card-next-session-title p-2">
                    <h3 class="flex items-center gap-2">
                        <span class="material-symbols-outlined">calendar_today</span>
                        Próximas Sesiones del Día
                    </h3>
                </div>

                <div class="flex justify-center gap-6 m-2 p-6 pt-2">
                     ${cardNextSession.length > 0 ? cardNextSession.map(info => cardNextSessionInfo(info.name, info.hour, info.type)).join('')
                    : `<p class="text-muted-foreground">No hay sesiones programadas para hoy.</p>`}
                </div>
            </div>
        </div > `;
}
