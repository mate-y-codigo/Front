import { userEditHtml } from "../components/userEditHtml.js";
import { usersRender } from "./users.js";
import { headerTxt } from "../config/headerTxt.js";
import { updateUser } from "../services/userApi.js";

export async function userEditRender(user) {
  const container = document.getElementById("container-main");
  if (!container) return;

  // Header para "Editar alumno"
  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.userEdit) {
    headerH1.textContent = headerTxt.userEdit.h1;
    headerP.textContent = headerTxt.userEdit.p;
  }

  // Animación de entrada como en otras pantallas
  container.classList.add("opacity-0", "scale-95", "transition-all", "duration-300");
  container.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
    // Render de la vista
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
      usersRender();
    }

    btnCancel?.addEventListener("click", (e) => {
      e.preventDefault();
      goBack();
    });

    // Toggle "mostrar contraseña" (solo cambia el tipo, sigue siendo ilustrativa)
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

    // Actualizar texto del estado (UI + se usará para dto.activo)
    if (activeCheckbox && activeLabel) {
      const updateActiveLabel = () => {
        activeLabel.textContent = activeCheckbox.checked
          ? "Usuario activo"
          : "Usuario inactivo";
      };
      activeCheckbox.addEventListener("change", updateActiveLabel);
      updateActiveLabel();
    }

    form?.addEventListener("submit", async (e) => {
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
          activo: activeCheckbox ? !!activeCheckbox.checked : user.activo,
        };

        // Llamada al backend
        await updateUser(user.id, dto);

        // Volver al listado de alumnos
        goBack();
      } catch (err) {
        console.error("Error actualizando usuario:", err);
        alert(err.message || "No se pudo actualizar el alumno.");
        btnSave.disabled = false;
        btnSave.textContent = originalText;
      }
    });

    // fin animación
    container.classList.remove("opacity-0", "scale-95");
    container.classList.add("opacity-100", "scale-100");
  }, 100);
}
