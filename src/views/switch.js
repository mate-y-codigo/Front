import { switchHtml } from '../components/switchHtml.js'

function switchAddListener() {
    const switchButton = document.getElementById("switch-button");
    const switchCircle = document.getElementById("switch-circle");

    const switchButtonBg = document.querySelector('.switch button');
    let isOff = true;

    switchButton.addEventListener("click", () => {
        isOff = !isOff;

        if (isOff) {
            switchButtonBg.style.backgroundColor = 'var(--switch-off-bg)';
            switchCircle.style.transform = "translateX(0)";
        } else {
            switchButtonBg.style.backgroundColor = 'var(--switch-on-bg)';
            switchCircle.style.transform = "translateX(1.5rem)";
        }
    });
}


/** render switch */
export function switchRender(id, txt) {
    console.log(id);
    const switchBtn = document.getElementById(id);
    switchBtn.innerHTML = switchHtml(txt);

    switchAddListener();
}