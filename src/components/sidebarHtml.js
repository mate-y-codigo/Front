export function sidebarHtml() {
    return `        
        <div class="title p-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <span><img class="logo" src="/img/logo.png"></span>
                <span>
                    <h1 class="ubuntu-bold">FitCode</h1>
                </span>
            </div>
        </div>
        <div class="p-2">
            <ul id="main-menu" class="pt-4">
                <li>
                    <div id="page-home" class="sidebar-item active flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">home</span>
                        <span>Dashboard</span>
                    </div>
                </li>
                <li>
                    <div id="page-users" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">people</span>
                        <span>Usuarios</span>
                    </div>
                </li>
                <li>
                    <div id="page-exercises" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">fitness_center</span>
                        <span>Ejercicios</span>
                    </div>
                </li>
                <li>
                    <div id="page-plans" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">article</span>
                        <span>Planes</span>
                    </div>
                </li>
                <li>
                    <div id="page-assignments" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">article_person</span>
                        <span>Asignaciones</span>
                    </div>
                </li>
                <li>
                    <div id="page-registries" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">checklist_rtl</span>
                        <span>Registro</span>
                    </div>
                </li>
                <li>
                    <div id="page-statistics" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">bar_chart</span>
                        <span>Estadísticas</span>
                    </div>
                </li>
                <li>
                    <div id="page-payments" class="sidebar-item flex items-center gap-2 p-2 rounded">
                        <span class="material-symbols-outlined">credit_card</span>
                        <span>Pagos</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <button id="logout-btn" class="sidebar-item flex items-center gap-2 p-2 rounded w-full">
                <span class="material-symbols-outlined">logout</span>
                <span>Salir</span>
            </button>
        </div>`;
}