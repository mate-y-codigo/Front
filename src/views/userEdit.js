import { userEditHtml } from "../components/userEditHtml.js";
import { usersRender } from "./users.js";
import { headerTxt } from "../config/headerTxt.js";
import { updateUser } from "../services/userApi.js";
import { showToast } from "./toast.js";
import { AppModal } from "./modalNotice.js";

export async function userEditRender(user) {
  const container = document.getElementById("container-main");
  if (!container) return;

  // Header
  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.userEdit) {
    headerH1.textContent = headerTxt.userEdit.h1;
    headerP.textContent = headerTxt.userEdit.p;
  }

  container.classList.add("opacity-0", "scale-95", "transition-all", "duration-300");
  container.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
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

        const dto = {
          nombre: raw.nombre?.trim() || null,
          apellido: raw.apellido?.trim() || null,
          celular: raw.celular?.trim() || null,
          peso: raw.peso ? Number(raw.peso) : null,
          altura: raw.altura ? Number(raw.altura) : null,
          activo: activeCheckbox ? !!activeCheckbox.checked : undefined,
        };

        console.log("DTO a enviar en updateUser:", dto);

        await updateUser(user.id, dto);
        showToast("Alumno editado correctamente");

        goBack();
      } catch (err) {
        console.error("Error actualizando usuario:", err);
        AppModal.open({
          iconHTML: '<span class="material-symbols-outlined text-red-600 text-5xl">error</span>',
          titleText: "Error al modificar los datos del alumno",
          messageText: err?.message || "No se pudo modificar el alumno."
        });
        btnSave.disabled = false;
        btnSave.textContent = originalText;
      }
    });

    container.classList.remove("opacity-0", "scale-95");
    container.classList.add("opacity-100", "scale-100");
  }, 100);
}
