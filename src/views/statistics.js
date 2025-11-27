import { statisticsHtml } from '../components/statisticsHtml.js'
import { inputSuggestionIcon, inputSuggestion } from '../views/inputSuggestion.js'
import { modalStatisticsRender } from '../views/modalStatistics.js'

export function metricasHtml() {
    return `
<div style="padding:30px;background:#0a0f1c;min-height:100vh;color:#e5e7eb;font-family:Arial;">

    <!-- TÍTULO -->
    <h1 style="
        font-size:3rem;
        font-weight:bold;
        background:linear-gradient(to right,#4f46e5,#06b6d4,#10b981);
        -webkit-background-clip:text;
        color:transparent;
        margin-bottom:5px;
    ">Métricas Grupales</h1>

    <p style="color:#9ca3af;margin-bottom:25px;font-size:15px;">
        Dashboard de rendimiento del equipo
    </p>

    <!-- SELECTORES -->
    <div style="display:flex;gap:10px;margin-bottom:25px;">
        <select style="
            padding:10px 14px;
            border-radius:8px;
            background:#111827;
            border:1px solid #374151;
            color:#e5e7eb;
            cursor:pointer;
            min-width:160px;
        ">
            <option>Todos los alumnos</option>
            <option>Alumno 1</option>
            <option>Alumno 2</option>
        </select>

        <select style="
            padding:10px 14px;
            border-radius:8px;
            background:#111827;
            border:1px solid #374151;
            color:#e5e7eb;
            cursor:pointer;
            min-width:150px;
        ">
            <option>7 días</option>
            <option>14 días</option>
            <option>30 días</option>
            <option>8 semanas</option>
        </select>
    </div>

    <!-- KPIs (fila completa) -->
    <div style="
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:20px;
        margin-bottom:35px;
    ">
        ${[
            { icon: "🎯", title: "Cumplimiento Global", value: "87%", delta: "+5% vs anterior", color: "#4f46e5" },
            { icon: "📊", title: "Carga Total Semanal", value: "17.2k kg", delta: "+4.2% vs anterior", color: "#06b6d4" },
            { icon: "⏱️", title: "Tiempo Entre Sesiones", value: "2.5 días", delta: "-0.3 vs anterior", color: "#f43f5e" },
            { icon: "📈", title: "Alumnos con Progreso", value: "78%", delta: "+3% fuerza", color: "#10b981" },
        ].map(k => `
        <div style="
            background:#111827;
            border:1px solid #1e2536;
            border-radius:14px;
            padding:20px;
        ">
            <div style="display:flex;justify-content:space-between;">
                <span style="font-size:15px;color:#9ca3af;">${k.title}</span>
            </div>
            <div style="font-size:30px;font-weight:bold;margin-top:5px;">${k.value}</div>
            <div style="font-size:13px;color:${k.color};margin-top:4px;">${k.delta}</div>
        </div>
        `).join("")}
    </div>

    <!-- GRID PRINCIPAL 2 COLUMNAS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:25px;">

        <!-- COLUMNA IZQUIERDA -->
        <div style="display:flex;flex-direction:column;gap:25px;">

         <!-- CUMPLIMIENTO SEMANAL (BARRAS) -->
<div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
    <h2 style="font-size:18px;margin-bottom:15px;">Cumplimiento Semanal</h2>
    <canvas id="weeklyComplianceChart" height="140"></canvas>
</div>


            <!-- HISTÓRICO CUMPLIMIENTO -->
            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2 style="font-size:18px;margin-bottom:15px;">Histórico de Cumplimiento</h2>
                <canvas id="complianceChart" height="140"></canvas>
            </div>

            <!-- PRs -->
            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2 style="font-size:18px;margin-bottom:15px;">PRs Últimos 42 Días</h2>

                ${[
            { name: "Sentadilla", prs: 8 },
            { name: "Press Banca", prs: 6 },
            { name: "Peso Muerto", prs: 7 },
            { name: "Press Militar", prs: 5 },
            { name: "Dominadas", prs: 4 }
        ].map(e => `
                    <div style="margin-bottom:16px;">
                        <div style="display:flex;justify-content:space-between;">
                            <span>${e.name}</span>
                            <span style="color:#ec4899;font-weight:bold">${e.prs} PRs</span>
                        </div>
                        <div style="height:8px;background:#1f2937;border-radius:6px;margin-top:4px;">
                            <div style="
                                height:100%;
                                width:${(e.prs / 8) * 100}%;
                                background:linear-gradient(90deg,#ec4899,#8b5cf6);
                                border-radius:6px;
                            "></div>
                        </div>
                    </div>
                `).join("")}

                <div style="
                    background:#0f172a;
                    border:1px solid #1e2536;
                    padding:12px;
                    border-radius:8px;
                    margin-top:15px;
                    font-size:22px;
                    font-weight:bold;
                    color:#ec4899;
                    text-align:center;
                ">Total PRs: 30</div>

            </div>

        </div>

        <!-- COLUMNA DERECHA -->
        <div style="display:flex;flex-direction:column;gap:25px;">

            <!-- PROGRESO DE FUERZA -->
            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2 style="font-size:18px;margin-bottom:15px;">Progreso de Fuerza (1RM Promedio)</h2>
                <canvas id="strengthChart" height="140"></canvas>

                <div style="
                    background:#0f172a;
                    border:1px solid #1e2536;
                    margin-top:15px;
                    padding:12px;
                    border-radius:8px;
                    font-size:20px;
                    font-weight:bold;
                    color:#60a5fa;
                    text-align:center;
                ">Δ Total: +14.1%</div>
            </div>

            <!-- TIEMPO ENTRE SESIONES -->
            <div style="background:#111827;border:1px solid #1e2536;padding:20px;border-radius:12px;">
                <h2 style="font-size:18px;margin-bottom:15px;">Tiempo Entre Sesiones (Evolución)</h2>
                <canvas id="sessionGapChart" height="140"></canvas>

                <div style="
                    background:#0f172a;
                    border:1px solid #1e2536;
                    margin-top:15px;
                    padding:12px;
                    border-radius:8px;
                    font-size:20px;
                    font-weight:bold;
                    color:#a855f7;
                    text-align:center;
                ">Mejora: -21.9%</div>
            </div>

        </div>

    </div>

    <!-- CARGA TOTAL (FILA COMPLETA) -->
    <div style="
        background:#111827;
        border:1px solid #1e2536;
        padding:20px;
        border-radius:12px;
        margin-top:35px;
    ">
        <h2 style="font-size:18px;margin-bottom:15px;">Carga Total Semanal (Volumen)</h2>
        <canvas id="loadChart" height="160"></canvas>
    </div>


    <!-- SCRIPTS -->
    <script data-dynamic-script="true">

        const complianceHistory = [
            { date:"Sem 1", compliance:75 },
            { date:"Sem 2", compliance:82 },
            { date:"Sem 3", compliance:78 },
            { date:"Sem 4", compliance:88 },
            { date:"Sem 5", compliance:85 },
            { date:"Sem 6", compliance:90 },
            { date:"Sem 7", compliance:87 },
            { date:"Sem 8", compliance:92 }
        ];

        const strengthData = [
            { week:"Sem 1", avg1rm:85 },
            { week:"Sem 2", avg1rm:87 },
            { week:"Sem 3", avg1rm:89 },
            { week:"Sem 4", avg1rm:88 },
            { week:"Sem 5", avg1rm:91 },
            { week:"Sem 6", avg1rm:93 },
            { week:"Sem 7", avg1rm:95 },
            { week:"Sem 8", avg1rm:97 }
        ];

        const loadData = [
            { week:"Sem 1", load:12500 },
            { week:"Sem 2", load:13200 },
            { week:"Sem 3", load:14100 },
            { week:"Sem 4", load:13800 },
            { week:"Sem 5", load:15200 },
            { week:"Sem 6", load:15800 },
            { week:"Sem 7", load:16500 },
            { week:"Sem 8", load:17200 }
        ];
const weeklyCompliance = [
    { day: "L", value: 85 },
    { day: "M", value: 92 },
    { day: "X", value: 78 },
    { day: "J", value: 95 },
    { day: "V", value: 88 },
    { day: "S", value: 65 },
    { day: "D", value: 45 },
];

        const sessionGapData = [
            { week:"Sem 1", days:3.2 },
            { week:"Sem 2", days:2.8 },
            { week:"Sem 3", days:3.0 },
            { week:"Sem 4", days:2.9 },
            { week:"Sem 5", days:2.7 },
            { week:"Sem 6", days:2.6 },
            { week:"Sem 7", days:2.8 },
            { week:"Sem 8", days:2.5 }
        ];

        function initCharts() {

            // Cumplimiento
            new Chart(document.getElementById("complianceChart"), {
                type:"bar",
                data:{
                    labels:complianceHistory.map(x=>x.date),
                    datasets:[{
                        data:complianceHistory.map(x=>x.compliance),
                        backgroundColor:"#8b5cf6"
                    }]
                },
                options:{
                    plugins:{ legend:{display:false} },
                    scales:{
                        x:{ticks:{color:"#9ca3af"}},
                        y:{ticks:{color:"#9ca3af"}}
                    }
                }
            });
            // Cumplimiento Semanal (nuevo gráfico de barras)
            new Chart(document.getElementById("weeklyComplianceChart"), {
                type: "bar",
                data: {
                    labels: weeklyCompliance.map(x => x.day),
                    datasets: [{
                        data: weeklyCompliance.map(x => x.value),
                        backgroundColor: "#8b5cf6",
                        borderRadius: 6,
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: "#9ca3af" } },
                        y: { ticks: { color: "#9ca3af" }, suggestedMax: 100 }
                    }
                }
            });

            // Fuerza
            new Chart(document.getElementById("strengthChart"), {
                type:"line",
                data:{
                    labels:strengthData.map(x=>x.week),
                    datasets:[{
                        data:strengthData.map(x=>x.avg1rm),
                        borderColor:"#3b82f6",
                        borderWidth:3,
                        tension:0.3
                    }]
                },
                options:{
                    plugins:{ legend:{display:false} },
                    scales:{
                        x:{ticks:{color:"#9ca3af"}},
                        y:{ticks:{color:"#9ca3af"}}
                    }
                }
            });

            // Gap entre sesiones
            new Chart(document.getElementById("sessionGapChart"), {
                type:"line",
                data:{
                    labels:sessionGapData.map(x=>x.week),
                    datasets:[{
                        data:sessionGapData.map(x=>x.days),
                        borderColor:"#a855f7",
                        borderWidth:3,
                        tension:0.3
                    }]
                },
                options:{
                    plugins:{ legend:{display:false} },
                    scales:{
                        x:{ticks:{color:"#9ca3af"}},
                        y:{ticks:{color:"#9ca3af"}}
                    }
                }
            });

            // Carga total
            new Chart(document.getElementById("loadChart"), {
                type:"bar",
                data:{
                    labels:loadData.map(x=>x.week),
                    datasets:[{
                        data:loadData.map(x=>x.load),
                        backgroundColor:"#3b82f6"
                    }]
                },
                options:{
                    plugins:{ legend:{display:false} },
                    scales:{
                        x:{ticks:{color:"#9ca3af"}},
                        y:{ticks:{color:"#9ca3af"}}
                    }
                }
            });

        }

        initCharts();
    </script>

</div>
`;
}

export function executeDynamicScripts(container) {
    const scripts = container.querySelectorAll("script[data-dynamic-script='true']");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        oldScript.remove();
    });
}


export function renderMetricas() {
    const containerMain = document.getElementById("container-main");

    containerMain.innerHTML = metricasHtml();

    executeDynamicScripts(containerMain);
}