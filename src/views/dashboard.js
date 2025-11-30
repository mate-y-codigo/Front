import { dashboardHtml } from '../components/dashboardHtml.js'
import { getUserAll } from '../services/userApi.js';
import { planCreateRender } from './planCreate.js'; 
import { getAllAlumnoPlan } from '../services/asignacionApi.js';
import { getAllSesionesRealizadas } from '../services/asignacionApi.js';
import { getAllSesionesEntrenamiento } from '../services/planApi.js';
import { exerciseCreateRender } from './exerciseCreate.js';
import { getEventosCalendario } from '../services/asignacionApi.js';
import { userNewRender } from './userNew.js';

function dashboardButtonAddListener() {
    document.getElementById('quick-action-add-student').addEventListener('click', () => userNewRender());
    document.getElementById('quick-action-new-plan').addEventListener('click', () => planCreateRender());
    document.getElementById('quick-action-see-calendar').addEventListener('click', () => console.log('ver calendario'));
    document.getElementById('quick-action-add-exercise').addEventListener('click', () => exerciseCreateRender());
}

const cardActivity = [
    { name: "María González", activity: "se registró", time: "Hace 2 horas" },
    { name: "Juan Pérez", activity: "realizó un pago", time: "Hace 3 horas" },
    { name: "Lucas Martínez", activity: "completó una sesión", time: "Hace 5 horas" },
    { name: "Ana Silva", accactivityión: "se registró", time: "Hace 1 día" }
];



const hoy = new Date();

const startOfDay = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);

const endOfDay = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);


function formatFechaHora(isoString) {
    const d = new Date(isoString);

    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const año = d.getFullYear();
    const horas = String(d.getHours()).padStart(2, "0");
    const minutos = String(d.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}



function porcentajeActivos(usuarios){
 const activos = usuarios.filter(u => u.activo && u.rolId === 3 ).length;
 const total = usuarios.filter(u => u.rolId === 3).length;

    let porcentaje = ((activos/total) * 100).toFixed(2);

    return {activos,porcentaje};
}

function porcentajeAsignados(planes){   
    const asignados = planes.filter(p => p.estado === 1 ).length;
    const total = planes.length;

    let porcentaje = ((asignados/total)*100).toFixed(2);

    return {asignados,porcentaje};

}

function porcentajeSesionesRealizadas(sesionesRealizadas,sesionesEntrenamiento){
    

    const realizadas = sesionesRealizadas.length;
    const totalSesiones = sesionesEntrenamiento.length;

    let porcentaje = ((realizadas/totalSesiones)*100).toFixed(2);

    return {realizadas,porcentaje};
}

/** render */
export async function dashboardRender() {
    const containerMain = document.getElementById("container-main");
    
    const cardInfo = [];
    const cardNextSession = [];

    const usuarios = await getUserAll();
    const planesAsignados = await getAllAlumnoPlan();
    const sesionesRealizadas = await getAllSesionesRealizadas();
    const sesionesEntrenamiento = await getAllSesionesEntrenamiento();
    const EventosCalendarios = (await getEventosCalendario({
    Estado: 1,
    Desde: startOfDay.toISOString(),
    Hasta: endOfDay.toISOString()
    })) || []; // si no trae nada devuelve vacio para renderice

   
    cardNextSession.length = 0; 

    EventosCalendarios.slice(0, 3).forEach(evento => {
    const hora = formatFechaHora(evento.fechaProgramada);
    cardNextSession.push({
        name: evento.nombreAlumno,
        hour: hora,
        type: evento.nombreSesion
    });
});

    const statsUser = porcentajeActivos(usuarios);
    const statsPlanes = porcentajeAsignados(planesAsignados);
    const statsSesiones = porcentajeSesionesRealizadas(sesionesRealizadas,sesionesEntrenamiento);

    cardInfo.push({number: statsUser.activos, percentage : statsUser.porcentaje});
    cardInfo.push({number: statsPlanes.asignados, percentage : statsPlanes.porcentaje})
    cardInfo.push({number: statsSesiones.realizadas, percentage : statsSesiones.porcentaje }) 
          
    containerMain.innerHTML = dashboardHtml(cardInfo, cardActivity, cardNextSession);
    
    dashboardButtonAddListener();
}
