import { comboBoxRender } from '../views/comboBox.js'
import { paymentHtml } from '../components/paymentHtml.js'
import { getPaymentMethod, getStatistics, filterStudent, mapUsuarios, checkError, processPayment, renderPaymentStatementList, initPaymentStatementFilter } from '../controllers/paymentController.js'
import { getUserAll } from '../services/userApi.js'
import { inputSuggestion } from '../views/inputSuggestion.js'
import { restrictToDigits } from '../utils/inputCtrl.js'

/** render */
export function paymentRender() {
    const containerMain = document.getElementById("container-main");
    // transicion suave
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(async () => {
        const listUsers = await getUserAll();
        const listStudent = JSON.parse(filterStudent(listUsers));

        containerMain.innerHTML = await paymentHtml(listStudent);

        renderPaymentStatementList(listStudent);
        initPaymentStatementFilter();

        getStatistics();

        inputSuggestion('payment-new-student-name', 'Juan Peréz', mapUsuarios(listStudent));
        comboBoxRender('payment-new-method', getPaymentMethod());
        restrictToDigits('#id-payment-new-student-amount', 8);

        const comboContainer = document.querySelector("#payment-new-method .combobox");
        comboContainer.addEventListener("combo:change", (e) => {
            checkError(e);
        });

        const btn = document.querySelector(".button-small");
        btn.addEventListener("click", async (e) => {
            if (!checkError(e)) {
                await processPayment(listStudent);
            }
        });        

        // Apply input classes
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duration equal to the transition
}

document.addEventListener("DOMContentLoaded", () => {

});
