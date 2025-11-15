
function statisticsExcerciseCardHtml(excercise) {
    return `
        <div class="statistics-excercise-card flex items-center justify-between">
            <div class="flex-1">
                <p class="execercise-name">${excercise.name}</p>
                <div class="execercise-detail grid grid-cols-3 gap-2">
                    <div><span class="font-medium">Peso máximo: </span><span class="font-bold">${excercise.maxWeight}</span></div>
                    <div><span class="font-medium">Repticiones maximas: </span><span class="font-bold">${excercise.maxRepetition}</span></div>
                    <div><span class="font-medium">Realizado por última vez: </span><span class="font-bold">${excercise.lastDate}</span></div>
                </div>
            </div>
            <div class="flex items-center gap-3 ml-4">
                <div class="execercise-percentage flex items-center gap-1">
                    <span class="material-symbols-outlined">${excercise.percentage > 0 ? 'trending_up' : 'trending_down'}</span>
                    ${excercise.percentage > 0 ? '+' : ''}${excercise.percentage}
                </div>
                <button class="button-small p-2" aria-label="Ver progreso detallado" onclick="openStatisticsModal()"><span class="material-symbols-outlined">chart_data</span></button>
            </div>
        </div>
    `;
}

export function statisticsHtml(excerciseList) {
    return `
        <div class="flex flex-col w-full pt-6 pb-6 pl-20 pr-20">
           <div class="flex flex-row items-center gap-4 mb-8">
                <div>Ver estadísticas de:</div>
                <div class="flex-1 relative">
                    <span class="material-symbols-outlined input-icon">search</span>
                    <div id="statistics-input-search-student"></div>
                </div>
            </div>

            <div id="container-statistics">
                <h1 class="statistics-student">Juan Peréz</h1>

                <div class="statistics-excercise">
                    <div class="flex flex-col space-y-1.5 pb-6">
                        <div class="flex flex-row items-center justify-between gap-4">
                            <h3><span class="material-symbols-outlined">exercise</span>
                                Ejercicios Realizados
                            </h3>
                            <div class="flex relative">
                                <span class="material-symbols-outlined input-icon">search</span>
                                <input class="input-with-icon" placeholder="Buscar ejercicio..." value=""
                                    autocomplete="off" />
                            </div>
                        </div>
                    </div>
                    ${excerciseList.map((excercise) => statisticsExcerciseCardHtml(excercise)).join('')} 
                </div>
            </div>
        </div>
        <div id="modal-open-statistics-excercise"></div>
    `;
}