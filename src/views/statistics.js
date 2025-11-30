import { authHelper } from "../helpers/authHelper.js";

/* ====================================================
   SPINNER
   ==================================================== */
function spinnerHTML() {
    return `
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
        <div style="padding:30px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

            <h2 style="font-size:25px;margin-bottom:15px;color:#9ca3af">
                Dashboard de planes
            </h2>

            <div style="display:flex;gap:10px;margin-bottom:25px;">

                <select id="select-alumno" style="
                    padding:10px 14px;border-radius:8px;
                    background:#111827;border:1px solid #374151;
                    color:#e5e7eb;min-width:180px;">
                    <option value="">Todos los alumnos</option>
                    ${usuarios.map(u => `
                        <option value="${u.id}">${u.nombre} ${u.apellido}</option>
                    `).join("")}
                </select>

                <input type="date" id="select-desde" style="
                    padding:10px 14px;border-radius:8px;
                    background:#111827;border:1px solid #374151;
                    color:#e5e7eb;">

                <input type="date" id="select-hasta" style="
                    padding:10px 14px;border-radius:8px;
                    background:#111827;border:1px solid #374151;
                    color:#e5e7eb;">
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
<div style="padding:30px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

    <h2 style="font-size:25px;margin-bottom:15px;color:#9ca3af">
        Dashboard de planes
    </h2>

    <!-- Selectores -->
    <div style="display:flex;gap:10px;margin-bottom:25px;">
        <select id="select-alumno" style="
            padding:10px 14px;border-radius:8px;
            background:#111827;border:1px solid #374151;
            color:#e5e7eb;min-width:180px;">
            <option value="">Todos los alumnos</option>
            ${usuarios.map(u => `
                <option value="${u.id}">${u.nombre} ${u.apellido}</option>
            `).join("")}
        </select>

        <input type="date" id="select-desde" style="
            padding:10px 14px;border-radius:8px;
            background:#111827;border:1px solid #374151;color:#e5e7eb;">

        <input type="date" id="select-hasta" style="
            padding:10px 14px;border-radius:8px;
            background:#111827;border:1px solid #374151;color:#e5e7eb;">
    </div>

    <!-- KPIs -->
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin-bottom:25px;">
        
        <!-- Progreso -->
        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Progreso global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#4f46e5;">
                ${promedioProgresoGlobal.toFixed(1)}%
            </div>
        </div>

        <!-- Adherencia -->
        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Adherencia global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#06b6d4;">
                ${promedioAdherenciaGlobal.toFixed(1)}%
            </div>
        </div>

        <!-- Records -->
        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Records Personales</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#10b981;">
                ${cantidadRecordsPersonales}
            </div>
        </div>

        <!-- Cantidad de planes -->
        <div style="
            background:#111827;
            border:1px solid #1e2536;
            border-radius:14px;
            padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Cantidad de planes</span>
            <div style="
                font-size:32px;
                font-weight:bold;
                margin-top:5px;
                color:#fbbf24;">
                ${planesFiltrados.length}
            </div>
        </div>

        <!-- Fuerza Relativa -->
        <div style="
            background:#111827;
            border:1px solid #1e2536;
            border-radius:14px;
            padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Fuerza Relativa</span>
            <div style="
                font-size:28px;
                font-weight:bold;
                margin-top:5px;
                color:#8b5cf6;">
                ${fuerzaRelativaGlobal.toFixed(2)}
            </div>

            <div style="color:#9ca3af;font-size:12px;margin-top:4px;">
                Alumno: ${fuerzaRelativaAlumno !== null ? fuerzaRelativaAlumno.toFixed(2) : "-"}
            </div>
        </div>

        <!-- 🔥 KPI NUEVO: Alumnos sin entrenar últimos 7 días -->
        <div style="
            background:#111827;
            border:1px solid #1e2536;
            border-radius:14px;
            padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Alumnos sin entrenar (7 días)</span>

            <div style="
                font-size:32px;
                font-weight:bold;
                margin-top:5px;
                color:#ef4444;">
                ${porcentajeSinEntrenar.toFixed(1)}%
            </div>

            <div style="color:#9ca3af;font-size:12px;margin-top:4px;">
                ${alumnosSinEntrenar.length} de ${usuarios.length}
            </div>
        </div>

    </div>

    <!-- Tabla -->
    <div style="background:#111827;padding:20px;border-radius:12px;border:1px solid #1e2536;margin-bottom:20px">
        <h3 style="margin-bottom:15px;font-size:20px;">Planes (${planesFiltrados.length})</h3>

        ${planesFiltrados.length === 0
            ? `<div style="padding:20px;text-align:center;color:#9ca3af;border:1px dashed #374151;border-radius:8px;">
                   No se encontraron planes.
               </div>`
            : `
                <table style="width:100%;border-collapse:collapse;">
                    <thead>
                        <tr style="color:#9ca3af;text-align:left;">
                            <th>Alumno</th>
                            <th>Inicio</th>
                            <th>Progreso</th>
                            <th>Adherencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${planesFiltrados.map(p => `
                            <tr>
                                <td>${p.nombreAlumno}</td>
                                <td>${p.fechaInicio?.slice(0, 10)}</td>
                                <td>${p.progresoPorcentaje}%</td>
                                <td>${p.adherenciaPorcentaje}%</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `}
    </div>


    <!-- 🔥 LISTADO DE ALUMNOS SIN ENTRENAR (7 días) -->
    <div style="
        background:#111827;
        border-radius:12px;
        border:1px solid #1e2536;
        padding:20px;
        margin-bottom:25px;
    ">

        <h3 style="font-size:20px;margin-bottom:15px;">Alumnos sin entrenar (últimos 7 días)</h3>

        ${alumnosSinEntrenar.length === 0 ? `
            <div style="
                padding:20px;text-align:center;color:#9ca3af;
                border:1px dashed #374151;border-radius:8px;">
                Todos entrenaron en los últimos 7 días 🎉
            </div>
        ` :
            alumnosSinEntrenar.map(a => `
            <div style="margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>${a.nombre} ${a.apellido}</span>
                    <span style="color:#ef4444;font-weight:bold">0 sesiones</span>
                </div>

                <div style="height:8px;background:#1f2937;border-radius:6px;">
                    <div style="
                        height:100%;
                        width:0%;
                        background:linear-gradient(90deg,#ef4444,#b91c1c);
                        border-radius:6px;">
                    </div>
                </div>
            </div>
        `).join("")}
    </div>


    <!-- Gráficos -->
    <div style="display:flex; ${alumnoSeleccionado === "" ? "" : "gap:20px;"} margin-bottom:25px;">

        <!-- Fuerza -->
        ${alumnoSeleccionado === "" ? `` : `
        <div style="
            flex:1;
            background:#111827;border-radius:12px;
            border:1px solid #1e2536;padding:20px;">
            
            <h3 style="font-size:20px;margin-bottom:10px;">Progreso de Fuerza (1RM)</h3>

            <canvas id="chartFuerza"></canvas>
        </div>`}

        <!-- PRs -->
        <div style="
            flex:1;
            background:#111827;border-radius:12px;
            border:1px solid #1e2536;padding:20px;">
            
            <h3 style="font-size:20px;margin-bottom:15px;">PRs por ejercicio</h3>

            ${prs.length === 0 ? `
                <div style="
                    padding:20px;text-align:center;color:#9ca3af;
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

                        <div style="height:8px;background:#1f2937;border-radius:6px;">
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
                    background:#0f172a;border:1px solid #1e2536;
                    padding:12px;border-radius:8px;margin-top:15px;
                    font-size:22px;font-weight:bold;color:#ec4899;text-align:center;">
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


    /* ==========================================================
       FETCH RECORD PERSONAL
    ========================================================== */
    const paramsRP = new URLSearchParams();
    if (prevAlumno !== "") paramsRP.append("idAlumno", prevAlumno);

    const respRecords = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/RecordPersonal/?" + paramsRP.toString()
    );
    const records = await respRecords.json();


    /* ==========================================================
       FETCH SESIONES REALIZADAS (últimos 7 días SIEMPRE)
    ========================================================== */

    // Hoy → Últimos 7 días
    const hoy = new Date();
    const hace7dias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const paramsSR = new URLSearchParams();
    paramsSR.append("Desde", hace7dias.toISOString().slice(0, 10) + "Z");
    paramsSR.append("Hasta", hoy.toISOString().slice(0, 10) + "Z");

    const respSesiones = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/SesionRealizada?" + paramsSR.toString()
    );
    const sesiones = await respSesiones.json();


    /* =====================================================================
       PROCESS DATA
    ===================================================================== */

    const planesFiltrados = planes;

    /* === Progreso / Adherencia === */
    const progresos = planesFiltrados.map(p => Number(p.progresoPorcentaje) || 0);
    const adherencias = planesFiltrados.map(p => Number(p.adherenciaPorcentaje) || 0);

    const promedioProgresoGlobal =
        progresos.length ? progresos.reduce((a, b) => a + b, 0) / progresos.length : 0;

    const promedioAdherenciaGlobal =
        adherencias.length ? adherencias.reduce((a, b) => a + b, 0) / adherencias.length : 0;


    /* =====================================================================
       Fuerza (1RM vs Fecha)
    ===================================================================== */
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


    /* =====================================================================
       PRs por ejercicio
    ===================================================================== */
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


    /* =====================================================================
       Fuerza Relativa (1RM / peso)
    ===================================================================== */
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


    /* =====================================================================
       NUEVO KPI — Alumnos SIN ENTRENAR en 7 días
    ===================================================================== */

    // IDs que entrenaron
    const alumnosQueEntrenaron = new Set(
        sesiones.map(s => s.idAlumno)
    );

    // alumnos = lista completa (rolId=3)
    const alumnosSinEntrenar = usuarios.filter(u => !alumnosQueEntrenaron.has(u.id));

    const porcentajeSinEntrenar =
        usuarios.length > 0
            ? (alumnosSinEntrenar.length / usuarios.length) * 100
            : 0;


    /* =====================================================================
       RESULTADO
    ===================================================================== */
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

    /* =====================================================================
       RENDER FINAL
    ===================================================================== */
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
                        x: { ticks: { color: "#e5e7eb" } },
                        y: { ticks: { color: "#e5e7eb" } }
                    }
                }
            });
        }
    }
}
/* ====================================================
   LISTENERS (se vuelven a conectar en cada render)
   ==================================================== */
function attachListeners() {
    const desde = document.getElementById("select-desde");
    const hasta = document.getElementById("select-hasta");
    const alumno = document.getElementById("select-alumno");

    if (!desde || !hasta || !alumno) return;

    // Cada cambio vuelve a ejecutar renderMetricas()
    desde.addEventListener("change", () => renderMetricas());
    hasta.addEventListener("change", () => renderMetricas());
    alumno.addEventListener("change", () => renderMetricas());
}


/* ====================================================
   SCRIPT CLEANUP — elimina scripts viejos del gráfico
   ==================================================== */
function cleanupDynamicScripts() {
    const oldScripts = document.querySelectorAll("script[data-dynamic-script]");
    oldScripts.forEach(s => s.remove());
}

// Se ejecuta antes de cada render dinámico
cleanupDynamicScripts();


/* ====================================================
   FIN DEL ARCHIVO
   ==================================================== */
