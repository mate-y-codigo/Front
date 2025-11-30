import { authHelper } from "../helpers/authHelper.js";

/* ===============================================
   SPINNER HTML (reutilizable dentro de metricasHtml)
   =============================================== */
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
            <span style="margin-left:12px;">Cargando métricas...</span>
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

/* ===============================================
   MÉTRICAS HTML (incluye spinner si no hay data)
   =============================================== */
export function metricasHtml(data = null) {

    if (!data) {
        return `
        <div style="padding:30px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

            <!-- TÍTULO Y SELECTORES -->


            <p style="color:#9ca3af;margin-bottom:25px;font-size:15px;">
                Dashboard de rendimiento
            </p>

            <div style="display:flex;gap:10px;margin-bottom:25px;">
                <select id="select-alumno" style="
                    padding:10px 14px;border-radius:8px;
                    background:#111827;border:1px solid #374151;
                    color:#e5e7eb;cursor:pointer;min-width:160px;
                ">
                    <option value="">Todos los alumnos</option>
                    <option value="1">Alumno 1</option>
                    <option value="2">Alumno 2</option>
                </select>

                <select id="select-rango" style="
                    padding:10px 14px;border-radius:8px;
                    background:#111827;border:1px solid #374151;
                    color:#e5e7eb;cursor:pointer;min-width:150px;
                ">
                    <option value="7">7 días</option>
                    <option value="14">14 días</option>
                    <option value="30">30 días</option>
                    <option value="56">8 semanas</option>
                    <option value="365">1 año</option>
                </select>
            </div>

            ${spinnerHTML()}
        </div>
        `;
    }

    const {
        grafiquitos,
        complianceHistory,
        strengthData,
        loadData,
        weeklyCompliance,
        sessionGapData,
        prs
    } = data;

    return `
<div style="padding:30px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

    <!-- TÍTULO -->
    <h1 style="
        font-size:3rem;font-weight:bold;
        background:linear-gradient(to right,#4f46e5,#06b6d4,#10b981);
        -webkit-background-clip:text;color:transparent;
        margin-bottom:5px;
    ">Métricas Grupales</h1>

    <p style="color:#9ca3af;margin-bottom:25px;font-size:15px;">
        Dashboard de rendimiento del equipo
    </p>

    <!-- SELECTORES -->
    <div style="display:flex;gap:10px;margin-bottom:25px;">
        <select id="select-alumno" style="
            padding:10px 14px;border-radius:8px;
            background:#111827;border:1px solid #374151;
            color:#e5e7eb;cursor:pointer;min-width:160px;
        ">
            <option value="">Todos los alumnos</option>
            <option value="1">Alumno 1</option>
            <option value="2">Alumno 2</option>
        </select>

        <select id="select-rango" style="
            padding:10px 14px;border-radius:8px;
            background:#111827;border:1px solid #374151;
            color:#e5e7eb;cursor:pointer;min-width:150px;
        ">
            <option value="7">7 días</option>
            <option value="14">14 días</option>
            <option value="30">30 días</option>
            <option value="56">8 semanas</option>
            <option value="365">1 año</option>
        </select>
    </div>

    <!-- KPIs -->
    <div style="
        display:grid;grid-template-columns:repeat(4,1fr);
        gap:20px;margin-bottom:35px;
    ">
        ${grafiquitos.map(k => `
            <div style="
                background:#111827;border:1px solid #1e2536;
                border-radius:14px;padding:20px;
            ">
                <span style="font-size:15px;color:#9ca3af;">${k.title}</span>
                <div style="font-size:30px;font-weight:bold;margin-top:5px;">${k.value}</div>
                <div style="font-size:13px;color:${k.color};margin-top:4px;">${k.delta}</div>
            </div>
        `).join("")}
    </div>

    <!-- GRID PRINCIPAL -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:25px;">

        <!-- IZQUIERDA -->
        <div style="display:flex;flex-direction:column;gap:25px;">

            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2>Cumplimiento Semanal</h2>
                <canvas id="weeklyComplianceChart"></canvas>
            </div>

            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2>Histórico de Cumplimiento</h2>
                <canvas id="complianceChart"></canvas>
            </div>

            <!-- PRs -->
            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2>PRs Últimos 42 Días</h2>

                ${prs.map(e => `
                    <div style="margin-bottom:16px;">
                        <div style="display:flex;justify-content:space-between;">
                            <span>${e.name}</span>
                            <span style="color:#ec4899;font-weight:bold">${e.prs} PRs</span>
                        </div>
                        <div style="height:8px;background:#1f2937;border-radius:6px;margin-top:4px;">
                            <div style="
                                height:100%;
                                width:${(e.prs / Math.max(...prs.map(x => x.prs))) * 100}%;
                                background:linear-gradient(90deg,#ec4899,#8b5cf6);
                                border-radius:6px;
                            "></div>
                        </div>
                    </div>
                `).join("")}

                <div style="
                    background:#0f172a;border:1px solid #1e2536;
                    padding:12px;border-radius:8px;margin-top:15px;
                    font-size:22px;font-weight:bold;color:#ec4899;text-align:center;
                ">Total PRs: ${prs.reduce((acc, x) => acc + x.prs, 0)}</div>
            </div>

        </div>

        <!-- DERECHA -->
        <div style="display:flex;flex-direction:column;gap:25px;">

            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2>Progreso de Fuerza (1RM Promedio)</h2>
                <canvas id="strengthChart"></canvas>
            </div>

            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2>Tiempo Entre Sesiones</h2>
                <canvas id="sessionGapChart"></canvas>
            </div>

        </div>
    </div>

    <!-- CARGA TOTAL -->
    <div style="
        background:#111827;border:1px solid #1e2536;
        padding:20px;border-radius:12px;margin-top:35px;
    ">
        <h2>Carga Total Semanal (Volumen)</h2>
        <canvas id="loadChart"></canvas>
    </div>

    <!-- SCRIPTS -->
    <script data-dynamic-script="true">
    (() => {
        const complianceHistory = ${JSON.stringify(complianceHistory)};
        const strengthData = ${JSON.stringify(strengthData)};
        const loadData = ${JSON.stringify(loadData)};
        const weeklyCompliance = ${JSON.stringify(weeklyCompliance)};
        const sessionGapData = ${JSON.stringify(sessionGapData)};

        function initCharts() {

            new Chart(document.getElementById("complianceChart"), {
                type: "bar",
                data: {
                    labels: complianceHistory.map(x => x.date),
                    datasets: [{ data: complianceHistory.map(x => x.compliance), backgroundColor: "#8b5cf6" }]
                },
                options: { plugins: { legend: { display: false } } }
            });

            new Chart(document.getElementById("weeklyComplianceChart"), {
                type:"bar",
                data:{
                    labels:weeklyCompliance.map(x=>x.day),
                    datasets:[{data:weeklyCompliance.map(x=>x.value), backgroundColor:"#06b6d4", borderRadius:6 }]
                },
                options:{plugins:{legend:{display:false}}}
            });

        new Chart(document.getElementById("strengthChart"), {
    type:"line",
    data:{
        labels:strengthData.map(x=>x.week),
        datasets:[{
            data:strengthData.map(x=>x.avg1RM), 
            borderColor:"#3b82f6", 
            borderWidth:3, 
            tension:0.3 
        }]
    },
    options:{plugins:{legend:{display:false}}}
});

            new Chart(document.getElementById("sessionGapChart"), {
                type:"line",
                data:{
                    labels:sessionGapData.map(x=>x.week),
                    datasets:[{data:sessionGapData.map(x=>x.days), borderColor:"#a855f7", borderWidth:3, tension:0.3 }]
                },
                options:{plugins:{legend:{display:false}}}
            });

            new Chart(document.getElementById("loadChart"), {
                type:"bar",
                data:{
                    labels:loadData.map(x=>x.week),
                    datasets:[{data:loadData.map(x=>x.load), backgroundColor:"#00e387" }]
                },
                options:{plugins:{legend:{display:false}}}
            });
        }

        initCharts();
    })();
    </script>

</div>`;
}


/* ===============================================
   EJECUTAR LOS SCRIPTS
   =============================================== */
export function executeDynamicScripts(container) {

    const scripts = container.querySelectorAll("script[data-dynamic-script='true']");
    scripts.forEach(oldScript => {
        const s = document.createElement("script");
        s.textContent = oldScript.textContent;
        s.dataset.injected = "true";
        document.body.appendChild(s);
        oldScript.remove();
    });
}


/* ===============================================
   LISTENERS
   =============================================== */
function attachFilterListeners() {
    const alumno = document.getElementById("select-alumno");
    const rango = document.getElementById("select-rango");

    if (!alumno || !rango) return;

    alumno.addEventListener("change", () => {
        renderMetricas();
    });

    rango.addEventListener("change", () => {
        renderMetricas(rango);
    });
}


/* ===============================================
   RENDER PRINCIPAL (con spinner incorporado)
   =============================================== */
export async function renderMetricas(rango) {
    const containerMain = document.getElementById("container-main");

    // Render del spinner
    containerMain.innerHTML = metricasHtml(null);

    const valorRango = rango?.value ?? 7;

    const hasta = new Date();
    const desde = new Date();
    desde.setDate(hasta.getDate() - parseInt(valorRango));

    const params = new URLSearchParams();
    params.append("idEntrenador", "0a358d6c-9e9d-43a0-8508-5990e7ad4414");
    params.append("desde", desde.toISOString().split("T")[0] + "Z");
    params.append("hasta", hasta.toISOString().split("T")[0] + "Z");

    const response = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/metricas/grupales?" + params.toString()
    );

    const d = await response.json();

    // Render de la vista completa
    containerMain.innerHTML = metricasHtml(d);

    // ⭐⭐⭐ RESTAURAR EL VALOR SELECCIONADO — LÍNEA CLAVE ⭐⭐⭐
    document.getElementById("select-rango").value = valorRango;

    executeDynamicScripts(containerMain);
    attachFilterListeners();
}
