import { dashboardHtml } from '../components/dashboardHtml.js'
import { getUserAll } from '../services/userApi.js';
import { planCreateRender } from './planCreate.js'; 
import { getAllAlumnoPlan } from '../services/asignacionApi.js';
import { getAllSesionesRealizadas } from '../services/asignacionApi.js';
import { getAllSesionesEntrenamiento } from '../services/planApi.js';


function dashboardButtonAddListener() {
    document.getElementById('quick-action-add-student').addEventListener('click', () => console.log('agregar nuevo alumno'));
    document.getElementById('quick-action-new-plan').addEventListener('click', () => planCreateRender());
    document.getElementById('quick-action-see-calendar').addEventListener('click', () => console.log('ver calendario'));
    document.getElementById('quick-action-add-payment').addEventListener('click', () => console.log('agregar nuevo pago'));
}

const cardActivity = [
    { name: "María González", activity: "se registró", time: "Hace 2 horas" },
    { name: "Juan Pérez", activity: "realizó un pago", time: "Hace 3 horas" },
    { name: "Lucas Martínez", activity: "completó una sesión", time: "Hace 5 horas" },
    { name: "Ana Silva", accactivityión: "se registró", time: "Hace 1 día" }
];

const cardNextSession = [
    { name: 'Carlos Ruiz', hour: '10:00', type: 'Fuerza Avanzada' },
    { name: 'Laura Díaz', hour: '14:00', type: 'Hipertrofia Inicial' },
    { name: 'Pedro Sánchez', hour: '16:30', type: 'CrossFit Básico' }
];


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

    const usuarios = await getUserAll();
    const planesAsignados = await getAllAlumnoPlan();
    const sesionesRealizadas = await getAllSesionesRealizadas();
    const sesionesEntrenamiento = await getAllSesionesEntrenamiento();


    const statsUser = porcentajeActivos(usuarios);
    const statsPlanes = porcentajeAsignados(planesAsignados);
    const statsSesiones = porcentajeSesionesRealizadas(sesionesRealizadas,sesionesEntrenamiento);

    cardInfo.push({number: statsUser.activos, percentage : statsUser.porcentaje});
    cardInfo.push({number: statsPlanes.asignados, percentage : statsPlanes.porcentaje})
    cardInfo.push({number: statsSesiones.realizadas, percentage : statsSesiones.porcentaje }) 
          
    containerMain.innerHTML = dashboardHtml(cardInfo, cardActivity, cardNextSession);
    
    dashboardButtonAddListener();
}
