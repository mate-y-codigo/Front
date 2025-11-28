import { getUrlAsignacionApi } from "../config/urlApi.js";
import { authHelper } from "../helpers/authHelper.js";


export async function getAllAlumnoPlan(filter = {}) {
    try{
          const query = new URLSearchParams(filter).toString();
        
        const url = query ? `${getUrlAsignacionApi()}/api/AlumnoPlan?${query}`
        : `${getUrlAsignacionApi()}/api/AlumnoPlan`;

        return await authHelper.fetchWithAuth(url, { method: "GET" });
       
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

        return await authHelper.fetchWithAuth(url,{method:"GET"});
  }
  catch(err){
    console.error("Error accediendo a la api"+ err.message);
  return [];
  }

}