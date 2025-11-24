function getUserInitials(user) {
    const fullName = `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim();
    if (!fullName) return "?";

    const parts = fullName.split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function userRowHtml(user) {
    return `
        <tr class="border-b border-border last:border-b-0">
            <!-- Nombre -->
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="h-9 w-9 rounded-full bg-accent flex items-center justify-center uppercase font-semibold text-primary-foreground">
                        ${getUserInitials(user)}
                    </div>
                    <div>
                        <div class="font-medium">
                            ${(user.nombre ?? "")} ${(user.apellido ?? "")}
                        </div>
                        <div class="text-xs text-muted-foreground">
                            Alumno
                        </div>
                    </div>
                </div>
            </td>

            <!-- Email -->
            <td class="px-6 py-4">
                ${user.email ?? "-"}
            </td>

            <!-- Teléfono -->
            <td class="px-6 py-4">
                ${user.telefono ?? user.celular ?? "-"}
            </td>

            <!-- Estado -->
            <td class="px-6 py-4">
                <span class="plan-type">
                    ${user.activo === false ? "Inactivo" : "Activo"}
                </span>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4">
                <div class="flex gap-2">
                    <!-- Editar -->
                    <button
                        class="button-small btn-edit-student"
                        style="width:2.25rem; padding-inline:0;"
                        title="Editar alumno"
                        data-user='${JSON.stringify(user)}'
                    >
                        <span class="material-symbols-outlined" style="font-size:18px;">edit_square</span>
                    </button>

                    <!-- Eliminar -->
                    <button
                        class="button-small-icon-red btn-delete-student"
                        style="width:2.25rem; padding-inline:0;"
                        title="Eliminar alumno"
                        data-user-id="${user.id ?? ""}"
                        data-user-name="${(user.nombre ?? "")} ${(user.apellido ?? "")}"
                    >
                        <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

/**
 * Componente HTML para la página de Usuarios/Alumnos
 * @param {{ users: any[] }} usersList
 */
export function usersHtml(usersList) {
    const list = usersList?.users ?? [];

    return `
        <div class="flex flex-col pt-6 pb-6 pl-20 pr-20">
            
            <!-- Bloque de filtros + botón Nuevo alumno -->
            <div>
                <div class="flex flex-col gap-4 p-6">

                    <div class="flex flex-col gap-4 md:flex-row md:items-center">
                        <!-- Buscador: ocupa todo el espacio posible -->
                        <div class="relative flex-1 min-w-[220px]">
                            <span class="material-symbols-outlined input-icon">search</span>
                            <input
                                id="students-search"
                                class="input-with-icon"
                                placeholder="Buscar por nombre o email..."
                                autocomplete="off"
                            />
                        </div>

                        <!-- Botones: filtro + nuevo alumno -->
                        <div class="flex items-center justify-end gap-3 md:flex-none">
                            <!-- Filtro de estado usando el mismo combobox -->
                            <div class="combobox" id="students-status-combobox" style="max-width: 140px;">
                                <button id="dropdown-button" type="button">
                                    <span id="students-filter-label">Todos</span>
                                    <span class="material-symbols-outlined" style="font-size:18px;">expand_more</span>
                                </button>

                                <div id="dropdown-menu" style="display: none;">
                                    <ul>
                                        <li data-value="all">Todos</li>
                                        <li data-value="active">Activo</li>
                                        <li data-value="inactive">Inactivo</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Nuevo alumno -->
                            <button
                                id="btn-new-student"
                                type="button"
                                class="button-small"
                                style="width:auto; min-width:9rem; padding-inline:0.85rem;"
                            >
                                <span class="material-symbols-outlined" style="font-size:18px;">group_add</span>
                                <span>Nuevo alumno</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bloque tabla de alumnos -->
            <div class="space-y-4">
                <h2 class="text-xl font-bold mb-2">Alumnos</h2>

                <div class="card-plan p-0 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead>
                            <tr class="border-b border-border bg-muted/40">
                                <th class="px-6 py-3 text-left font-semibold text-muted-foreground">Nombre</th>
                                <th class="px-6 py-3 text-left font-semibold text-muted-foreground">Email</th>
                                <th class="px-6 py-3 text-left font-semibold text-muted-foreground">Teléfono</th>
                                <th class="px-6 py-3 text-left font-semibold text-muted-foreground">Estado</th>
                                <th class="px-6 py-3 text-left font-semibold text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="students-table-body">
                            ${
                                list.length
                                    ? list.map((u) => userRowHtml(u)).join("")
                                    : `
                                        <tr>
                                            <td colspan="5" class="px-6 py-8 text-center text-muted-foreground">
                                                No hay alumnos registrados todavía.
                                            </td>
                                        </tr>
                                      `
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Contenedores para modales -->
        <div id="modal-open-user-detail"></div>
        <div id="modal-open-user-new"></div>
    `;
}
