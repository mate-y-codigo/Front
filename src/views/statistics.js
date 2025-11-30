import { authHelper } from "../helpers/authHelper.js";

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

export function metricasHtml(data = null, usuarios = [], alumnoSeleccionado = "") {

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
        porcentajeRiesgo,
        alumnosEnRiesgo,
        totalAlumnos
    } = data;

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
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:20px;margin-bottom:25px;">
        
        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Progreso global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#4f46e5;">
                ${promedioProgresoGlobal.toFixed(1)}%
            </div>
        </div>

        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Adherencia global</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#06b6d4;">
                ${promedioAdherenciaGlobal.toFixed(1)}%
            </div>
        </div>

        <div style="background:#111827;border:1px solid #1e2536;border-radius:14px;padding:20px;">
            <span style="font-size:14px;color:#9ca3af;">Records Personales</span>
            <div style="font-size:32px;font-weight:bold;margin-top:5px;color:#10b981;">
                ${cantidadRecordsPersonales}
            </div>
        </div>
       <div style="
                background:#111827;
                border:1px solid #1e2536;
                border-radius:14px;
                padding:20px;
            ">
            <span style="font-size:14px;color:#9ca3af;">Cantidad de planes</span>
            <div style="
                font-size:32px;
                font-weight:bold;
                margin-top:5px;
                color:#fbbf24; /* amarillo dorado */
            ">
                ${planesFiltrados.length}
            </div>
        </div>
        <div style="
            background:#111827;
            border:1px solid #1e2536;
            border-radius:14px;
            padding:20px;
        ">
            <span style="font-size:14px;color:#9ca3af;">Alumnos en riesgo</span>
            <div style="
                font-size:32px;
                font-weight:bold;
                margin-top:5px;
                color:#ef4444;
            ">
                ${porcentajeRiesgo.toFixed(1)}%
            </div>
            <div style="color:#9ca3af;font-size:12px;margin-top:4px;">
                ${alumnosEnRiesgo.size} de ${totalAlumnos}
            </div>
        </div>

    </div>
 <!-- Tabla de planes -->
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
   <!-- 📊 Fuerza + PRs lado a lado -->
<div style="display:flex; ${alumnoSeleccionado === "" ? "" : "gap:20px;"} margin-bottom:25px;">

    <!-- 📌 Gráfico de Fuerza -->
    ${alumnoSeleccionado === "" ? `<div></div>` : `<div style="
        flex:1;
        background:#111827;border-radius:12px;
        border:1px solid #1e2536;padding:20px;">
        
        <h3 style="font-size:20px;margin-bottom:10px;">Progreso de Fuerza (1RM)</h3>

        ${alumnoSeleccionado === "" ? `
            <div style="
                padding:20px;text-align:center;color:#9ca3af;
                border:1px dashed #374151;border-radius:8px;">
                Seleccioná un alumno para ver su curva de fuerza.
            </div>
        ` : `
            <canvas id="chartFuerza"></canvas>
        `}
    </div>`}
    

    <!-- 🔥 PRs -->
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

function attachListeners() {
    const desde = document.getElementById("select-desde");
    const hasta = document.getElementById("select-hasta");
    const alumno = document.getElementById("select-alumno");

    if (!desde || !hasta || !alumno) return;

    desde.addEventListener("change", () => renderMetricas());
    hasta.addEventListener("change", () => renderMetricas());
    alumno.addEventListener("change", () => renderMetricas());
}

export async function renderMetricas() {

    const containerMain = document.getElementById("container-main");

    const prevDesde = document.getElementById("select-desde")?.value || null;
    const prevHasta = document.getElementById("select-hasta")?.value || null;
    const prevAlumno = document.getElementById("select-alumno")?.value || "";

    const respUsers = await authHelper.fetchWithAuth("http://localhost:5099/api/Usuarios");
    let usuarios = await respUsers.json();
    usuarios = usuarios.filter(n => n.rolId == 3)
    containerMain.innerHTML = metricasHtml(null, usuarios);

    const inputDesde = document.getElementById("select-desde");
    const inputHasta = document.getElementById("select-hasta");
    const inputAlumno = document.getElementById("select-alumno");

    let desde = prevDesde || new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
    let hasta = prevHasta || new Date().toISOString().slice(0, 10);

    inputDesde.value = desde;
    inputHasta.value = hasta;
    inputAlumno.value = prevAlumno;

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
    params.append("Desde", desde + "Z");
    params.append("Hasta", hasta + "Z");

    const respRecords = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/RecordPersonal/?" + paramsRP.toString()
    );
    const records = await respRecords.json();

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
            .filter(r => r.calculo1RM > 0 && r.fechaRegistro && r.fechaRegistro !== "0001-01-01T00:00:00")
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
    const hace2Semanas = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const alumnosEnRiesgo = new Set(
        planesFiltrados
            .filter(p => {
                const fecha = new Date(p.fechaInicio);
                return p.progresoPorcentaje === 0 && fecha <= hace2Semanas;
            })
            .map(p => p.idAlumno)
    );

    const totalAlumnos = new Set(planesFiltrados.map(p => p.idAlumno)).size;

    const porcentajeRiesgo =
        totalAlumnos > 0
            ? (alumnosEnRiesgo.size / totalAlumnos) * 100
            : 0;
    const result = {
        planesFiltrados,
        promedioProgresoGlobal,
        promedioAdherenciaGlobal,
        cantidadRecordsPersonales: records.length,
        fuerzaData,
        prs,
        totalPRs,
        porcentajeRiesgo,
        alumnosEnRiesgo,
        totalAlumnos
    };

    containerMain.innerHTML = metricasHtml(result, usuarios, prevAlumno);

    document.getElementById("select-desde").value = desde;
    document.getElementById("select-hasta").value = hasta;
    document.getElementById("select-alumno").value = prevAlumno;

    attachListeners();
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
