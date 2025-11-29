import { loginHtml } from '../components/loginHtml.js'
import { indexRender } from '../views/index.js'
import { authHelper } from "../helpers/authHelper.js";
import { validationHelper } from "../helpers/validationHelper.js";

function showLoginError(message) {
    const errorDiv = document.getElementById("login-error");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

function clearLoginError() {
    const errorDiv = document.getElementById("login-error");
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
}

async function login(email, password) {
    try {
        const response = await fetch("http://localhost:5099/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.warn("Credenciales inválidas (401)");
                throw new Error("Usuario o contraseña incorrectos");
            } else {
                console.error(`Error HTTP ${response.status}`);
                throw new Error("Error inesperado al iniciar sesión");
            }
        }

        const data = await response.json();
        authHelper.setTokens(data.token);
        indexRender();
    } catch (err) {
        console.error("Error en login:", err.message);
        showLoginError("Email o contraseña incorrectos.");
    }
}

/** inicia el login en la pagina */
function loginButtonAddListener() {
    document.getElementById('login-button').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        login(email, pass);
    });
}

/** verificar si hay una sesion activa y redirigir al dashboard al pulsar F5 o ingresar a la pagina */
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000;
        return Date.now() >= exp;
    } catch {
        return true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem("access_token");

    if (token && !isTokenExpired(token)) {
        // Ya está logueado => redirigir al dashboard
        indexRender();
    }
});

/** cargar el tema que se selecciono */
function themeLoad() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/** habilita el boton si hay texto en los inputs */
function loginBtnCtrl() {
    const emailInput = document.getElementById("login-email");
    const passInput = document.getElementById("login-password");
    const loginButton = document.getElementById("login-button");

    function validateForm() {
        let valid = true;

        if (!validationHelper.isValidEmail(emailInput.value)) {
            validationHelper.showError("login-email", "Email inválido");
            valid = false;
        } else {
            validationHelper.clearError("login-email");
        }

        if (!validationHelper.isValidPassword(passInput.value, 5)) {
            validationHelper.showError("login-password", "La contraseña debe tener al menos 5 caracteres");
            valid = false;
        } else {
            validationHelper.clearError("login-password");
        }

        loginButton.disabled = !valid;
    }

    // Escuchar cambios en los inputs
    emailInput.addEventListener("input", validateForm);
    passInput.addEventListener("input", validateForm);

    // Capturar Enter
    [emailInput, passInput].forEach(input => {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !loginButton.disabled) {
                e.preventDefault();
                loginButton.click();
            }
        });
    });
}


/** render index */
export function loginRender() {
    const fitcode = document.getElementById("fitcode");
    fitcode.innerHTML = loginHtml();
    loginButtonAddListener();
    clearLoginError();
    themeLoad();
    loginBtnCtrl();
}

window.onload = loginRender();
