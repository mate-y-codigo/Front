import { loginHtml } from '../components/loginHtml.js'
import {indexRender} from '../views/index.js'

function loginButtonAddListener() {
    document.getElementById('login-button').addEventListener('click', () => indexRender());
}

/** render index */
function loginRender() {
    const fitcode = document.getElementById("fitcode");
    fitcode.innerHTML = loginHtml();
    loginButtonAddListener();
}

window.onload = loginRender();