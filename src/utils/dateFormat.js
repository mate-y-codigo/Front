export function dateFormat(isoString) {
    if(isoString === null)
        return '??-??-????';
    const date = new Date(isoString);

    // obtener partes
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // meses van de 0 a 11
    const year = date.getFullYear();

    // armar formato dd-mm-aaaa
    const formatted = `${day}-${month}-${year}`;
    return formatted; // "29-11-2025"
}

export function dateFormatSmall(isoString) {
    if(isoString === null)
        return '??-???';
    const date = new Date(isoString);

    // array de meses abreviados
    const meses = ["ene", "feb", "mar", "abr", "may", "jun",
        "jul", "ago", "sep", "oct", "nov", "dic"];

    const day = String(date.getDate()).padStart(2, "0");
    const month = meses[date.getMonth()]; // devuelve las 3 letras

    const formatted = `${day}-${month}`;
    return formatted; // "29-nov"
}


