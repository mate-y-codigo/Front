import { setPaymentNew, setPaymentConfirm, getPaymentByUserId, getPaymentByFilter } from '../services/paymentApi.js'
import { paymentStatementHtml } from '../components/paymentHtml.js'
import { authHelper } from '../helpers/authHelper.js'
import { AppModal } from '../views/modalNotice.js'
import { showToast } from '../views/toast.js'

let infoPayment = {
    alumno_Id: '',
    entrenador_Id: '',
    monto: 0,
    moneda: "string",
    metodo: "string",
    notas: "string"
};

export function getPaymentMethod() {
    return [
        { id: 0, name: 'Efectivo' },
        { id: 1, name: 'Tarjeta' },
        { id: 2, name: 'Transferencia' }
    ];
}

export function filterStudent(data) {
    const alumnos = data.filter(item => item.rol === "Alumno");
    return JSON.stringify(alumnos, null, 2);
}


export function calculateTotals(payments) {
    return payments.reduce(
        (acc, payments) => {
            const monto = Number(payments.monto) || 0;

            acc.total += monto;

            switch (payments.metodo.toLowerCase()) {
                case "efectivo":
                    acc.efectivo += monto;
                    break;

                case "transferencia":
                    acc.transferencia += monto;
                    break;

                case "tarjeta":
                case "tarjeta de crédito":
                case "tarjeta de débito":
                case "tarjeta de crédito o débito":
                    acc.tarjeta += monto;
                    break;
            }

            return acc;
        },
        {
            total: 0,
            efectivo: 0,
            transferencia: 0,
            tarjeta: 0
        }
    );
}

export async function getStatistics() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const token = authHelper.getAccessToken();
    const coachId = authHelper.parseTokens(token).sub;

    const result = await getPaymentByFilter(`${today.getMonth() + 1}-01-${today.getFullYear()}`, `${today.getMonth() + 1}-${daysInMonth}-${today.getFullYear()}`, coachId);

    if(result.success){
        const statistics = calculateTotals(result.data);

        document.querySelector('#payment-card-info-total').textContent = '$' + statistics.total;
        document.querySelector('#payment-card-info-cash').textContent = '$' + statistics.efectivo;
        document.querySelector('#payment-card-info-card').textContent = '$' + statistics.tarjeta;
        document.querySelector('#payment-card-info-transfer').textContent = '$' + statistics.transferencia;

       
    }
}

export function mapUsuarios(lista) {
    return lista.map(u => ({
        id: u.id,
        name: `${u.nombre ?? ""} ${u.apellido ?? ""}`.trim()
    }));
}

export function validatePayment({ student, studentId, amount, method }) {
    const errors = {};

    if (!studentId || studentId.trim() === "") {
        errors.studentId = "El alumno ingresado no existe.";
    }

    if (!student || student.trim() === "") {
        errors.student = "El alumno es obligatorio.";
    }

    if (!amount || amount.trim() === "") {
        errors.amount = "El monto debe ser mayor a cero.";
    }

    if (!method || method.trim() === "") {
        errors.method = "Debe seleccionar un medio de pago.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export function getPaymentFormValues() {
    return {
        student: document.querySelector("#payment-new-student-name-search").value,
        studentId: document.querySelector("#payment-new-student-name").dataset.id,
        amount: document.querySelector("#payment-new-student-amount .input").value,
        method: document.querySelector("#payment-new-method .combobox").dataset.selectedName || ""
    };
}

export function clearErrors() {
    document.querySelectorAll(".payment-error").forEach(e => e.remove());
    document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
}

export function showErrors(errors) {
    if (errors.student) {
        markError("#payment-new-student-name", errors.student);
    }
    else if (errors.studentId) {
        markError("#payment-new-student-name", errors.studentId);
    }
    if (errors.amount) {
        markError("#payment-new-student-amount", errors.amount);
    }
    if (errors.method) {
        markError("#payment-new-method", errors.method);
    }
}

function markError(selector, message) {
    const container = document.querySelector(selector);
    const input = container.querySelector("input, button");

    if (input) input.classList.add("input-error");

    const err = document.createElement("p");
    err.classList.add("payment-error");
    err.textContent = message;
    err.style.color = "red";
    err.style.fontSize = "0.8rem";
    err.style.marginTop = "4px";

    container.appendChild(err);
}

export function checkError(e) {
    const currentType = e.detail.name;
    clearErrors();

    const data = getPaymentFormValues();

    const { isValid, errors } = validatePayment(data);

    if (!isValid) {
        showErrors(errors);
        return true;
    }
    return false;
}

export async function processPayment(listStudent) {
    const studentId = document.querySelector("#payment-new-student-name").dataset.id;
    const amount = document.querySelector("#payment-new-student-amount .input").value;
    const method = document.querySelector("#payment-new-method .combobox").dataset.selectedName;
    const token = authHelper.getAccessToken();
    const coachId = authHelper.parseTokens(token).sub;

    infoPayment.alumno_Id = studentId;
    infoPayment.entrenador_Id = coachId;
    infoPayment.metodo = method;
    infoPayment.moneda = 'Pesos';
    infoPayment.monto = Number(amount);
    infoPayment.notas = '';

    const answer = await setPaymentNew(infoPayment);
    if (!answer.success) {

        AppModal.open({
            iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
            titleText: "Ocurrio un error",
            messageText: answer.errors
        });

        return;
    }

    const answerConfirm = await setPaymentConfirm(answer.data.id, 30);

    if (!answerConfirm.success) {

        AppModal.open({
            iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
            titleText: "Ocurrio un error",
            messageText: answer.errors
        });

        return;
    }

    showToast('Pago guardado correctamente');
    resetPaymentForm();
    renderPaymentStatementList(listStudent);
    initPaymentStatementFilter();
    getStatistics();
}

function resetCombobox(containerId) {
    const combo = document.querySelector(`#${containerId} .combobox`);
    const selectedText = document.querySelector(`#${containerId} #selected-option`);

    if (!combo || !selectedText) return;

    combo.dataset.selectedId = "";
    combo.dataset.selectedName = "";

    selectedText.textContent = "Seleccione una opción...";
}

export function resetPaymentForm() {

    document.getElementById("payment-new-student-name-search").value = "";
    const hiddenId = document.getElementById("payment-new-student-id");
    document.querySelector("#payment-new-student-amount .input").value = "";
    resetCombobox('payment-new-method');
}

export function renderPaymentStatementList(students) {
    const container = document.getElementById("payment-card-student-statement-list");
    if (!container) return;

    container.innerHTML = "";

    // Si la lista está vacía
    if (!students || students.length === 0) {
        container.innerHTML = `<p class="text-gray-500">No hay pagos registrados.</p>`;
        return;
    }

    // Construir HTML dinámicamente
    let html = "";

    students.forEach(async (student) => {
        const result = await getPaymentByUserId(student.id);
        let status = false;

        if (!result.success) {
            const dataEmpty = {
                monto: 0,
                metodo: '------',
                creado_En: null,
                cobertura_Inicio: null,
                cobertura_Fin: null,
            };

            html += paymentStatementHtml(student, dataEmpty, status);
        }
        else {
            const dateCoverage = new Date(result.data.cobertura_Fin);
            const today = new Date();

            if (dateCoverage.getTime() > today.getTime())
                status = true;

            html += paymentStatementHtml(student, result.data, status);
        }
        container.innerHTML = html;
    });
}

export function initPaymentStatementFilter() {
    const input = document.getElementById("payment-student-filter");
    const chkOk = document.getElementById("payment-card-student-filter-ok");
    const chkDebt = document.getElementById("payment-card-student-filter-debt");
    const list = document.getElementById("payment-card-student-statement-list");

    if (!input || !chkOk || !chkDebt || !list) return;

    function applyFilters() {
        const textFilter = input.value.toLowerCase().trim();
        const statusOk = chkOk.checked;
        const statusDebt = chkDebt.checked;

        const items = list.querySelectorAll(".payment-card-student");

        items.forEach(item => {
            const name = item.querySelector(".payment-card-student-name")?.textContent.toLowerCase() || "";
            const hasOk = item.querySelector(".payment-card-student-status-ok") !== null;
            const hasDebt = item.querySelector(".payment-card-student-status-debt") !== null;

            let matchesText = name.includes(textFilter);
            let matchesStatus = true;

            // Filtrado por estado
            if (statusOk && !hasOk) matchesStatus = false;
            if (statusDebt && !hasDebt) matchesStatus = false;

            // Si ningún checkbox está activo → no filtrar por estado
            if (!statusOk && !statusDebt) matchesStatus = true;

            // Mostrar / ocultar
            if (matchesText && matchesStatus) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    }

    // Eventos
    input.addEventListener("input", applyFilters);
    chkOk.addEventListener("change", applyFilters);
    chkDebt.addEventListener("change", applyFilters);
}


