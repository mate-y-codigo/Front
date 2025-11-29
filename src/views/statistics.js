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
                <h1 style="
                    font-size:3rem;font-weight:bold;
                    background:linear-gradient(to right,#4f46e5,#06b6d4,#10b981);
                    -webkit-background-clip:text;color:transparent;
                    margin-bottom:5px;
                ">Métricas Grupales</h1>

                <p style="color:#9ca3af;margin-bottom:25px;font-size:15px;">
                    Dashboard de rendimiento del equipo
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

    // ---------------------------
    // SI HAY DATA → RENDER COMPLETO
    // ---------------------------

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

    <!-- GRÁFICOS MÁS LÓGICA → (NO LO REPITO ENTERO) -->
    ${/* TODO tu HTML igual que antes */""}

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

    alumno?.addEventListener("change", renderMetricas);
    rango?.addEventListener("change", renderMetricas);
}

/* ===============================================
   RENDER PRINCIPAL (con spinner incorporado)
   =============================================== */
export async function renderMetricas() {
    const containerMain = document.getElementById("container-main");

    containerMain.innerHTML = metricasHtml(null);

    const rango = document.getElementById("select-rango")?.value ?? "7";

    const hasta = new Date();
    const desde = new Date();
    desde.setDate(hasta.getDate() - parseInt(rango));

    const params = new URLSearchParams();
    params.append("idEntrenador", "0a358d6c-9e9d-43a0-8508-5990e7ad4414");
    params.append("desde", desde.toISOString().split("T")[0] + "Z");
    params.append("hasta", hasta.toISOString().split("T")[0] + "Z");

    const data = await authHelper.fetchWithAuth(
        "http://localhost:5098/api/metricas/grupales?" + params.toString()
    );

    containerMain.innerHTML = metricasHtml(data);

    executeDynamicScripts(containerMain);
    attachFilterListeners();
}
