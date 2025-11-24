function escAttr(value) {
    if (value == null) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export function modalStudentEditHtml(user) {
    const nombre  = escAttr(user?.nombre);
    const apellido = escAttr(user?.apellido);
    const email   = escAttr(user?.email);
    const celular = escAttr(user?.celular ?? user?.telefono);
    const peso    = escAttr(user?.peso);
    const altura  = escAttr(user?.altura);

    return `
      <div id="modal-overlay-student-edit"
           class="modal-user-overlay"
           role="dialog"
           aria-modal="true"
           tabindex="-1">

        <div id="modal-student-edit"
             class="modal-user modal-user-enter flex flex-col">

          <div class="flex flex-col space-y-1.5 mb-4">
            <h2 class="ubuntu-medium text-xl">Editar Alumno</h2>
          </div>

          <div class="w-full flex-1">
            <form id="student-edit-form" class="space-y-6">

              <!-- Email (solo lectura) -->
              <div class="space-y-2">
                <label class="ubuntu-regular text-sm" for="student-edit-email">
                  Email
                </label>
                <input
                  id="student-edit-email"
                  class="input"
                  type="email"
                  value="${email}"
                  disabled
                />
              </div>

              <!-- Nombre + Apellido -->
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 space-y-2">
                  <label class="ubuntu-regular text-sm" for="student-edit-firstname">
                    Nombre *
                  </label>
                  <input
                    id="student-edit-firstname"
                    name="nombre"
                    class="input"
                    value="${nombre}"
                    required
                  />
                </div>

                <div class="flex-1 space-y-2">
                  <label class="ubuntu-regular text-sm" for="student-edit-lastname">
                    Apellido *
                  </label>
                  <input
                    id="student-edit-lastname"
                    name="apellido"
                    class="input"
                    value="${apellido}"
                    required
                  />
                </div>
              </div>

              <!-- Celular + Peso + Altura -->
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1 space-y-2">
                  <label class="ubuntu-regular text-sm" for="student-edit-phone">
                    Celular *
                  </label>
                  <input
                    id="student-edit-phone"
                    name="celular"
                    class="input"
                    value="${celular}"
                    required
                  />
                </div>

                <div class="flex-1 space-y-2">
                  <label class="ubuntu-regular text-sm" for="student-edit-weight">
                    Peso (kg)
                  </label>
                  <input
                    id="student-edit-weight"
                    name="peso"
                    type="number"
                    step="0.1"
                    min="0"
                    class="input"
                    value="${peso}"
                  />
                </div>

                <div class="flex-1 space-y-2">
                  <label class="ubuntu-regular text-sm" for="student-edit-height">
                    Altura (cm)
                  </label>
                  <input
                    id="student-edit-height"
                    name="altura"
                    type="number"
                    step="1"
                    min="0"
                    class="input"
                    value="${altura}"
                  />
                </div>
              </div>

            </form>
          </div>

          <div class="mt-8 modal-user-actions">
            <button id="student-edit-cancel"
                    type="button"
                    class="button-small-cancel">
              Cancelar
            </button>
            <button id="student-edit-save"
                    type="submit"
                    form="student-edit-form"
                    class="button-small">
              Guardar
            </button>
          </div>
        </div>
      </div>
    `;
}
