import { getUrlUserApi } from '../config/urlApi.js'
import { authHelper } from '../helpers/authHelper.js'

export async function loginUser(email, password) {
    try {
        const response = await fetch(getUrlUserApi() + '/api/Auth/login', {
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

        return true;
    } catch (err) {
        console.error("Error en login:", err.message);
        return false;
    }
}