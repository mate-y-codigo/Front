import { getUrlAsignacionApi, getUrlUserApi } from "../config/urlApi.js";
import { authHelper } from "../helpers/authHelper.js";


function spinnerHTML() {
    return `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:200px;
            font-size:18px;
            color:#oklch;">
            
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
<div style="padding:40px;background:#oklch;min-height:100vh;color:#oklch;font-family:Arial;">


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
                    background:#oklch;
                    border-radius:12px;
                    border:1px solid #oklch;
                    padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);
                ">

                    <h2 style="
                        margin:0 0 12px;
                        font-size:20px;
                        font-weight:bold;
                        color:#bc4ed8;">
                        📅 ${fecha}
                    </h2>


                    ${items.map(t => `
                        <div style="
                            padding:12px 14px;
                            margin-bottom:10px;
                            background:var(--card-bg);
                            border-radius:8px;
                            border:1px solid #777c85ff;
                        ">
                            
                            <div style="font-size:16px;font-weight:bold;color:#fb923c;">
                            <h2 class="plan-name">
                                ${t.nombreSesion}
                            </h2>
                            </div>

                            <div style="font-size:15px;color:var(--oklch-text);">${t.nombreAlumno}</div>

                            <div style="font-size:14px;color:var(--oklch-text);">
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


    const prevAlumno = document.getElementById("select-alumno-tareas")?.value || "";
    const prevDesde = document.getElementById("select-desde-tareas")?.value ||
        new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    const prevHasta = document.getElementById("select-hasta-tareas")?.value ||
        new Date().toISOString().slice(0, 10);

    container.innerHTML = spinnerHTML();


    const urlUsers = `${getUrlUserApi()}/api/Usuarios`;
    const respUsers = await authHelper.fetchWithAuth(urlUsers, { method: "GET" });
    let usuarios = await respUsers.json();
    usuarios = usuarios.filter(u => u.rolId === 3);


    const params = new URLSearchParams();

    if (prevAlumno !== "") params.append("idAlumno", prevAlumno);
    params.append("Desde", prevDesde + "Z");
    params.append("Hasta", prevHasta + "Z");


    const urlAsigncionApi = `${getUrlAsignacionApi()}/api/AlumnoPlan?${params.toString()}`;
    const respTareas = await authHelper.fetchWithAuth(urlAsigncionApi, { method: "GET" });
    const tareas = await respTareas.json();


    const tareasAgrupadas = tareas.reduce((acc, t) => {
        const fecha = t.fechaProgramada.slice(0, 10);
        if (!acc[fecha]) acc[fecha] = [];
        acc[fecha].push(t);
        return acc;
    }, {});


    container.innerHTML = tareasHtml(usuarios, tareasAgrupadas, prevAlumno, prevDesde, prevHasta);


    document.getElementById("select-alumno-tareas").value = prevAlumno;
    document.getElementById("select-desde-tareas").value = prevDesde;
    document.getElementById("select-hasta-tareas").value = prevHasta;


    attachListeners(usuarios);
}


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
