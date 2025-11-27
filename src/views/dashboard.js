import { dashboardHtml } from '../components/dashboardHtml.js'

function dashboardButtonAddListener() {
    document.getElementById('quick-action-add-student').addEventListener('click', () => console.log('agregar nuevo alumno'));
    document.getElementById('quick-action-new-plan').addEventListener('click', () => console.log('crear nuevo plan'));
    document.getElementById('quick-action-see-calendar').addEventListener('click', () => console.log('ver calendario'));
    document.getElementById('quick-action-add-payment').addEventListener('click', () => console.log('agregar nuevo pago'));
}

/** para test */
const cardInfo = [
    { number: 142, percentage: 12 },
    { number: 98, percentage: 8 },
    { number: 45230, percentage: 23 },
    { number: 1234, percentage: 5 }
];
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

async function fetchUsers(){


}

/** render */
export function dashboardRender() {
    const containerMain = document.getElementById("container-main");
    containerMain.innerHTML = dashboardHtml(cardInfo, cardActivity, cardNextSession);
    
    dashboardButtonAddListener();
}
