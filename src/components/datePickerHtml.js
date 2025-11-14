export function datePickerHtml(){
    return `
        <div class="relative w-full" date-picker>
            <input id="input-date" type="text" readonly placeholder="Seleccionar fecha..." class="input input-date">
            <div id="calendar" class="calendar hidden">                    
                <div class="calendar-header flex items-center justify-between px-2 py-2 border-b">
                    <button id="prev-month" class="prev-month flex items-center"><span class="material-symbols-outlined">chevron_backward</span></button>
                    <div id="month-label" class="month-label"></div>
                    <button id="next-month" class="next-month flex items-center"><span class="material-symbols-outlined">chevron_forward</span></button>
                </div>

                <div class="days-week">
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>

                <div id="days-month" class="days-month"></div>
            </div>
        </div>
    `;
}

export function datePickerRangeHtml(){
    return `
        <div class="relative date-range-picker w-full flex flex-row gap-6" date-picker-range>
            <input type="text" class="input-start input" placeholder="Fecha inicio" readonly>
            <input type="text" class="input-end input" placeholder="Fecha fin" readonly>
<div class="mt-10">
            <div class="calendar hidden">
                <div class="calendar-header flex items-center justify-between px-2 py-2 border-b">
                    <button class="prev-month flex items-center"><span class="material-symbols-outlined">chevron_backward</span></button>
                    <span class="month-label font-semibold"></span>
                    <button class="next-month flex items-center"><span class="material-symbols-outlined">chevron_forward</span></button>
                </div>

                <div class="days-week">
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>

                <div class="days-month"></div>
            </div>
            </div>
        </div>
    `;
}

/**
<div class="relative w-full flex flex-row gap-6" date-picker-range>
            <input type="text" class="input input-start" placeholder="Fecha inicio" readonly>
            <input type="text" class="input input-end" placeholder="Fecha fin" readonly>

            <div class="calendar hidden">                    
                <div class="calendar-header flex items-center justify-between px-2 py-2 border-b">
                    <button class="prev-month flex items-center"><span class="material-symbols-outlined">chevron_backward</span></button>
                    <div id="month-label" class="month-label"></div>
                    <button class="next-month flex items-center"><span class="material-symbols-outlined">chevron_forward</span></button>
                </div>

                <div class="days-week">
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>

                <div class="days-month"></div>
            </div>
        </div>
 */
