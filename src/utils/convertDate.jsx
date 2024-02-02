function convertDateToExcelFormat(date) {
    // Créer un objet Date à partir de la date d'entrée
    const inputDate = new Date(date);

    // Définir la date de base d'Excel (1er janvier 1900)
    const excelBaseDate = new Date('1899-12-31');

    // Calculer la différence en jours
    const diffTime = Math.abs(inputDate - excelBaseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Ajuster pour le 29 février 1900
    if (inputDate > new Date('1900-02-28')) {
        return diffDays + 1;
    }

    return diffDays;
}

export default convertDateToExcelFormat