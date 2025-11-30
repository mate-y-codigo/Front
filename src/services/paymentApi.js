import { getUrlPagosApi } from '../config/urlApi.js'
import { authHelper } from '../helpers/authHelper.js'

export async function getUserAll() {
    try {
        const usuarios = await authHelper.fetchWithAuth(getUrlUserApi() + "/api/Usuarios");

        const response = await usuarios.json();

        return response;
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return [];
    }
}

export async function getPaymentByUserId(id) {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPagosApi() + `/api/payment/student/${id}`);

        //const response = await usuarios.json();

        // body como texto
        const text = await response.text();
        let body = null;

        // Intentar parsear JSON
        try {
            body = text ? JSON.parse(text) : null;
        } catch {
            body = text; // si no es JSON, se deja el texto crudo
        }

        // Si hay error HTTP
        if (!response.ok) {
            let errors = [];

            // API típica ASP.NET: { message: "..."}
            if (body?.message) {
                errors.push(body.message);
            }

            // API con lista de errores: { errors: [...] }
            if (Array.isArray(body?.errors)) {
                errors = errors.concat(body.errors);
            }

            if (errors.length === 0) {
                errors.push(`Error ${response.status}: ${response.statusText}`);
            }

            return {
                success: false,
                errors
            };
        }

        // Éxito ✔
        return {
            success: true,
            data: body
        };


        return response;
    } catch (err) {
         console.error("Error accediendo a la API:", err);
        return {
            success: false,
            errors: ["No se pudo conectar con la API", err.message]
        };
    }
}

export async function getPaymentByFilter(from, to, coachId) {
    const params = new URLSearchParams();        
    params.append("Desde", from);
    params.append("Hasta", to);
    params.append("Entrenador_Id", coachId);
    
    try {
        const response = await authHelper.fetchWithAuth(getUrlPagosApi() + `/api/payment?${params.toString()}`);

        // body como texto
        const text = await response.text();
        let body = null;

        // Intentar parsear JSON
        try {
            body = text ? JSON.parse(text) : null;
        } catch {
            body = text; // si no es JSON, se deja el texto crudo
        }

        // Si hay error HTTP
        if (!response.ok) {
            let errors = [];

            // API típica ASP.NET: { message: "..."}
            if (body?.message) {
                errors.push(body.message);
            }

            // API con lista de errores: { errors: [...] }
            if (Array.isArray(body?.errors)) {
                errors = errors.concat(body.errors);
            }

            if (errors.length === 0) {
                errors.push(`Error ${response.status}: ${response.statusText}`);
            }

            return {
                success: false,
                errors
            };
        }

        // Éxito ✔
        return {
            success: true,
            data: body
        };


        return response;
    } catch (err) {
         console.error("Error accediendo a la API:", err);
        return {
            success: false,
            errors: ["No se pudo conectar con la API", err.message]
        };
    }
}

export async function setPaymentNew(payment) {
    try {
        // Ahora fetchWithAuth devuelve un Response COMPLETO
        const response = await authHelper.fetchWithAuth(getUrlPagosApi() + '/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });

        // body como texto
        const text = await response.text();
        let body = null;

        // Intentar parsear JSON
        try {
            body = text ? JSON.parse(text) : null;
        } catch {
            body = text; // si no es JSON, se deja el texto crudo
        }

        // Si hay error HTTP
        if (!response.ok) {
            let errors = [];

            // API típica ASP.NET: { message: "..."}
            if (body?.message) {
                errors.push(body.message);
            }

            // API con lista de errores: { errors: [...] }
            if (Array.isArray(body?.errors)) {
                errors = errors.concat(body.errors);
            }

            if (errors.length === 0) {
                errors.push(`Error ${response.status}: ${response.statusText}`);
            }

            return {
                success: false,
                errors
            };
        }

        // Éxito ✔
        return {
            success: true,
            data: body
        };

    } catch (err) {
        console.error("Error accediendo a la API:", err);
        return {
            success: false,
            errors: ["No se pudo conectar con la API", err.message]
        };
    }
}

export async function setPaymentConfirm(id, days) {
    try {
        const params = new URLSearchParams();
        params.append("dias", days);

        // Ahora fetchWithAuth devuelve un Response COMPLETO
        const response = await authHelper.fetchWithAuth(getUrlPagosApi() + `/api/payment/confirm/${id}?${params.toString()}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });

        // body como texto
        const text = await response.text();
        let body = null;

        // Intentar parsear JSON
        try {
            body = text ? JSON.parse(text) : null;
        } catch {
            body = text; // si no es JSON, se deja el texto crudo
        }

        // Si hay error HTTP
        if (!response.ok) {
            let errors = [];

            // API típica ASP.NET: { message: "..."}
            if (body?.message) {
                errors.push(body.message);
            }

            // API con lista de errores: { errors: [...] }
            if (Array.isArray(body?.errors)) {
                errors = errors.concat(body.errors);
            }

            if (errors.length === 0) {
                errors.push(`Error ${response.status}: ${response.statusText}`);
            }

            return {
                success: false,
                errors
            };
        }

        // Éxito ✔
        return {
            success: true,
            data: body
        };

    } catch (err) {
        console.error("Error accediendo a la API:", err);
        return {
            success: false,
            errors: ["No se pudo conectar con la API", err.message]
        };
    }
}