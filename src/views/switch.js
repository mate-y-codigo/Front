import { switchHtml } from '../components/switchHtml.js'

let isOn = false;

export function switchSetState(container, state) {
    const switchButtonBg = container.querySelector("button");
    const switchCircle = container.querySelector("#switch-circle");

    if (!switchButtonBg || !switchCircle) return;

    isOn = state;

    if (state) {
        switchButtonBg.style.backgroundColor = 'var(--switch-on-bg)';
        switchCircle.style.transform = "translateX(1.5rem)";
    } else {
        switchButtonBg.style.backgroundColor = 'var(--switch-off-bg)';
        switchCircle.style.transform = "translateX(0)";
    }

    container.dataset.isOn = (isOn).toString();
    container.dispatchEvent(new CustomEvent("switch:change", {
        detail: { isOn }
    }));
}

function switchAddListener(container) {
    const switchButton = container.querySelector("#switch-button");
    const switchCircle = container.querySelector("#switch-circle");
    const switchButtonBg = container.querySelector("button");

    switchButton.addEventListener("click", () => {
        isOn = !isOn;
        switchSetState(container, isOn);
    });
}

/** render switch */
export function switchRender(id, txt) {
    const switchBtn = document.getElementById(id);
    switchBtn.innerHTML = switchHtml(txt);

    const container = switchBtn.querySelector(".switch");
    switchAddListener(container);
}