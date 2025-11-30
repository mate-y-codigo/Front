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

export async function createUser(dto) {
  try {
    const res = await authHelper.fetchWithAuth(getUrlUserApi() + "/api/Usuarios",
      {
        method: "POST",
        body: JSON.stringify(dto),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      let errorText = "";
      try {
        errorText = await res.text();
      } catch {
        // ignore
      }
      console.error("Error HTTP createUser:", res.status, errorText);
      throw new Error("No se pudo crear el usuario");
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }

    return null;
  } catch (err) {
    console.error("Error accediendo a la API:", err.message);
    throw err;
  }
}

export async function updateUser(id, dto) {
  try {
    const res = await authHelper.fetchWithAuth(getUrlUserApi() + `/api/Usuarios/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      }
    );

    if (!res.ok) {
      let errorText = "";
      try {
        errorText = await res.text();
      } catch {
        // ignore
      }
      console.error("Error HTTP updateUser:", res.status, errorText);
      throw new Error("No se pudo actualizar el usuario");
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }

    return null;
  } catch (err) {
    console.error("Error accediendo a la API:", err.message);
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    const res = await authHelper.fetchWithAuth(getUrlUserApi() + `/api/Usuarios/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      let errorText = "";
      try {
        errorText = await res.text();
      } catch {
        // ignore
      }
      console.error("Error HTTP deleteUser:", res.status, errorText);
      throw new Error("No se pudo eliminar el usuario");
    }

    return true;
  } catch (err) {
    console.error("Error accediendo a la API:", err.message);
    throw err;
  }
}