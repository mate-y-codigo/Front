import { authHelper } from "../helpers/authHelper.js";


function spinnerHTML() {
    return `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:300px;
            color:#oklch;
            font-size:20px;
        ">
            <div class="lds-ring">
                <div></div><div></div><div></div><div></div>
            </div>
            <span style="margin-left:12px;">Cargando...</span>
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

/* ====================================================
   HTML PRINCIPAL
   ==================================================== */
export function metricasHtml(
    data = null,
    usuarios = [],
    alumnoSeleccionado = ""
) {

    if (!data) {
        return `
        <div style="padding:50px 70px;background:#oklch;min-height:100vh;color:#oklch;font-family:Arial;">

            <h2 style="font-size:25px;margin-bottom:15px;color:#oklch">
                Dashboard de planes
            </h2>

            <div style="display:flex;gap:10px;margin-bottom:25px;">

                <select id="select-alumno" style="
                    padding:10px 14px;border-radius:8px;
                    background:#oklch;border:1px solid #374151;
                    color:#oklch;min-width:180px;">
                    <option value="">Todos los alumnos</option>
                    ${usuarios.map(u => `
                        <option value="${u.id}">${u.nombre} ${u.apellido}</option>
                    `).join("")}
                </select>

                <input type="date" id="select-desde" style="
                    padding:10px 14px;border-radius:8px;
                    background:#oklch;border:none;
                    color:#oklch;">

                <input type="date" id="select-hasta" style="
                    padding:10px 14px;border-radius:8px;
                    background:#oklch;border:none;
                    color:#oklch;">
            </div>

            ${spinnerHTML()}
        </div>`;
    }

    const {
        promedioProgresoGlobal,
        promedioAdherenciaGlobal,
        planesFiltrados,
        cantidadRecordsPersonales,
        prs,
        totalPRs,
        fuerzaData,
        fuerzaRelativaGlobal,
        fuerzaRelativaAlumno,
        alumnosSinEntrenar,        // ⬅️ NUEVO
        porcentajeSinEntrenar,     // ⬅️ NUEVO
    } = data;


    /* ========================================================
       TEMPLATE COMPLETO
    ======================================================== */
    return `
<div style="padding:50px 70px;background:#oklch;min-height:100vh;color:#oklch;font-family:Arial;">

    <h2 style="font-size:25px;margin-bottom:15px;color:#oklch">
        Dashboard de planes
    </h2>

    <!-- Selectores -->
    <div style="display:flex;gap:10px;margin-bottom:25px;">
        <select id="select-alumno" style="
            padding:10px 14px;
            border-radius:10px;
            border:1px solid var(--oklch-border);
            background:var(--background);
            color:var(--oklch-text);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            font-weight:500;
        ">
            <option value="">Todos los alumnos</option>
            ${usuarios.map(u => `
                <option value="${u.id}">${u.nombre} ${u.apellido}</option>
            `).join("")}
        </select>

        <input type="date" id="select-desde" style="
            padding:10px 14px;border-radius:8px;
            background:var(--oklch-bg);border:1px solid var(--oklch-border);color:var(--oklch-text);box-shadow: 0 4px 12px rgba(0,0,0,0.25);">

        <input type="date" id="select-hasta" style="
            padding:10px 14px;border-radius:8px;
            background:var(--oklch-bg);border:1px solid var(--oklch-border);color:var(--oklch-text);box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
    </div>

    <!-- KPIs -->
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin-bottom:25px;">
        
        <!-- Progreso -->
        <div style="background:#oklch;border:none;border-radius:14px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            <span style="font-size:14px;color:#oklch;">Progreso global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#3b82f6;">
                ${promedioProgresoGlobal.toFixed(1)}%
            </div>
        </div>

        <!-- Adherencia -->
        <div style="background:#oklch;border:1px solid #oklch;border-radius:14px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            <span style="font-size:14px;color:#oklch;">Adherencia global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#bc4ed8;">
                ${promedioAdherenciaGlobal.toFixed(1)}%
            </div>
        </div>

        <!-- Records -->
        <div style="background:#oklch;border:1px solid #oklch;border-radius:14px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            <span style="font-size:14px;color:#oklch;">Records Personales</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#ec4899;">
                ${cantidadRecordsPersonales}
            </div>
        </div>

        <!-- Cantidad de planes -->
        <div style="
            background:#oklch;
            border:1px solid #oklch;
            border-radius:14px;
            padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
        <span style="font-size:14px;color:#oklch;">Cantidad de planes</span>
        <div style="font-size:32px;font-weight:600;margin-top:5px;color:#fb923c;">
            ${planesFiltrados.length}
        </div>
        </div>

        <!-- Fuerza Relativa -->
        <div style="
            background:#oklch;
            border:1px solid #oklch;
            border-radius:14px;
            padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            <span style="font-size:14px;color:#oklch;">Fuerza Relativa</span>
            <div style="
                font-size:28px;
                font-weight:bold;
                margin-top:5px;
                color:#06b6d4;">
                ${fuerzaRelativaGlobal.toFixed(2)}
            </div>

            <div style="color:#oklch;font-size:12px;margin-top:4px;">
                Alumno: ${fuerzaRelativaAlumno !== null ? fuerzaRelativaAlumno.toFixed(2) : "-"}
            </div>
        </div>

        <!--  KPI NUEVO: Alumnos sin entrenar últimos 7 días -->
        <div style="
            background:#oklch;
            border:1px solid #oklch;
            border-radius:14px;
            padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            <span style="font-size:14px;color:#oklch;">Alumnos sin entrenar (14 días)</span>

            <div style="
                font-size:32px;
                font-weight:bold;
                margin-top:5px;
                color:#ef4444;">
                ${porcentajeSinEntrenar.toFixed(1)}%
            </div>

            <div style="color:#oklch;font-size:12px;margin-top:4px;">
                ${alumnosSinEntrenar.length} de ${usuarios.length}
            </div>
        </div>

    </div>

<!-- Zona de informes rápidos: PLANES + SIN ENTRENAR -->
<div style="display:grid; grid-template-columns: 2fr 1fr; gap:25px; margin-bottom:30px;">

    <!-- 📌 PLANES -->
        <div style="
            background:#oklch;
            padding:24px;
            border-radius:14px;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
        ">

            <h3 style="margin-bottom:20px;font-size:22px;font-weight:600;color:#oklch;">
                Planes Encontrados (${planesFiltrados.length})
            </h3>

            <table style="width:100%;border-collapse:collapse;">
                
                <thead>
                    <tr>
                        <th style="text-align:left;padding:10px 0;color:#oklch;font-weight:500;font-size:14px;">Alumno</th>
                        <th style="text-align:left;padding:10px 0;color:#oklch;font-weight:500;font-size:14px;">Inicio</th>
                        <th style="text-align:left;padding:10px 0;color:#oklch;font-weight:500;font-size:14px;">Progreso</th>
                        <th style="text-align:left;padding:10px 0;color:#oklch;font-weight:500;font-size:14px;">Adherencia</th>
                    </tr>
                </thead>

                <tbody>
                    ${planesFiltrados.map((p, i) => `
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
                            <td style="padding:10px 0;color:#oklch;">${p.nombreAlumno}</td>
                            <td style="padding:10px 0;color:#oklch;">${p.fechaInicio?.slice(0, 10)}</td>
                            <td style="padding:10px 0;color:#3b82f6;font-weight:500;">${p.progresoPorcentaje}%</td>
                            <td style="padding:10px 0;color:#bc4ed8;font-weight:500;">${p.adherenciaPorcentaje}%</td>
                        </tr>
                    `).join("")}
                </tbody>

            </table>

        </div>


        <!-- 📌 ALUMNOS SIN ENTRENAR -->
        <div style="
            background:#oklch;
            border-radius:10px;
            border:1px solid #oklch;
            padding:20px;
            max-height:400px;
            overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,0.25);
        ">
            <h3 style="font-size:20px;margin-bottom:15px;">Alumnos sin entrenar (últimos 14 días)</h3>

            ${alumnosSinEntrenar.length === 0 ? `
                <div style="
                    padding:20px;text-align:center;color:#oklch;
                    border:1px dashed #374151;border-radius:8px;">
                    Todos entrenaron 🎉
                </div>
            ` :
            alumnosSinEntrenar.map(a => `
                <div style="margin-bottom:16px;">
                    <div style="display:flex;justify-content:space-between;align-items: center;margin-bottom:4px;">
                        <span style="display:flex;align-items: center;"><div style="margin-right:5px" class="icon material-symbols-outlined">assignment</div><span> ${a.nombre} ${a.apellido}</span></span>
                    </div>
                </div>
            `).join("")}
        </div>

    </div>



    <!-- Gráficos -->
    <div style="display:flex; ${alumnoSeleccionado === "" ? "" : "gap:20px;"} margin-bottom:25px;">

        <!-- Fuerza -->
        ${alumnoSeleccionado === "" ? `` : `
        <div style="
            flex:1;
            background:#oklch;border-radius:10px;
            border:1px solid #oklch;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            
            <h3 style="font-size:20px;margin-bottom:10px;">Progreso de Fuerza (1RM)</h3>

            <canvas id="chartFuerza"></canvas>
        </div>`}

        <!-- PRs -->
        <div style="
            flex:1;
            background:#oklch;border-radius:10px;
            border:1px solid #oklch;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);">
            
            <h3 style="font-size:20px;margin-bottom:15px;">PRs por ejercicio</h3>

            ${prs.length === 0 ? `
                <div style="
                    padding:20px;text-align:center;color:#oklch;
                    border:1px dashed #374151;border-radius:8px;">
                    No se registraron PRs en este período.
                </div>
            ` : `
                ${prs.map(e => `
                    <div style="margin-bottom:16px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                            <span>${e.name}</span>
                            <span style="color:#ec4899;font-weight:bold">${e.prs} PRs</span>
                        </div>

                        <div style="height:8px;background:#4a536b;;border-radius:6px;">
                            <div style="
                                height:100%;
                                width:${(e.prs / Math.max(...prs.map(x => x.prs))) * 100}%;
                                background:linear-gradient(90deg,#ec4899,#8b5cf6);
                                border-radius:6px;">
                            </div>
                        </div>
                    </div>
                `).join("")}

                <div style="
                    padding:12px;
                    margin-top:15px;
                    font-size:22px;
                    font-weight:bold;
                    text-align:center;
                    color:#ec4899;

                    background: 
                        linear-gradient(#oklch, #oklch) padding-box, 
                        linear-gradient(90deg,#ec4899,#8b5cf6) border-box;

                    border-radius:8px;
                    border:2px solid transparent;
                ">
                    Total PRs: ${totalPRs}
                </div>
            `}
        </div>

    </div>

</div>`;
}
/* ====================================================
   RENDER PRINCIPAL
   ==================================================== */
export async function renderMetricas() {

    const containerMain = document.getElementById("container-main");

    /* === valores previos === */
    const prevDesde = document.getElementById("select-desde")?.value || null;
    const prevHasta = document.getElementById("select-hasta")?.value || null;
    const prevAlumno = document.getElementById("select-alumno")?.value || "";

    /* === fetch usuarios === */
    const respUsers = await authHelper.fetchWithAuth("http://localhost:5099/api/Usuarios");
    let usuarios = await respUsers.json();
    usuarios = usuarios.filter(n => n.rolId == 3); // solo alumnos

    /* === primer render === */
    containerMain.innerHTML = metricasHtml(null, usuarios);

    /* === asignar inputs === */
    const inputDesde = document.getElementById("select-desde");
    const inputHasta = document.getElementById("select-hasta");
    const inputAlumno = document.getElementById("select-alumno");

    let desde = prevDesde || new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    let hasta = prevHasta || new Date().toISOString().slice(0, 10);

    inputDesde.value = desde;
    inputHasta.value = hasta;
    inputAlumno.value = prevAlumno;

    /* ==========================================================
       FETCH PLANES
    ========================================================== */
    const params = new URLSearchParams();
    params.append("desde", desde + "Z");
    params.append("hasta", hasta + "Z");
    if (prevAlumno !== "") params.append("idAlumno", prevAlumno);

    const respPlanes = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/AlumnoPlan/?" + params.toString()
    );
    const planes = await respPlanes.json();


    const paramsRP = new URLSearchParams();
    if (prevAlumno !== "") paramsRP.append("idAlumno", prevAlumno);

    const respRecords = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/RecordPersonal/?" + paramsRP.toString()
    );
    const records = await respRecords.json();


    const hoy = new Date();
    const hace7dias = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const paramsSR = new URLSearchParams();
    paramsSR.append("Desde", hace7dias.toISOString().slice(0, 10) + "Z");
    paramsSR.append("Hasta", hoy.toISOString().slice(0, 10) + "Z");

    const respSesiones = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/SesionRealizada?" + paramsSR.toString()
    );
    const sesiones = await respSesiones.json();



    const planesFiltrados = planes;


    const progresos = planesFiltrados.map(p => Number(p.progresoPorcentaje) || 0);
    const adherencias = planesFiltrados.map(p => Number(p.adherenciaPorcentaje) || 0);

    const promedioProgresoGlobal =
        progresos.length ? progresos.reduce((a, b) => a + b, 0) / progresos.length : 0;

    const promedioAdherenciaGlobal =
        adherencias.length ? adherencias.reduce((a, b) => a + b, 0) / adherencias.length : 0;



    let fuerzaData = [];
    if (prevAlumno !== "") {
        fuerzaData = records
            .filter(r =>
                r.calculo1RM > 0 &&
                r.fechaRegistro &&
                r.fechaRegistro !== "0001-01-01T00:00:00"
            )
            .sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))
            .map(r => ({
                fecha: r.fechaRegistro.slice(0, 10),
                valor: Number(r.calculo1RM)
            }));
    }



    const prMap = {};
    records.forEach(r => {
        if (!r.nombreEjercicio) return;
        if (!prMap[r.nombreEjercicio]) prMap[r.nombreEjercicio] = 0;
        prMap[r.nombreEjercicio]++;
    });

    const prs = Object.entries(prMap)
        .map(([name, prs]) => ({ name, prs }))
        .sort((a, b) => b.prs - a.prs);

    const totalPRs = prs.reduce((acc, x) => acc + x.prs, 0);



    let fuerzaRelativaGlobal = 0;
    let fuerzaRelativaAlumno = null;

    const recordsValidos = records.filter(
        r => r.pesoMax > 0 && r.calculo1RM > 0
    );

    if (prevAlumno !== "") {
        const recordsAlumno = recordsValidos.filter(
            r => r.idAlumno === prevAlumno
        );

        if (recordsAlumno.length > 0) {
            fuerzaRelativaAlumno =
                recordsAlumno.reduce(
                    (acc, r) => acc + (r.calculo1RM / r.pesoMax),
                    0
                ) / recordsAlumno.length;
        }
    }

    const alumnosConRecords = new Set(recordsValidos.map(r => r.idAlumno)).size;

    if (alumnosConRecords > 0) {
        const sumaRelativa = recordsValidos.reduce(
            (acc, r) => acc + (r.calculo1RM / r.pesoMax),
            0
        );
        fuerzaRelativaGlobal = sumaRelativa / alumnosConRecords;
    }




    // IDs que entrenaron
    const alumnosQueEntrenaron = new Set(
        sesiones.map(s => s.idAlumno)
    );

    // alumnos = lista completa (rolId=3)
    const alumnosSinEntrenar = usuarios.filter(u => !alumnosQueEntrenaron.has(u.id));
    console.log(alumnosSinEntrenar)
    const porcentajeSinEntrenar =
        usuarios.length > 0
            ? (alumnosSinEntrenar.length / usuarios.length) * 100
            : 0;



    const result = {
        planesFiltrados,
        promedioProgresoGlobal,
        promedioAdherenciaGlobal,
        cantidadRecordsPersonales: records.length,
        fuerzaData,
        prs,
        totalPRs,
        fuerzaRelativaGlobal,
        fuerzaRelativaAlumno,
        alumnosSinEntrenar,
        porcentajeSinEntrenar
    };

    containerMain.innerHTML = metricasHtml(result, usuarios, prevAlumno);

    /* === restaurar valores === */
    document.getElementById("select-desde").value = desde;
    document.getElementById("select-hasta").value = hasta;
    document.getElementById("select-alumno").value = prevAlumno;

    attachListeners();

    /* === Render gráfico === */
    if (prevAlumno !== "" && fuerzaData.length > 0) {
        const ctx = document.getElementById("chartFuerza");
        if (ctx) {
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: fuerzaData.map(f => f.fecha),
                    datasets: [{
                        data: fuerzaData.map(f => f.valor),
                        borderColor: "#3b82f6",
                        borderWidth: 3,
                        tension: 0.3
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: "#oklch" } },
                        y: { ticks: { color: "#oklch" } }
                    }
                }
            });
        }
    }
}

function attachListeners() {
    const desde = document.getElementById("select-desde");
    const hasta = document.getElementById("select-hasta");
    const alumno = document.getElementById("select-alumno");

    if (!desde || !hasta || !alumno) return;


    desde.addEventListener("change", () => renderMetricas());
    hasta.addEventListener("change", () => renderMetricas());
    alumno.addEventListener("change", () => renderMetricas());
}



function cleanupDynamicScripts() {
    const oldScripts = document.querySelectorAll("script[data-dynamic-script]");
    oldScripts.forEach(s => s.remove());
}


cleanupDynamicScripts();



