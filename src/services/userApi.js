import { getUrlUserApi } from "../config/urlApi.js";
import { authHelper } from "../helpers/authHelper.js";


export async function getUserAll() {
    try {
        const usuarios = await authHelper.fetchWithAuth( getUrlUserApi() + "/api/Usuarios");
        
        const response = await usuarios.json();

        return response;
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return[];
    }
}

/*
// ID que quieres consultar
const userId = "9a3ffd2c-1384-4574-b0ec-0b18e4c1d0be";

// Llamada
getUsuarioById(userId);

*/
export async function getUserById(id) {
    try {
        const usuario = await authHelper.fetchWithAuth(getUrlUserApi() + `/api/Usuarios/${id}`);
        console.log(usuario);
        return usuario;
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
    }
}

/*
Ejemplo:
    {
    "nombre": "Juan",
    "activo": true
    }
 */
export async function getUserByFilter(filter) {
    try {
        const usuarios = await authHelper.fetchWithAuth( getUrlUserApi() + '/api/Usuarios/search', {
            method: "POST",
            body: JSON.stringify(filter),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(usuarios);
        return usuarios;
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
    }
}
