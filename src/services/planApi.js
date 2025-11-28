import { getUrlPlanApi } from '../config/urlApi.js'

export async function getPlanAll() {
    try {
        const plans = await authHelper.fetchWithAuth(getUrlPlanApi()+ '/api/TrainingPlan'); 
        console.log(plans);
        return plans;
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
