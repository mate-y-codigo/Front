import { authHelper } from "../helpers/authHelper.js";


function spinnerHTML() {
    return `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:200px;
            font-size:18px;
            color:#e5e7eb;">
            
            <div class="lds-ring">
                <div></div><div></div><div></div><div></div>
            </div>
            <span style="margin-left:10px;">Cargando tareas...</span>

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
        </div>
    `;
}



function tareasHtml(usuarios, tareasAgrupadas, alumno, desde, hasta) {

    return `
<div style="padding:40px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

    <h1 style="
        font-size:32px;font-weight:bold;margin-bottom:25px;
        background:linear-gradient(90deg,#8b5cf6,#06b6d4);
        -webkit-background-clip:text;color:transparent;">
        Tareas programadas
    </h1>

    <!-- SELECTORES -->
    <div style="display:flex;gap:10px;margin-bottom:25px;">

        <!-- Alumno -->
        <select id="select-alumno-tareas" style="
            padding:12px 14px;border-radius:10px;
            background:#111827;border:1px solid #374151;color:#e5e7eb;min-width:200px;">
            <option value="">Todos los alumnos</option>
            ${usuarios.map(u => `
                <option value="${u.id}" ${u.id == alumno ? "selected" : ""}>
                    ${u.nombre} ${u.apellido}
                </option>
            `).join("")}
        </select>

        <!-- Fecha desde -->
        <input id="select-desde-tareas" type="date" value="${desde}" style="
            padding:12px 14px;border-radius:10px;
            background:#111827;border:1px solid #374151;color:#e5e7eb;">

        <!-- Fecha hasta -->
        <input id="select-hasta-tareas" type="date" value="${hasta}" style="
            padding:12px 14px;border-radius:10px;
            background:#111827;border:1px solid #374151;color:#e5e7eb;">
    </div>


    <!-- LISTA AGRUPADA -->
   <div id="lista-tareas" 
    style="
        margin-top:20px;
        display:flex;
        flex-wrap:wrap;
        gap:20px;
    "
>
    ${Object.keys(tareasAgrupadas).length === 0
            ? `<div style="padding:20px;border:1px dashed #374151;border-radius:8px;color:#9ca3af;">
               No hay tareas en este rango de fechas.
           </div>`

            : Object.entries(tareasAgrupadas)
                .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                .map(([fecha, items]) => `

                <!-- CARD DEL DÍA -->
                <div style="
                    width:300px;
                    background:#111827;
                    border-radius:12px;
                    border:1px solid #1f2937;
                    padding:20px;
                ">

                    <h2 style="
                        margin:0 0 12px;
                        font-size:20px;
                        font-weight:bold;
                        color:#06b6d4;">
                        📅 ${fecha}
                    </h2>

                    ${items.map(t => `
                        <div style="
                            padding:12px 14px;
                            margin-bottom:10px;
                            background:#1a2130;
                            border-radius:8px;
                            border:1px solid #2a3344;
                        ">
                            
                            <div style="font-size:16px;font-weight:bold;color:#06b6d4;">
                                ${t.nombreSesion}
                            </div>

                            <div style="font-size:14px;color:#9ca3af;">${t.nombreAlumno}</div>

                            <div style="font-size:14px;color:#9ca3af;">
                                Estado: ${t.estado === 1 ? "Pendiente" : "Realizada"}
                            </div>
                        </div>
                    `).join("")}

                </div>

            `).join("")
        }
</div>


</div>`;
}



export async function renderTareas() {

    const container = document.getElementById("container-main");

    /* === LEER ESTADO PREVIO === */
    const prevAlumno = document.getElementById("select-alumno-tareas")?.value || "";
    const prevDesde = document.getElementById("select-desde-tareas")?.value ||
        new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const prevHasta = document.getElementById("select-hasta-tareas")?.value ||
        new Date().toISOString().slice(0, 10);

    container.innerHTML = spinnerHTML();

    /* === FETCH ALUMNOS === */
    const respUsers = await authHelper.fetchWithAuth("http://localhost:5099/api/Usuarios");
    let usuarios = await respUsers.json();
    usuarios = usuarios.filter(u => u.rolId === 3);

    /* === ARMAR QUERY === */
    const params = new URLSearchParams();

    if (prevAlumno !== "") params.append("idAlumno", prevAlumno);
    params.append("Desde", prevDesde + "Z");
    params.append("Hasta", prevHasta + "Z");

    /* === FETCH TAREAS FILTRADAS === */
    const respTareas = await authHelper.fetchWithAuth(
        `http://localhost:5098/api/EventoCalendario?${params.toString()}`
    );
    const tareas = await respTareas.json();

    /* === AGRUPAR POR DÍA === */
    const tareasAgrupadas = tareas.reduce((acc, t) => {
        const fecha = t.fechaProgramada.slice(0, 10);
        if (!acc[fecha]) acc[fecha] = [];
        acc[fecha].push(t);
        return acc;
    }, {});

    /* === RENDER HTML === */
    container.innerHTML = tareasHtml(usuarios, tareasAgrupadas, prevAlumno, prevDesde, prevHasta);

    /* === RESTAURAR ESTADO === */
    document.getElementById("select-alumno-tareas").value = prevAlumno;
    document.getElementById("select-desde-tareas").value = prevDesde;
    document.getElementById("select-hasta-tareas").value = prevHasta;

    /* === REACTIVAR LISTENERS === */
    attachListeners(usuarios);
}


/* ====================================================
   LISTENERS
==================================================== */
function attachListeners(usuarios) {
    const alumno = document.getElementById("select-alumno-tareas");
    const desde = document.getElementById("select-desde-tareas");
    const hasta = document.getElementById("select-hasta-tareas");

    if (!alumno || !desde || !hasta) return;

    const refresh = () => {
        renderTareas();
    };

    alumno.addEventListener("change", refresh);
    desde.addEventListener("change", refresh);
    hasta.addEventListener("change", refresh);
}
