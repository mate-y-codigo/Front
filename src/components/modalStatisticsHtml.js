function modalStatisticsTableRowHtml(session){
    return `
        <tr class="border-b border-border/50 hover:bg-muted/30">
            <td class="text-center p-2">${session.date}</td>
            <td class="text-center p-2 font-semibold">${session.weight}</td>
            <td class="text-center p-2">${session.sets}</td>
            <td class="text-center p-2">${session.reps}</td>
            <td class="text-center p-2">${session.reps * session.weight}</td>
        </tr>
    `;
}
function modalStatisticsTableHtml(exerciseProgress) {
    return `
        <div class="table">
            <div class="flex flex-col space-y-1.5 p-6">
                <h3>Historial</h3>
            </div>
            <div class="p-6 pt-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr>
                                <th class="text-center p-2 font-semibold">Fecha</th>
                                <th class="text-center p-2 font-semibold">Peso (Kg)</th>
                                <th class="text-center p-2 font-semibold">Series</th>
                                <th class="text-center p-2 font-semibold">Rep.</th>
                                <th class="text-center p-2 font-semibold">Volumen (Kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${exerciseProgress.sessions.map((session) => modalStatisticsTableRowHtml(session)).join('')} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

export function modalStatisticsHtml(exerciseProgress) {
    return `
        <div id="modal-overlay-statistics" class="modal-overlay-statistics" role="dialog" aria-modal="true"
            tabindex="-1">
            <div id="modal-statistics" class="modal-statistics flex flex-col" data-state="close">
                <div class="flex-1">
                    <div class="flex flex-row items-center justify-between pb-6">
                        <h2 class="title">Progreso Detallado - ${exerciseProgress.name}</h2>
                        <div>
                            <button class="button-small p-2" onclick="closeStatisticsModal()"><span class="material-symbols-outlined">close</span></button>
                        </div>                        
                    </div>
                    <div class="w-full">
                        <div class="space-y-6 mt-4">
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="card card-weight">
                                    <p class="card-text">Peso Máximo</p>
                                    <p class="card-detail">80 kg</p>
                                </div>
                                <div class="card card-sets">
                                    <p class="card-text">Series Máx.</p>
                                    <p class="card-detail">4</p>
                                </div>
                                <div class="card card-reps">
                                    <p class="card-text">Repeticiones Máx.</p>
                                    <p class="card-detail">12</p>
                                </div>                                
                                <div class="card card-progress">
                                    <p class="card-text">Progreso</p>
                                    <div class="card-detail">+33%</div>
                                </div>
                            </div>
                            <div class="chart">
                                <div id="chart-weight"></div>
                            </div>

                            <div class="chart">
                                <div id="chart-volume"></div>
                            </div>
                            <div class="pb-6">
                                ${modalStatisticsTableHtml(exerciseProgress)}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-auto">
                    <div class="flex gap-8 ">
                        <button class="button-small" onclick="closeStatisticsModal()">Cerrar</button>
                    </div>
                </div>


            </div>
        </div>
    `;
}