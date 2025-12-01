import { dashboardHtml } from '../components/dashboardHtml.js'
import { getUserAll } from '../services/userApi.js';
import { planCreateRender } from './planCreate.js'; 
import { getAllAlumnoPlan } from '../services/asignacionApi.js';
import { getAllSesionesRealizadas } from '../services/asignacionApi.js';
import { getAllSesionesEntrenamiento } from '../services/planApi.js';
import { exerciseCreateRender } from './exerciseCreate.js';
import { getEventosCalendario } from '../services/asignacionApi.js';
import { userNewRender } from './userNew.js';
import { paymentRender } from './payment.js';
import { calculateTotals } from '../controllers/paymentController.js';
import { authHelper } from '../helpers/authHelper.js';
import { getPaymentByFilter } from '../services/paymentApi.js';


function dashboardButtonAddListener() {
    document.getElementById('quick-action-add-student').addEventListener('click', () => userNewRender());
    document.getElementById('quick-action-new-plan').addEventListener('click', () => planCreateRender());
    document.getElementById('quick-action-see-calendar').addEventListener('click', () => console.log('ver calendario'));
    document.getElementById('quick-action-add-exercise').addEventListener('click', () => exerciseCreateRender());
    document.getElementById('quick-action-add-payment').addEventListener('click', () => paymentRender());
}



 async function getStatisticsA() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const token = authHelper.getAccessToken();
    const coachId = authHelper.parseTokens(token).sub;

    const result = await getPaymentByFilter(`${today.getMonth() + 1}-29-${today.getFullYear()}`, `${today.getMonth() + 1}-${daysInMonth}-${today.getFullYear()}`, coachId);

    if(result.success){
        const statistics = calculateTotals(result.data);

        console.log(statistics.total);
       return statistics.total ? statistics.total : 0;
 //cambio
    }
}



function renderSpinner(container) {
    container.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:300px;
            color:#e5e7eb;
            font-size:20px;
        ">
            <div class="lds-ring">
                <div></div><div></div><div></div><div></div>
            </div>
            <span style="margin-left:12px;">Cargando dashboard...</span>
        </div>

        <style>
        .lds-ring {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
        }
        .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 46px;
            height: 46px;
            margin: 6px;
            border: 6px solid #06b6d4;
            border-radius: 50%;
            animation: lds-ring 1.2s linear infinite;
            border-color: #06b6d4 transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) { animation-delay: -0.45s; }
        .lds-ring div:nth-child(2) { animation-delay: -0.3s; }
        .lds-ring div:nth-child(3) { animation-delay: -0.15s; }
        @keyframes lds-ring {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        </style>
    `;
}








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


const intervalo = setInterval(renderSpinner(containerMain), 1000); // cada 500 ms

// detener luego de 5 segundos  
setTimeout(() => {
  clearInterval(intervalo);
}, 5000);

    //renderSpinner(containerMain);
    
    const cardInfo = [];
    const cardNextSession = [];
    const cardActivity = [];

    
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
    const statsPlata = getStatisticsA();
    console.log(statsPlata);

    cardInfo.push({number: statsUser.activos, percentage : statsUser.porcentaje});
    cardInfo.push({number: statsPlanes.asignados, percentage : statsPlanes.porcentaje})
    cardInfo.push({number: statsPlata.total});
    cardInfo.push({number: statsSesiones.realizadas, percentage : statsSesiones.porcentaje }) 

   let asignadosActivos = await getAllAlumnoPlan({Estado : 1});

    asignadosActivos.slice(0,4).forEach(plan => {
       const fecha = formatFechaHora(plan.fechaInicio);
       cardActivity.push({

        name: plan.nombrePlan,
        nameAlumno: plan.nombreAlumno,
        time: fecha.split(" ")[0]

       }); 

    });

    containerMain.innerHTML = dashboardHtml(cardInfo, cardActivity, cardNextSession);
    
    dashboardButtonAddListener();
}
