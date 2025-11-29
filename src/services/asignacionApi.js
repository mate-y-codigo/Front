import { getUrlAsignacionApi } from "../config/urlApi.js";
import { authHelper } from "../helpers/authHelper.js";


export async function getAllAlumnoPlan(filter = {}) {
    try{
          const query = new URLSearchParams(filter).toString();
        
        const url = query ? `${getUrlAsignacionApi()}/api/AlumnoPlan?${query}`
        : `${getUrlAsignacionApi()}/api/AlumnoPlan`;

        const planes =  await authHelper.fetchWithAuth(url, { method: "GET" });

        const response = await planes.json();

        return response;
       
    }
   catch(err){
    console.error("Error accediendo a la api"+ err.message);
    return [];
   }
}


export async function getAllSesionesRealizadas(filter = {}) {
  try{
      const query = new URLSearchParams(filter).toString();

      const url = query ? `${getUrlAsignacionApi()}/api/SesionRealizada?${query}`
        : `${getUrlAsignacionApi()}/api/SesionRealizada`;

        const sesiones =  await authHelper.fetchWithAuth(url,{method:"GET"});

        const response = await sesiones.json();

        return response;
  }
  catch(err){
    console.error("Error accediendo a la api"+ err.message);
  return [];
  }

}


export async function getEventosCalendario(filter={}){
  try{
      const query = new URLSearchParams(filter).toString();

      const url = query ? `${getUrlAsignacionApi()}/api/EventoCalendario?${query}`
        : `${getUrlAsignacionApi()}/api/EventoCalendario`;

      const Eventos = await authHelper.fetchWithAuth(url,{method:"GET"});

      const response = await Eventos.json();

      return response;
  }
  catch(err){
    console.error("Error accediendo a la api"+ err.message);
    return [];
  }
}