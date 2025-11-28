import { getUrlPlanApi } from '../config/urlApi.js'
import { authHelper } from '../helpers/authHelper.js'

export async function getPlanAll() {
    try {
        const planes = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/TrainingPlan`);

        const response = await planes.json();

        return response;

    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return [];
    }
}

export async function getAllSesionesEntrenamiento() {
    try{
        const sesiones = await fetch(getUrlPlanApi()+'/api/TrainingSession');
        
        var data = await sesiones.json();

        return data;
    }
    catch(err){
       console.error("Error accediendo a la API:", err.message);
       return []; 
    }
}

export async function getPlanActive() {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/TrainingPlan?Active=true`);
        return response.json();
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
    }
}

export async function getPlanByFilter(name, type) {
    try {
        const params = new URLSearchParams();

        if (name?.length) params.append("Name", name);
        if (type != null) params.append("IsTemplate", type);
        params.append("Active", true);
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/TrainingPlan?${params.toString()}`);
        return response.json();
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
    }
}

export async function getPlanTemplateAll() {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/TrainingPlan?IsTemplate=true`);
        return response.json();
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return null;
    }
}

export async function getPlanTemplateById(id) {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/TrainingPlan/${id}`);
        return response.json();
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return null;
    }
}

export async function getExcerciseActiveAll() {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + `/api/Exercise?Activo=true`);
        return response.json();
    } catch (err) {
        console.error("Error accediendo a la API:", err.message);
        return null;
    }
}


/*export async function setPlanNew(plan) {
    try {
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + '/api/TrainingPlan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plan)
        });

        const text = await response.text(); // capturamos SIEMPRE el body
        let body = null;

        try {
            body = text ? JSON.parse(text) : null;
        } catch { }// no es JSON, se deja como texto 

        if (!response.ok) {

            let errors = [];

            if (body?.message) {
                errors.push(body.message);
            }

            if (errors.length === 0) {
                errors.push("Error desconocido en la API");
            }

            return {
                success: false,
                errors
            };
        }

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
}*/

export async function setPlanNew(plan) {
    try {
        // Ahora fetchWithAuth devuelve un Response COMPLETO
        const response = await authHelper.fetchWithAuth(getUrlPlanApi() + '/api/TrainingPlan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plan)
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

