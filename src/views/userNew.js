import { userNewHtml } from "../components/userNewHtml.js";
import { createUser } from "../services/userApi.js";
import { usersRender } from "./users.js";
import { headerTxt } from "../config/headerTxt.js";

export async function userNewRender() {
  const container = document.getElementById("container-main");
  if (!container) return;

  const headerH1 = document.getElementById("header-h1");
  const headerP = document.getElementById("header-p");
  if (headerH1 && headerP && headerTxt.userNew){
    headerH1.textContent = headerTxt.userNew.h1;
    headerP.textContent = headerTxt.userNew.p;
  }

  container.innerHTML = userNewHtml();

  const btnBack = document.getElementById("user-new-back");
  const btnCancel = document.getElementById("student-new-cancel");
  const form = document.getElementById("student-new-form");
  const btnSave = document.getElementById("student-new-save");

  const card = document.querySelector(".user-new-card");
  let errorBox = null;
  if (card) {
    const formWrapper = card.querySelector("form")?.parentElement || null;
    errorBox = document.createElement("p");
    errorBox.id = "user-new-error";
    errorBox.className = "user-new-error";
    errorBox.style.display = "none";

    if (formWrapper) {
      card.insertBefore(errorBox, formWrapper);
    } else {
      card.appendChild(errorBox);
    }
  }

  function showError(msg) {
    if (!errorBox) {
      alert(msg);
      return;
    }
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }

  function clearError() {
    if (errorBox) {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }
  }

  async function goBack() {
    await usersRender();
  }

  btnBack?.addEventListener("click", (e) => {
    e.preventDefault();
    goBack();
  });

  btnCancel?.addEventListener("click", (e) => {
    e.preventDefault();
    goBack();
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    if (!btnSave) return;

    btnSave.disabled = true;
    const originalText = btnSave.textContent;
    btnSave.textContent = "Guardando...";

    try {
      const formData = new FormData(form);
      const raw = Object.fromEntries(formData.entries());

      const dto = {
        email: (raw.email || "").trim(),
        password: raw.password || "",
        nombre: (raw.nombre || "").trim(),
        apellido: (raw.apellido || "").trim(),
        celular: raw.celular ? String(raw.celular).trim() : null,
        peso: raw.peso ? Number(raw.peso) : null,
        altura: raw.altura ? Number(raw.altura) : null,
        rolId: 3,
      };

      if (!dto.email || !dto.password || !dto.nombre || !dto.apellido) {
        throw new Error("Completá todos los campos obligatorios (*)");
      }
      if (dto.password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      }

      await createUser(dto);

      await goBack();
    } catch (err) {
      console.error("Error creando usuario:", err);
      showError(err.message || "No se pudo crear el alumno. Intentalo de nuevo.");
      btnSave.disabled = false;
      btnSave.textContent = originalText;
    }
  });
}
