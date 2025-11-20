export function restrictToDigits(inputSelector, maxDigits = 5) {
    const input = document.querySelector(inputSelector);
    if (!input) return;

    input.addEventListener('input', () => {
        // Elimina cualquier carácter no numérico
        let digitsOnly = input.value.replace(/\D/g, '');

        // Limita la cantidad de dígitos
        if (digitsOnly.length > maxDigits) {
            digitsOnly = digitsOnly.slice(0, maxDigits);
        }

        // Actualiza el valor del input
        input.value = digitsOnly;
    });
}