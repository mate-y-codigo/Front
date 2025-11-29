import { userEditHtml } from "../components/userEditHtml.js";
import { usersRender } from "./users.js";
import { headerTxt } from "../config/headerTxt.js";

export async function userEditRender(user) {
  const container = document.getElementById("container-main");
  if (!container) return;

  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.userEdit) {
    headerH1.textContent = headerTxt.userEdit.h1;
    headerP.textContent = headerTxt.userEdit.p;
  }

  container.innerHTML = userEditHtml(user);

  const form = document.getElementById("student-edit-form");
  const btnCancel = document.getElementById("student-edit-cancel");
  const btnSave = document.getElementById("student-edit-save");

  const pwdInput = document.getElementById("student-password-readonly");
  const pwdToggleBtn = document.getElementById("student-password-toggle");
  const pwdToggleIcon = document.getElementById("student-password-toggle-icon");

  const activeCheckbox = document.getElementById("student-active");
  const activeLabel = document.getElementById("student-active-label");

  function goBack() {
    // Volvemos al listado de alumnos
    usersRender();
  }

  btnCancel?.addEventListener("click", (e) => {
    e.preventDefault();
    goBack();
  });

  // Toggle "mostrar contraseña" (solo cambia el tipo, sigue disabled)
  if (pwdInput && pwdToggleBtn && pwdToggleIcon) {
    pwdToggleBtn.addEventListener("click", () => {
      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        pwdToggleIcon.textContent = "visibility_off";
      } else {
        pwdInput.type = "password";
        pwdToggleIcon.textContent = "visibility";
      }
    });
  }

  // Actualizar texto del estado (solo UI por ahora)
  if (activeCheckbox && activeLabel) {
    const updateActiveLabel = () => {
      activeLabel.textContent = activeCheckbox.checked
        ? "Usuario activo"
        : "Usuario inactivo";
    };
    activeCheckbox.addEventListener("change", updateActiveLabel);
    updateActiveLabel();
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!btnSave) return;

    btnSave.disabled = true;
    const originalText = btnSave.textContent;
    btnSave.textContent = "Guardando...";

    try {
      const formData = new FormData(form);
      const raw = Object.fromEntries(formData.entries());

      // Armamos DTO según UsuarioUpdateDto
      const dto = {
        nombre: raw.nombre?.trim() || null,
        apellido: raw.apellido?.trim() || null,
        celular: raw.celular?.trim() || null,
        peso: raw.peso ? Number(raw.peso) : null,
        altura: raw.altura ? Number(raw.altura) : null,
        // activo: activeCheckbox?.checked ?? user.activo // <-- lo dejás comentado hasta tener el back
      };

      console.log("Alumno editado (DTO para backend):", {
        id: user.id,
        dto,
      });

      // TODO: cuando tengas el endpoint PUT /api/Usuarios/{id},
      // acá llamás a updateUser(user.id, dto) y luego:
      // await updateUser(user.id, dto);

      goBack();
    } catch (err) {
      console.error("Error armando DTO de edición:", err);
      btnSave.disabled = false;
      btnSave.textContent = originalText;
    }
  });
}
