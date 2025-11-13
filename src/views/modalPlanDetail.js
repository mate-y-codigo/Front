import { modalPlanDetailHtml } from '../components/modalPlanDetailHtml.js'

function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector("span");

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        icon.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    }
}

/** render */
export function modalPlansDetailRender(plan) {
    const modalPlanDetail = document.getElementById("modal-open-plan-detail");
    modalPlanDetail.innerHTML = modalPlanDetailHtml(plan);

    window.toggleAccordion = toggleAccordion;
}