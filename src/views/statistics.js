import { statisticsHtml } from '../components/statisticsHtml.js'
import { inputSuggestionIcon, inputSuggestion } from '../views/inputSuggestion.js'
import { modalStatisticsRender } from '../views/modalStatistics.js'

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

const jsonTestExcercise = [
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000001",
        "name": "Bench Press",
        "maxWeight": 100,
        "maxRepetition": 8,
        "lastDate": "14/11/2025",
        "percentage": -10
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000002",
        "name": "Deadlift",
        "maxWeight": 140,
        "maxRepetition": 5,
        "lastDate": "12/11/2025",
        "percentage": 90
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000003",
        "name": "Squat",
        "maxWeight": 120,
        "maxRepetition": 6,
        "lastDate": "10/11/2025",
        "percentage": 88
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000004",
        "name": "Overhead Press",
        "maxWeight": 60,
        "maxRepetition": 10,
        "lastDate": "08/11/2025",
        "percentage": 80
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000005",
        "name": "Barbell Row",
        "maxWeight": 70,
        "maxRepetition": 8,
        "lastDate": "06/11/2025",
        "percentage": 82
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000006",
        "name": "Incline Bench Press",
        "maxWeight": 90,
        "maxRepetition": 7,
        "lastDate": "05/11/2025",
        "percentage": 83
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000007",
        "name": "Lat Pulldown",
        "maxWeight": 65,
        "maxRepetition": 12,
        "lastDate": "04/11/2025",
        "percentage": 78
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000008",
        "name": "Leg Press",
        "maxWeight": 180,
        "maxRepetition": 10,
        "lastDate": "03/11/2025",
        "percentage": 87
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000009",
        "name": "Cable Fly",
        "maxWeight": 40,
        "maxRepetition": 15,
        "lastDate": "02/11/2025",
        "percentage": 75
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000010",
        "name": "Seated Row",
        "maxWeight": 60,
        "maxRepetition": 10,
        "lastDate": "01/11/2025",
        "percentage": 80
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000011",
        "name": "Dumbbell Shoulder Press",
        "maxWeight": 30,
        "maxRepetition": 12,
        "lastDate": "31/10/2025",
        "percentage": 77
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000012",
        "name": "Hammer Curl",
        "maxWeight": 25,
        "maxRepetition": 15,
        "lastDate": "30/10/2025",
        "percentage": 72
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000013",
        "name": "Triceps Pushdown",
        "maxWeight": 35,
        "maxRepetition": 12,
        "lastDate": "29/10/2025",
        "percentage": 74
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000014",
        "name": "Bulgarian Split Squat",
        "maxWeight": 50,
        "maxRepetition": 10,
        "lastDate": "28/10/2025",
        "percentage": 79
    },
    {
        "uuid": "1a2b3c4d-1111-aaaa-bbbb-000000000015",
        "name": "Hip Thrust",
        "maxWeight": 100,
        "maxRepetition": 8,
        "lastDate": "27/10/2025",
        "percentage": 85
    }
]

const jsonTestExerciseProgress =
{
    "name": "Press en Banco",
    "sessions": [
        { "date": "15/11/2024", "weight": 40, "sets": 3, "reps": 12 },
        { "date": "22/11/2024", "weight": 42, "sets": 3, "reps": 12 },
        { "date": "29/11/2024", "weight": 44, "sets": 3, "reps": 10 },
        { "date": "06/12/2024", "weight": 46, "sets": 3, "reps": 10 },
        { "date": "13/12/2024", "weight": 48, "sets": 3, "reps": 10 },
        { "date": "20/12/2024", "weight": 50, "sets": 4, "reps": 8 },
        { "date": "27/12/2024", "weight": 52, "sets": 4, "reps": 8 },
        { "date": "03/01/2025", "weight": 54, "sets": 4, "reps": 8 },
        { "date": "10/01/2025", "weight": 56, "sets": 4, "reps": 8 },
        { "date": "17/01/2025", "weight": 58, "sets": 4, "reps": 6 },
        { "date": "24/01/2025", "weight": 60, "sets": 4, "reps": 6 },
        { "date": "31/01/2025", "weight": 61, "sets": 4, "reps": 6 },
        { "date": "07/02/2025", "weight": 62, "sets": 4, "reps": 6 },
        { "date": "14/02/2025", "weight": 63, "sets": 4, "reps": 6 },
        { "date": "21/02/2025", "weight": 64, "sets": 5, "reps": 5 },
        { "date": "28/02/2025", "weight": 65, "sets": 5, "reps": 5 },
        { "date": "07/03/2025", "weight": 66, "sets": 5, "reps": 5 },
        { "date": "14/03/2025", "weight": 66, "sets": 5, "reps": 5 },
        { "date": "21/03/2025", "weight": 67, "sets": 5, "reps": 5 },
        { "date": "28/03/2025", "weight": 68, "sets": 5, "reps": 4 },
        { "date": "04/04/2025", "weight": 68, "sets": 5, "reps": 4 },
        { "date": "11/04/2025", "weight": 69, "sets": 5, "reps": 4 },
        { "date": "18/04/2025", "weight": 70, "sets": 5, "reps": 4 },
        { "date": "25/04/2025", "weight": 70, "sets": 5, "reps": 4 },
        { "date": "02/05/2025", "weight": 71, "sets": 5, "reps": 4 },
        { "date": "09/05/2025", "weight": 72, "sets": 5, "reps": 4 },
        { "date": "16/05/2025", "weight": 72, "sets": 5, "reps": 4 },
        { "date": "23/05/2025", "weight": 73, "sets": 5, "reps": 3 },
        { "date": "30/05/2025", "weight": 74, "sets": 5, "reps": 3 }
    ]
};

function statisticsCardFilter() {
    const searchExerciseInput = document.querySelector(
        '.statistics-excercise input.input-with-icon'
    );
    const exerciseCards = document.querySelectorAll('.statistics-excercise-card');

    searchExerciseInput.addEventListener('input', () => {
        const query = searchExerciseInput.value.trim().toLowerCase();

        exerciseCards.forEach(card => {
            const name = card.querySelector('.execercise-name')
                .textContent.trim().toLowerCase();

            const match = name.includes(query);

            if (match) {
                // Quitar display:none si lo tiene
                card.style.display = "";

                // Mostrar con animación
                card.classList.remove("statistics-excercise-card-hiding");
                card.classList.add("statistics-excercise-card-show");
            } else {
                // Animación de salida
                card.classList.remove("statistics-excercise-card-show");
                card.classList.add("statistics-excercise-card-hiding");

                // Cuando termina la animación → aplicar display:none
                card.addEventListener("transitionend", function handler() {
                    card.style.display = "none";
                    card.removeEventListener("transitionend", handler);
                });
            }
        });
    });
}

function openModalStatistics() {
    modalStatisticsRender(jsonTestExerciseProgress);
    const overlay = document.getElementById('modal-overlay-statistics');
    const modal = document.getElementById('modal-statistics');

    overlay.style.display = 'flex';
    modal.classList.remove('modal-statistics-exit');
    modal.classList.add('modal-statistics-enter');
}

function closeModalStatistics() {
    const overlay = document.getElementById('modal-overlay-statistics');
    const modal = document.getElementById('modal-statistics');

    modal.classList.remove('modal-statistics-enter');
    modal.classList.add('modal-statistics-exit');
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
}

/** statitics render */
export function statiticsRender() {
    const containerMain = document.getElementById('container-main');
    /*containerMain.innerHTML = statisticsHtml(jsonTestExcercise);

    inputSuggestionIcon('statistics-input-search-student', 'search', 'Buscar alumno...', jsonTestStudent);
    statisticsCardFilter();

    window.closeModalStatistics = closeModalStatistics;
    window.openModalStatistics = openModalStatistics;*/

    // transicion suave
    containerMain.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    containerMain.classList.remove('opacity-100', 'scale-100');
    setTimeout(() => {
        containerMain.innerHTML = statisticsHtml(jsonTestExcercise);

        inputSuggestionIcon('statistics-input-search-student', 'search', 'Buscar alumno...', jsonTestStudent);
        statisticsCardFilter();

        window.closeModalStatistics = closeModalStatistics;
        window.openModalStatistics = openModalStatistics;

        // Aplicar clases de entrada
        containerMain.classList.remove('opacity-0', 'scale-95');
        containerMain.classList.add('opacity-100', 'scale-100');
    }, 100); // duración igual a la transición
}