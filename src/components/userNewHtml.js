export function userNewHtml() {
  return `
    <div class="page-enter page-user-new">

      <!-- Card principal: reutilizamos estilos del modal -->
      <div class="modal-user user-new-card flex flex-col">

        <!-- Título -->
        <div class="flex flex-col space-y-1.5 mb-4">
          <h1 class="ubuntu-medium text-xl">Nuevo alumno</h1>
          <p class="ubuntu-regular text-sm text-muted-foreground">
            Completá los datos para registrar un nuevo alumno.
          </p>
        </div>

        <!-- Formulario -->
        <div class="w-full flex-1">
          <form id="student-new-form" class="space-y-6">

            <input type="hidden" name="rol" value="3" />
            <input type="hidden" name="activo" value="true" />

            <!-- Email + contraseña -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-email">Email *</label>
                <input
                  id="student-email"
                  name="email"
                  type="email"
                  class="input"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-password">Contraseña *</label>
                <input
                  id="student-password"
                  name="password"
                  type="password"
                  class="input"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <!-- Nombre + Apellido -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-firstname">Nombre *</label>
                <input
                  id="student-firstname"
                  name="nombre"
                  class="input"
                  placeholder="Juan"
                  required
                />
              </div>
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-lastname">Apellido *</label>
                <input
                  id="student-lastname"
                  name="apellido"
                  class="input"
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            <!-- Celular + Peso + Altura -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 space-y-2">
                <label class="ubuntu-regular text-sm" for="student-phone">Celular *</label>
                <input
                  id="student-phone"
                  name="celular"
                  class="input"
                  placeholder="+54 9 11 1234 5678"
                  required
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
                />
              </div>
            </div>

          </form>
        </div>

        <!-- Botones abajo -->
        <div class="mt-8 modal-user-actions">
          <button
            id="student-new-cancel"
            type="button"
            class="button-cancel"
          >
            Cancelar
          </button>
          <button
            id="student-new-save"
            type="submit"
            form="student-new-form"
            class="button"
          >
          <span class="material-symbols-outlined">add</span>
            Guardar Alumno
          </button>
        </div>
      </div>
    </div>
  `;
}
