export const validationHelper = {
  // Validar email con regex defensiva
  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  },

  // Validar contraseña con longitud mínima
  isValidPassword(password, minLength = 8) {
    if (!password || typeof password !== "string") return false;
    return password.trim().length >= minLength;
  },

  // Mostrar error en un div asociado
  showError(inputId, message) {
    const errorDiv = document.getElementById(`${inputId}-error`);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.classList.remove("hidden");
    }
  },

  // Limpiar error
  clearError(inputId) {
    const errorDiv = document.getElementById(`${inputId}-error`);
    if (errorDiv) {
      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");
    }
  }
};
