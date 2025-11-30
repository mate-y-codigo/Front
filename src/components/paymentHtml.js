import { dateFormat, dateFormatSmall } from '../utils/dateFormat.js'

export function paymentStatementHtml(student, paymentInfo, status) {
    return `
        <div class="payment-card-student flex flex-row items-center justify-between p-4 gap-4">
            <div class="flex items-center gap-3">
                <div class="payment-card-student-icon flex items-center justify-center">
                    <span class="material-symbols-outlined">user_attributes</span>
                </div>
                <div>
                    <p class="payment-card-student-name">${student.nombre} ${student.apellido}</p>
                    <p class="payment-card-student-last-payment-date">${dateFormat(paymentInfo.creado_En)}</p>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                <div class="text-right">
                    <p class="payment-card-student-last-payment">$${paymentInfo.monto}</p>
                    <p class="payment-card-student-last-payment-method">${paymentInfo.metodo}</p>
                </div>
                <div class="text-right">
                    <div class="flex items-center payment-card-student-coverage-date">
                        <span class="material-symbols-outlined">calendar_today</span>
                        ${dateFormatSmall(paymentInfo.cobertura_Inicio)} al ${dateFormatSmall(paymentInfo.cobertura_Fin)}
                    </div>
                    <p class="payment-card-student-coverage-title">Cobertura</p>
                </div>
                ${status ?
            `<div class="payment-card-student-status payment-card-student-status-ok inline-flex items-center">Al Día</div>` :
            `<div class="payment-card-student-status payment-card-student-status-debt inline-flex items-center">Vencido</div>`
        }                                
            </div>
        </div>
    `;
}

function paymentNewHtml() {
    return `
        <div class="payment-card mb-8">
            <div class="flex flex-col space-y-1.5 p-6">
                <h3 class="payment-card-new-title flex items-center gap-2">
                    <span class="material-symbols-outlined">add</span>Registrar Nuevo Pago
                </h3>
            </div>
            <div class="p-6 pt-0" id="payment-card-new">
                <div class="grid grid-cols-5 gap-4">
                    <div class="space-y-2 col-span-3">
                        <label>Alumno *</label>
                        <div id="payment-new-student-name"></div>
                    </div>
                    <div class="space-y-2">
                        <label>Monto *</label>
                        <div id="payment-new-student-amount"><input id="id-payment-new-student-amount" type="number" class="input w-full" placeholder="15000" value="" autocomplete="off"></div>
                    </div>
                    <div class="space-y-2">
                        <label>Medio de Pago *</label>
                        <div id="payment-new-method"></div>
                    </div>
                </div>
                <div class="flex flex-row justify-end pt-4">
                    <div class="w-40"><button class="button-small"><span class="material-symbols-outlined">add</span>Ingresar Pago</button></div>
                </div>
            </div>
        </div>
    `;
}

export function paymentHtml(students) {
    return `
        <main class="flex flex-col pt-6 pb-6 pl-20 pr-20">
            <div class="grid grid-cols-4 gap-6 mb-8">
                <div class="payment-card payment-card-info-total">
                    <div class="p-6">
                    <div class="flex items-center gap-3">
                        <div class="payment-card-info-icon payment-card-info-icon-total flex items-center justify-center">
                        <span class="material-symbols-outlined">attach_money</span>
                        </div>
                        <div>
                        <p class="payment-card-info-title">Ingresos del Mes</p>
                        <p class="payment-card-info-detail" id="payment-card-info-total">$40</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="payment-card payment-card-info-cash">
                    <div class="p-6">
                        <div class="flex items-center gap-3">
                            <div class="payment-card-info-icon payment-card-info-icon-cash flex items-center justify-center">
                                <span class="material-symbols-outlined">universal_currency_alt</span>
                                </div>
                            <div>
                                <p class="payment-card-info-title">Ingresos en Efectivo</p>
                                <p class="payment-card-info-detail" id="payment-card-info-cash">$0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payment-card payment-card-info-credit-card">
                    <div class="p-6">
                        <div class="flex items-center gap-3">
                            <div class="payment-card-info-icon payment-card-info-icon-credit-card flex items-center justify-center">
                                <span class="material-symbols-outlined">credit_card</span>
                            </div>
                            <div>
                                <p class="payment-card-info-title">Ingresos con Tarjeta</p>
                                <p class="payment-card-info-detail" id="payment-card-info-card">$0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payment-card payment-card-info-transfer">
                    <div class="p-6">
                        <div class="flex items-center gap-3">
                            <div class="payment-card-info-icon payment-card-info-icon-transfer flex items-center justify-center">
                                <span class="material-symbols-outlined">currency_exchange</span>
                            </div>
                            <div>
                                <p class="payment-card-info-title">Ingresos con Transferencia</p>
                                <p class="payment-card-info-detail" id="payment-card-info-transfer">$0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${paymentNewHtml(students)}
    
            <div class="payment-card">
                <div class="flex flex-col space-y-1.5 p-6">
                    <div class="flex items-center justify-between">
                        <h3 class="payment-card-student-statement flex items-center gap-2">
                            <span class="material-symbols-outlined">list_alt_check</span>Estado de Cuenta de Alumnos
                        </h3>

                        <div>
                            
                            <div class="flex flex-row justify-end items-center gap-4 pt-4">
                                <div><label class="custom-checkbox"><input type="checkbox" id="payment-card-student-filter-ok"><span></span>Al día</label></div>
                                <div><label class="custom-checkbox"><input type="checkbox" id="payment-card-student-filter-debt"><span></span>Vencido</label></div>
                                <div id="payment-card-student-search" class="relative col-span-2">
                                <span class="material-symbols-outlined input-icon">search</span>
                                <input id="payment-student-filter" class="input-with-icon" placeholder="Buscar nombre..." value="" maxlength="100" autocomplete="off" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-6 pt-0 h-[420px] overflow-y-auto mb-2">
                    <div class="space-y-3" id="payment-card-student-statement-list">
                    </div>
                </div>
            </div>
        </main>
    `;
}