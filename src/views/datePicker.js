import { datePickerHtml, datePickerRangeHtml } from '../components/datePickerHtml.js'

function datePickerBulid() {
    document.querySelectorAll("[date-picker]").forEach(initDatePicker);

    function initDatePicker(wrapper) {
        const input = wrapper.querySelector(".input-date");
        const calendar = wrapper.querySelector(".calendar");
        const daysContainer = wrapper.querySelector(".days-month");
        const monthLabel = wrapper.querySelector(".month-label");
        const prevBtn = wrapper.querySelector(".prev-month");
        const nextBtn = wrapper.querySelector(".next-month");

        let currentDate = new Date();

        // Abrir / cerrar
        const openCalendar = () => {
            calendar.classList.remove("hidden", "fade-out");
            calendar.classList.add("fade-in");
        };

        const closeCalendar = () => {
            calendar.classList.remove("fade-in");
            calendar.classList.add("fade-out");
            setTimeout(() => calendar.classList.add("hidden"), 150);
        };

        // Render calendario
        function renderCalendar() {
            daysContainer.innerHTML = "";

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startIndex = (firstDay.getDay() + 6) % 7;

            monthLabel.textContent = currentDate.toLocaleString("es-ES", {
                month: "long",
                year: "numeric"
            });

            for (let i = 0; i < startIndex; i++) {
                const empty = document.createElement("div");
                daysContainer.appendChild(empty);
            }

            for (let d = 1; d <= lastDay.getDate(); d++) {
                const dayEl = document.createElement("div");
                dayEl.textContent = d;
                dayEl.className =
                    "day-of-month py-2 cursor-pointer rounded select-none";

                dayEl.addEventListener("click", () => {
                    input.value = `${d}/${month + 1}/${year}`;
                    closeCalendar();
                });

                daysContainer.appendChild(dayEl);
            }
        }

        // Navegación
        prevBtn.onclick = () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        };

        nextBtn.onclick = () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        };

        // Abrir
        input.addEventListener("click", (e) => {
            e.stopPropagation();
            openCalendar();
            renderCalendar();
        });

        // Cerrar al hacer clic afuera
        document.addEventListener("click", (e) => {
            if (!calendar.contains(e.target) && e.target !== input) {
                closeCalendar();
            }
        });
    }
}

function initSpecificRangePicker(wrapper, onChangeCallback = null) {    
    const inputStart = wrapper.querySelector(".input-start");
    const inputEnd = wrapper.querySelector(".input-end");
    const calendar = wrapper.querySelector(".calendar");
    const daysContainer = wrapper.querySelector(".days-month");
    const monthLabel = wrapper.querySelector(".month-label");
    const prevBtn = wrapper.querySelector(".prev-month");
    const nextBtn = wrapper.querySelector(".next-month");

    let currentDate = new Date();
    let startDate = null;
    let endDate = null;
    let selectingStart = true;

    // ----- Abrir y cerrar -----
    const openCalendar = () => {
        calendar.classList.remove("hidden", "fade-out");
        calendar.classList.add("fade-in");
    };

    const closeCalendar = () => {
        calendar.classList.remove("fade-in");
        calendar.classList.add("fade-out");
        setTimeout(() => calendar.classList.add("hidden"), 150);
    };

    // ----- Render del calendario -----
    function renderCalendar() {
        daysContainer.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startIndex = (firstDay.getDay() + 6) % 7;

        monthLabel.textContent = currentDate.toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
        });

        // Espacios vacíos
        for (let i = 0; i < startIndex; i++)
            daysContainer.appendChild(document.createElement("div"));

        // Crear días
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const dateObj = new Date(year, month, d);
            const dayEl = document.createElement("div");

            dayEl.textContent = d;
            dayEl.className = "py-1 rounded cursor-pointer select-none text-sm transition day-of-month";

            // Detectar selección
            if (startDate && dateObj.toDateString() === startDate?.toDateString()) {
                dayEl.classList.add("day-of-month-start");
            }

            if (endDate && dateObj.toDateString() === endDate?.toDateString()) {
                dayEl.classList.add("day-of-month-end");
            }

            // Rango visual intermedio
            if (startDate && endDate && dateObj > startDate && dateObj < endDate) {
                dayEl.classList.add("day-range");
            }

            // Click
            dayEl.addEventListener("click", () => {
                
                if (selectingStart) {
                    startDate = dateObj;
                    endDate = null;
                    selectingStart = false;
                } else {
                    if (dateObj < startDate) {
                        endDate = startDate;
                        startDate = dateObj;
                    } else {
                        endDate = dateObj;
                    }
                    selectingStart = true;
                    closeCalendar();
                }

                updateInputs();
                renderCalendar();
            });

            daysContainer.appendChild(dayEl);
        }
    }

    function updateInputs() {
        const format = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

        const startValue = startDate ? format(startDate) : "";
        const endValue = endDate ? format(endDate) : "";

        inputStart.value = startValue;
        inputEnd.value = endValue;
        
        if (onChangeCallback) {
            onChangeCallback(startValue, endValue);
        }
    }

    // Navegación meses
    prevBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    };

    nextBtn.onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    };

    // Abrir
    inputStart.addEventListener("click", (e) => {
        selectingStart = true;
        e.stopPropagation();
        openCalendar();
        renderCalendar();
    });

    inputEnd.addEventListener("click", (e) => {
        selectingStart = false;
        e.stopPropagation();
        openCalendar();
        renderCalendar();
    });

    inputStart.addEventListener("change", () => {
        if (onChangeCallback) {
            onChangeCallback(inputStart.value, inputEnd.value);
        }
    });

    inputEnd.addEventListener("change", () => {
        if (onChangeCallback) {
            onChangeCallback(inputStart.value, inputEnd.value);
        }
    });

    document.addEventListener("click", (e) => {
        if (!calendar.contains(e.target) && !wrapper.contains(e.target)) {
            closeCalendar();
        }
    });

    renderCalendar();
}

// function datePickerRangeBulid() {
//     document.querySelectorAll("[date-picker-range]").forEach(initRangePicker);

//     function initRangePicker(wrapper) {
//         initSpecificRangePicker(wrapper);
//     }
// }

/** datePicker render */
export function datePickerRender(id) {
    const datePicker = document.getElementById(id);
    datePicker.innerHTML = datePickerHtml();
    datePickerBulid();
}

/** datePickerRange render CON CALLBACK */
export function datePickerRangeRender(id, onChangeCallback = null){
    const datePickerRange = document.getElementById(id);
    if (!datePickerRange) {
        console.error('No se encontró el date picker range con id:', id);
        return;
    }
    
    datePickerRange.innerHTML = datePickerRangeHtml();
        
    if (onChangeCallback) {
        initSpecificRangePicker(datePickerRange, onChangeCallback);
    } else {
        initSpecificRangePicker(datePickerRange);
    }
}