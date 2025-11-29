function escapeHtml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {{ id:string, email?:string, nombre?:string, apellido?:string, celular?:string, peso?:number|null, altura?:number|null, activo?:boolean }} user
 */
export function userEditHtml(user) {
  const email = escapeHtml(user.email ?? "");
  const nombre = escapeHtml(user.nombre ?? "");
  const apellido = escapeHtml(user.apellido ?? "");
  const celular = escapeHtml(user.celular ?? "");
  const peso = user.peso != null ? String(user.peso) : "";
  const altura = user.altura != null ? String(user.altura) : "";
  const isActive = user.activo !== false;

  return `
    <div class="page-enter page-user-edit">
      <div class="modal-user user-edit-card flex flex-col">

        <!-- Título -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h1 class="ubuntu-medium text-xl">Editar alumno</h1>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            Modificá los datos del alumno. El correo y la contraseña no pueden editarse desde esta pantalla.
          </p>
        </div>

        <!-- Datos de acceso (solo lectura) -->
        <section class="space-y-4 mb-4">
          <h2 class="ubuntu-medium text-sm text-muted-foreground">
            Datos de acceso
          </h2>

          <div class="flex flex-col md:flex-row gap-4">
            <!-- Email readonly -->
            <div class="flex-1 space-y-2">
              <label class="ubuntu-regular text-sm" for="student-email-readonly">Email</label>
              <input
                id="student-email-readonly"
                type="email"
                class="input"
                value="${email}"
                readonly
                disabled
              />
            </div>

            <!-- Password readonly + toggle mostrar -->
            <div class="flex-1 space-y-2">
              <label class="ubuntu-regular text-sm" for="student-password-readonly">Contraseña</label>
              <div class="flex gap-2 items-stretch">
                <input
                  id="student-password-readonly"
                  type="password"
                  class="input flex-1"
                  value="********"
                  readonly
                  disabled
                />
                <button
                  id="student-password-toggle"
                  type="button"
                  class="button-small"
                  title="Mostrar / ocultar contraseña"
                >
                  <span class="material-symbols-outlined" id="student-password-toggle-icon">visibility</span>
                </button>
              </div>
              <p class="text-xs text-muted-foreground">
                Por seguridad, la contraseña real no se recupera desde el servidor. Este campo es solo ilustrativo.
              </p>
            </div>
          </div>
        </section>

        <!-- Formulario (solo campos del UsuarioUpdateDto) -->
        <div class="w-full flex-1">
          <form id="student-edit-form" class="space-y-6">

            <!-- Nombre + Apellido -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-firstname">Nombre</label>
                <input
                  id="student-firstname"
                  name="nombre"
                  class="input"
                  placeholder="Juan"
                  value="${nombre}"
                />
              </div>
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-lastname">Apellido</label>
                <input
                  id="student-lastname"
                  name="apellido"
                  class="input"
                  placeholder="Pérez"
                  value="${apellido}"
                />
              </div>
            </div>

            <!-- Celular + Peso + Altura -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-phone">Celular</label>
                <input
                  id="student-phone"
                  name="celular"
                  class="input"
                  placeholder="+54 9 11 1234 5678"
                  value="${celular}"
                />
              </div>
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-weight">Peso (kg)</label>
                <input
                  id="student-weight"
                  name="peso"
                  type="number"
                  step="0.1"
                  min="0"
                  class="input"
                  placeholder="80"
                  value="${peso}"
                />
              </div>
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-height">Altura (cm)</label>
                <input
                  id="student-height"
                  name="altura"
                  type="number"
                  step="1"
                  min="0"
                  class="input"
                  placeholder="175"
                  value="${altura}"
                />
              </div>
            </div>

            <!-- Estado (solo UI, sin enviar al back todavía) -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-active">Estado</label>
                <div class="flex items-center gap-2">
                  <input
                    id="student-active"
                    type="checkbox"
                    ${isActive ? "checked" : ""}
                  />
                  <span id="student-active-label" class="text-sm">
                    ${isActive ? "Usuario activo" : "Usuario inactivo"}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground">
                  Este switch todavía no está conectado al backend. Se usará cuando se implemente el cambio de estado.
                </p>
              </div>
            </div>

          </form>
        </div>

        <!-- Botones abajo -->
        <div class="mt-8 modal-user-actions">
          <button
            id="student-edit-cancel"
            type="button"
            class="button-cancel"
          >
            Cancelar
          </button>
          <button
            id="student-edit-save"
            type="submit"
            form="student-edit-form"
            class="button"
          >
            <span class="material-symbols-outlined">edit_square</span>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  `;
}
