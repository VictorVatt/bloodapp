import styles from "./ImportData.module.css"
import React, { useRef } from 'react';
import XLSX from 'xlsx';

function ExcelUploader() {
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          // Traiter le workbook ici
          console.log(workbook);
        } catch (error) {
          console.error("Erreur lors de la lecture du fichier:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <button onClick={handleButtonClick}>Importer un fichier Excel</button>
    </div>
  );
}

export default ExcelUploader;