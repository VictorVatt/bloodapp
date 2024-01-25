import styles from "./ImportData.module.css"
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelUploader() {
  const [columnHeaders, setColumnHeaders] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Supposons que nous lisons la première feuille de calcul
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          // Les en-têtes de colonne sont dans la première ligne
          setColumnHeaders(jsonData[0]);
        }
      };
      reader.readAsArrayBuffer(file);
      event.target.value = null; // Réinitialiser la valeur de l'input
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className={styles.button_container}>
      {columnHeaders.length > 0 && (
          <select className={styles.subject_list}>
            {columnHeaders.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        )}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button className={styles.import_button} onClick={handleButtonClick}>Importer un fichier Excel</button>
      </div>
    </div>
  );
}

export default ExcelUploader;

