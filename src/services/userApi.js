async function getUserAll() {
    try {
        const usuarios = await authHelper.fetchWithAuth("https://localhost:7211/api/Usuarios"); console.log(usuarios);
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
    }
}

/*
// ID que quieres consultar
const userId = "9a3ffd2c-1384-4574-b0ec-0b18e4c1d0be";

// Llamada
getUsuarioById(userId);

*/
async function getUserById(id) {
    try {
        const usuario = await authHelper.fetchWithAuth(`https://localhost:7211/api/Usuarios/${id}`);
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
async function getUserByFilter(filter) {
    try {
        const usuarios = await authHelper.fetchWithAuth("https://localhost:7211/api/Usuarios/search", {
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
