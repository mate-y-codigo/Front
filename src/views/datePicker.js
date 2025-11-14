import { datePickerHtml, datePickerRangeHtml } from '../components/datePickerHtml.js'

function datePickerBulid() {
    document.querySelectorAll("[date-picker]").forEach(initDatePicker);

    function initDatePicker(wrapper) {
        console.log(wrapper);
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

function datePickerRangeBulid() {
    document.querySelectorAll("[date-picker-range]").forEach(initRangePicker);

    function initRangePicker(wrapper) {
        const inputStart = wrapper.querySelector(".input-start");
        const inputEnd = wrapper.querySelector(".input-end");
        const calendar = wrapper.querySelector(".calendar");
        const daysContainer = wrapper.querySelector(".days-month");
        const monthLabel = wrapper.querySelector(".month-label");
        const prevBtn = wrapper.querySelector(".prev-month");
        const nextBtn = wrapper.querySelector(".next-month");

        // Opcionales: rango permitido
        const minDate = null;           // new Date(2025, 0, 1)
        const maxDate = null;           // new Date(2025, 11, 31)

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

                // Deshabilitar por rango min/max
                const disabled =
                    (minDate && dateObj < minDate) ||
                    (maxDate && dateObj > maxDate);

                dayEl.textContent = d;
                dayEl.className =
                    "py-1 rounded cursor-pointer select-none text-sm transition";

                if (disabled) {
                    dayEl.classList.add("opacity-40", "cursor-not-allowed");
                } else {
                    dayEl.classList.add("day-of-month");
                }

                // Detectar selección
                if (startDate && dateObj.toDateString() === startDate?.toDateString()) {
                    dayEl.classList.add("day-of-month-start");
                }

                if (endDate && dateObj.toDateString() === endDate?.toDateString()) {
                    dayEl.classList.add("day-of-month-end");
                }

                // Rango visual intermedio
                if (
                    startDate && endDate &&
                    dateObj > startDate &&
                    dateObj < endDate
                ) {
                    dayEl.classList.add("day-range");
                }

                // Click
                if (!disabled) {
                    dayEl.addEventListener("click", () => {
                        if (selectingStart) {
                            startDate = dateObj;
                            endDate = null;
                            selectingStart = false;
                        } else {
                            if (dateObj < startDate) {
                                // Si la fecha fin es menor a la inicio → intercambia
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
                }

                daysContainer.appendChild(dayEl);
            }
        }

        // ----- Actualizar inputs -----
        function updateInputs() {
            const format = (d) =>
                `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

            inputStart.value = startDate ? format(startDate) : "";
            inputEnd.value = endDate ? format(endDate) : "";
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

        // Cerrar si se hace click afuera
        document.addEventListener("click", (e) => {
            if (!calendar.contains(e.target) && !wrapper.contains(e.target)) {
                closeCalendar();
            }
        });
    }
}

/** datePicker render */
export function datePickerRender(id) {
    const datePicker = document.getElementById(id);
    datePicker.innerHTML = datePickerHtml();
    datePickerBulid();
}

export function datePickerRangeRender(id){
    const datePickerRange = document.getElementById(id);
    datePickerRange.innerHTML = datePickerRangeHtml();
    datePickerRangeBulid();
}