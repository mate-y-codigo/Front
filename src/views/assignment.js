import { assignmentHtml } from '../components/assignmentHtml.js'
import { comboBoxRender } from '../views/comboBox.js'
import { progressBarSetAll } from '../views/progressBar.js'
import { inputSuggestionIcon, inputSuggestion } from '../views/inputSuggestion.js'
import { assignmentNewRender } from '../views/modalAssignmentNew.js'

const assignmentTypeList = ['Activo', 'Completado'];
/*
[
    {
        "id": "bd6011c6-bd73-477b-87b4-6d738f7c663c",
        "email": "admin@fitcode.com",
        "nombre": "Admin",
        "apellido": "FitCode",
        "celular": "0000000000",
        "rolId": 1,
        "rol": "Admin",
        "creadoEn": "2025-11-25T16:02:54.12242+00:00"
    },
    {
        "id": "9a3ffd2c-1384-4574-b0ec-0b18e4c1d0be",
        "email": "entrenador@test.com",
        "nombre": "Carlos",
        "apellido": "Maestro",
        "celular": "1122334455",
        "rolId": 2,
        "rol": "Entrenador",
        "creadoEn": "2025-11-25T16:02:54.490493+00:00"
    },
    {
        "id": "a8f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a08",
        "email": "nicolas.molina@gmail.com",
        "nombre": "Nicolás",
        "apellido": "Molina",
        "peso": 90.00,
        "altura": 1.82,
        "celular": "+54 9 11 9900 1122",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T23:58:07.521988+00:00"
    },
    {
        "id": "a7f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a07",
        "email": "valentina.lopez@gmail.com",
        "nombre": "Valentina",
        "apellido": "López",
        "peso": 58.00,
        "altura": 1.68,
        "celular": "+54 9 11 8899 0011",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T23:58:07.521988+00:00"
    },
    {
        "id": "a6f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a06",
        "email": "diego.sanchez@gmail.com",
        "nombre": "Diego",
        "apellido": "Sánchez",
        "peso": 72.50,
        "altura": 1.75,
        "celular": "+54 9 11 7788 9900",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T23:58:07.521988+00:00"
    },
    {
        "id": "a5f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a05",
        "email": "carla.rodriguez@gmail.com",
        "nombre": "Carla",
        "apellido": "Rodríguez",
        "peso": 60.00,
        "altura": 1.70,
        "celular": "+54 9 11 6677 8899",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T23:58:07.521988+00:00"
    },
    {
        "id": "a4f3e9c2-1d2b-4f3a-8e2f-1a9c3d7e1a04",
        "email": "marcos.fernandez@gmail.com",
        "nombre": "Marcos",
        "apellido": "Fernández",
        "peso": 85.00,
        "altura": 1.78,
        "celular": "+54 9 11 5566 7788",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T23:58:07.521988+00:00"
    },
    {
        "id": "c30c8c4a-204b-40c8-bd98-0a2ec4a640d4",
        "email": "alumno@test.com",
        "nombre": "Juan",
        "apellido": "Perez",
        "peso": 75.00,
        "altura": 180.00,
        "celular": "5544332211",
        "rolId": 3,
        "rol": "Alumno",
        "creadoEn": "2025-11-25T16:02:54.749071+00:00"
    }
]

*/

const jsonTestAssignment = [

    {
        id: "a3f1c2b4-9e8d-4f6a-8c1e-2d7f9b1e2a3c",
        name: "Maria Gonzalez",
        planName: "Fuerza Avanzada",
        coachName: "Lucas Pérez",
        dateStart: "29/2/2024",
        dateEnd: "29/3/2024",
        progress: 70,
        status: "Completado"
    },
    {
        id: "b7d2e9a1-4c3f-4b2a-9d6e-1f8c3e7a9b2d",
        name: "Javier Torres",
        planName: "Cardio Express",
        coachName: "Sofía Ramírez",
        dateStart: "5/3/2024",
        dateEnd: "5/4/2024",
        progress: 45,
        status: "Activo"
    },
    {
        id: "c9a4f3e2-7b1d-4e6f-8a2c-3d9f1b2e4c7a",
        name: "Lucía Fernández",
        planName: "Flexibilidad Total",
        coachName: "Martín Gómez",
        dateStart: "10/1/2024",
        dateEnd: "10/2/2024",
        progress: 100,
        status: "Completado"
    },
    {
        id: "d2e7a9b3-6f4c-4a1d-9e2f-7c3b1f9a8d2e",
        name: "Carlos Méndez",
        planName: "Resistencia Base",
        coachName: "Valentina Ruiz",
        dateStart: "20/2/2024",
        dateEnd: "20/3/2024",
        progress: 20,
        status: "Activo"
    },
    {
        id: "e1f9b2c3-8a7d-4e2f-9c1b-6d3f2a7e1c9a",
        name: "Ana López",
        planName: "Tonificación Pro",
        coachName: "Diego Herrera",
        dateStart: "1/4/2024",
        dateEnd: "1/5/2024",
        progress: 0,
        status: "Activo"
    },
    {
        id: "f4c2d1e3-9a8b-4f7c-8d2e-3b1f9a7c2e4d",
        name: "Santiago Rivas",
        planName: "HIIT Intensivo",
        coachName: "Laura Benítez",
        dateStart: "15/3/2024",
        dateEnd: "15/4/2024",
        progress: 85,
        status: "Activo"
    },
    {
        id: "g7e3b2c1-5d9f-4a2e-9c8b-1f2d3e7a4c9f",
        name: "Camila Duarte",
        planName: "Core Estable",
        coachName: "Fernando Silva",
        dateStart: "2/2/2024",
        dateEnd: "2/3/2024",
        progress: 60,
        status: "Activo"
    },
    {
        id: "h1a9c3e2-6f8d-4b2a-9e1c-3d7f2a9b5c4e",
        name: "Tomás Navarro",
        planName: "Movilidad Funcional",
        coachName: "Cecilia Torres",
        dateStart: "10/4/2024",
        dateEnd: "10/5/2024",
        progress: 30,
        status: "Activo"
    },
    {
        id: "i2b7d3f4-8c1e-4a9f-9d2b-7e3a1c5f6d8e",
        name: "Valeria Ponce",
        planName: "Postura Correctiva",
        coachName: "Andrés Molina",
        dateStart: "25/1/2024",
        dateEnd: "25/2/2024",
        progress: 100,
        status: "Completado"
    },
    {
        id: "j3c8e1d2-7f9a-4b2c-8d1e-2a3f9b7c6e5d",
        name: "Federico Salas",
        planName: "Potencia Explosiva",
        coachName: "Natalia Castro",
        dateStart: "12/3/2024",
        dateEnd: "12/4/2024",
        progress: 10,
        status: "Activo"
    }
]

const jsonTestStudent = [
    { "uuid": "c6b7c9ab-8a7e-42cb-9c44-2b96a1b0d9f0", "name": "Lucía Fernández" },
    { "uuid": "7f3f2456-2f70-4b34-8c91-8bb9e6ce1dc5", "name": "Mateo Rodríguez" },
    { "uuid": "4c6e2a3d-f629-4bf2-8f54-0fdb94c7ec21", "name": "Valentina Gómez" },
    { "uuid": "f7d6bb78-1b2b-4aba-878e-7365bc6ad7fa", "name": "Santiago Martínez" },
    { "uuid": "b0d53c94-e904-4f85-8ab3-441b97c06ebc", "name": "Camila López" },
    { "uuid": "8dfba579-d01c-4f0c-a7fa-3deb0d3b31e5", "name": "Benjamín Pérez" },
    { "uuid": "3a0df5a2-2a60-4cd6-9f38-778bfb0d2d63", "name": "Sofía Torres" },
    { "uuid": "a9b5d9d8-493e-4c79-89a5-cc5fb02fbca1", "name": "Tomás Ramírez" },
    { "uuid": "19c9a85a-2100-4c75-bc27-308ee3c2e2ae", "name": "Martina Sánchez" },
    { "uuid": "f7c61b83-52bc-4efb-a573-e86dd13f9695", "name": "Julián Herrera" },
    { "uuid": "b8e4c822-d5d4-47ad-98ea-852fb0a1ed85", "name": "Isabella Castro" },
    { "uuid": "e86a50fe-c987-45d3-b0ef-750e70e5780c", "name": "Agustín Morales" },
    { "uuid": "d5fc81be-16fc-4b54-aab5-e3b895feff8e", "name": "Emma Rivas" },
    { "uuid": "5a6f2dbb-9b53-44b8-8b7a-0db2eb6e446b", "name": "Dylan Navarro" },
    { "uuid": "58c53c27-fb47-4140-a744-6ddee83bd11c", "name": "Renata Aguirre" },
    { "uuid": "bc9668dc-8b63-4a69-8a3e-7b2f2f8d59e2", "name": "Thiago Domínguez" },
    { "uuid": "db534ab7-0c64-4d12-a587-010950f3d6ef", "name": "Mía Vargas" },
    { "uuid": "aaf4c7ce-08e4-45ac-9d39-3fdc7d8ed137", "name": "Facundo Molina" },
    { "uuid": "f759cbb1-e59b-4a42-810d-459503ff0f59", "name": "Antonella Paredes" },
    { "uuid": "81f2639f-ddea-4abf-bb0c-069a3f83d3d5", "name": "Bruno Carrizo" },
    { "uuid": "3d8af460-b8b7-4d54-bb88-e741e92b65df", "name": "Catalina Ibáñez" },
    { "uuid": "5451a1d7-944b-4893-907d-0ca1f537a8bc", "name": "Lautaro Godoy" },
    { "uuid": "b94f2dbc-4c41-4180-857e-56eae4f95734", "name": "Abril Medina" },
    { "uuid": "a04c1979-2a03-4206-a5bb-29af37eb301f", "name": "Simón Escobar" },
    { "uuid": "c3d7b257-86bc-400d-8ed2-71800ac2c32a", "name": "Paula Salinas" },
    { "uuid": "fa960502-95c3-4c4d-ba71-80e03fd9f0cf", "name": "Iván Duarte" },
    { "uuid": "114b94b1-476f-4f13-a7cd-db547d01641b", "name": "Malena Figueroa" },
    { "uuid": "eab752e4-d312-4f64-b941-3e399f0d434b", "name": "Elías Correa" },
    { "uuid": "cf7d5dc6-2781-4db7-9f73-aa8bd9a5e2fa", "name": "Julia Barrios" },
    { "uuid": "ef247fa4-0b83-4221-85c4-bcaa4e2a0a1c", "name": "Gabriel Varela" },
    { "uuid": "77fdc4d7-e82e-432e-a8e8-42f4f4b8453a", "name": "Florencia Peña" },
    { "uuid": "6609fcda-b838-412a-85d0-a7935427979b", "name": "Nicolás Acosta" },
    { "uuid": "aad9e7c4-8b86-4bd0-8382-8c03198e79d1", "name": "Carla Bustos" },
    { "uuid": "ca6f184c-2a25-4850-9ec2-74a6fcaaf3c4", "name": "Ramiro Rojas" },
    { "uuid": "01876c23-f4c0-4d43-87f2-eb6c9ac9798d", "name": "Milagros Luna" },
    { "uuid": "edaa71e5-953b-4679-83b5-cf198f9c6c45", "name": "Franco Sosa" },
    { "uuid": "57c42eab-7199-4a8c-a452-85f5e3e413b5", "name": "Ariana Leiva" },
    { "uuid": "4f1ff8c0-0f1c-4f58-a343-7fd731d2af9d", "name": "Lucas Quiroga" },
    { "uuid": "1e3e0bb2-3881-47d3-a96d-bca3da591a57", "name": "Victoria Reynoso" },
    { "uuid": "bf7a39c0-e7da-46c2-af59-445918a0cce3", "name": "Matías Cordero" }
];

const jsonTestPlan = [
    { "uuid": "0d5a8433-d1a1-4fc6-bcc1-2cdf283d1c3b", "name": "Full Body Principiantes" },
    { "uuid": "c2d245aa-8e22-4e90-a3fb-0a464c3af7f6", "name": "Hipertrofia Avanzada" },
    { "uuid": "ad4a0c44-a4e0-4a28-94db-4cf442a64b9e", "name": "Fuerza 5x5" },
    { "uuid": "f7a644d2-69ea-45ad-9dbf-3f318240584c", "name": "Torso-Pierna Intermedio" },
    { "uuid": "e41b2ade-f92c-40fa-a8b3-5e48b52f63b6", "name": "Push Pull Legs (PPL)" },
    { "uuid": "bfe5e07f-6a8f-43d0-ab55-2d5c53d11133", "name": "Quema Grasa Intensivo" },
    { "uuid": "9b6cd8cb-05d0-4cec-b689-c8e1760e5fb4", "name": "Glúteos y Piernas Femenino" },
    { "uuid": "ed020f1b-f538-4cd5-a9a2-96317fe0a6e7", "name": "Tonificación General" },
    { "uuid": "4011e20d-9daf-49c1-a3d8-8a96bef4b03d", "name": "Core y Zona Media" },
    { "uuid": "61c26369-e6ae-4aa9-9d63-588a390fe859", "name": "Entrenamiento Funcional" },
    { "uuid": "58e79bb7-f5b6-4ad1-a4ce-bf192dea95a1", "name": "HIIT Avanzado" },
    { "uuid": "bdb4788f-7970-453c-a87b-c395d4e670d3", "name": "Fuerza Máxima" },
    { "uuid": "5a3bd10b-9f93-4fd6-bf89-d528b36367ac", "name": "Resistencia Cardiovascular" },
    { "uuid": "03afac44-29e1-469e-896a-5b594787c4ef", "name": "Programa de Pérdida de Peso" },
    { "uuid": "c253f66d-a8ea-4d86-b822-29d7ca28cf1f", "name": "Espalda y Brazos" },
    { "uuid": "b728ad1b-44ae-4104-a495-9b7ff8cc4d32", "name": "Abdomen Marcado" },
    { "uuid": "d4c2adff-cc93-46de-80fc-848d5dbe96b4", "name": "Pecho y Tríceps" },
    { "uuid": "0f88978e-7bc4-4b31-97fc-1f4b95624a4b", "name": "Piernas y Glúteos Power" },
    { "uuid": "08492c95-f63a-4db0-a576-78cda471df62", "name": "Rehabilitación y Movilidad" },
    { "uuid": "5c9a0390-9a53-43d5-94da-9ff52d77ad97", "name": "Rutina Express 30 Minutos" },
    { "uuid": "a6d84d77-0725-4540-bfa2-15c161462cb5", "name": "Circuito Metabólico" },
    { "uuid": "772b6e4f-964b-4e14-87c7-c548a7c32057", "name": "Entrenamiento Avanzado de Atletismo" },
    { "uuid": "ff8622fb-6c5c-4b21-8f52-7b7b80afb76e", "name": "Ganar Masa Muscular" },
    { "uuid": "0cd66183-7fe3-44df-8e5c-8645c6a535c9", "name": "Powerlifting Intermedio" },
    { "uuid": "5bc94e82-e4db-4338-8a1b-ae973737983e", "name": "Entrenamiento para Adultos Mayores" },
    { "uuid": "11f69176-fd27-4abf-ba43-b122525fe61a", "name": "Preparación Física para Deportes" },
    { "uuid": "63dbe8b7-f419-4e72-8cee-cae653996ba8", "name": "Estilo de Vida Saludable" },
    { "uuid": "f04997e8-ffb3-4d88-bf66-0e0b0bd0a8f8", "name": "Cuerpo Completo Avanzado" },
    { "uuid": "6fa77004-cc2b-4eae-bb1a-2e8e205394fe", "name": "Entrenamiento para Nivel Intermedio" },
    { "uuid": "1df9f2fe-8a8b-4b91-9f55-15062f295413", "name": "Plan de Definición Muscular" }
]


function openModalNewAssignment() {
    //modalPlansDetailRender(plan);
    const overlay = document.getElementById('modal-overlay-assignment-new');
    const modal = document.getElementById('modal-assignment-new');

    overlay.style.display = 'flex';
    modal.classList.remove('modal-assignment-new-exit');
    modal.classList.add('modal-assignment-new-enter');

}

function closeModalNewAssignment() {
    const overlay = document.getElementById('modal-overlay-assignment-new');
    const modal = document.getElementById('modal-assignment-new');

    modal.classList.remove('modal-assignment-new-enter');
    modal.classList.add('modal-assignment-new-exit');
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
}


/** assignment reder */
export function assignmentRender() {
    const containerMain = document.getElementById('container-main');
    /*containerMain.innerHTML = assignmentHtml(jsonTestAssignment);
    inputSuggestionIcon('assignment-input-search', 'search', 'Buscar alumno...', jsonTestStudent);
    comboBoxRender('assignment-type-combobox', assignmentTypeList);
    progressBarSetAll();

    assignmentNewRender();
    inputSuggestion('assignment-new-student-name', 'Nombre del Alumno...', jsonTestStudent);
    inputSuggestion('assignment-new-coach-name', 'Nombre del Plan de Entrenamiento...', jsonTestPlan);

    window.closeModalNewAssignment = closeModalNewAssignment;
    window.openModalNewAssignment = openModalNewAssignment;*/


    // transicion suave
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(() => {
        containerMain.innerHTML = assignmentHtml(jsonTestAssignment);

        inputSuggestionIcon('assignment-input-search', 'search', 'Buscar alumno...', jsonTestStudent);
        comboBoxRender('assignment-type-combobox', assignmentTypeList);
        progressBarSetAll();

        assignmentNewRender();
        inputSuggestion('assignment-new-student-name', 'Nombre del Alumno...', jsonTestStudent);
        inputSuggestion('assignment-new-coach-name', 'Nombre del Plan de Entrenamiento...', jsonTestPlan);

        window.closeModalNewAssignment = closeModalNewAssignment;
        window.openModalNewAssignment = openModalNewAssignment;

        // Aplicar clases de entrada
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duración igual a la transición
}

