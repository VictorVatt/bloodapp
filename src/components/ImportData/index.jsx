import styles from "./ImportData.module.css"
import PlayerProfile from "../PlayerProfile";
import React, { useRef, useState, useContext } from 'react';
import { DataContext } from "@/context/context";
import * as XLSX from 'xlsx';
import { useRouter } from 'next/router';



function ExcelUploader() {
  const [columnHeaders, setColumnHeaders] = useState([]);
  const { importData, changeSubject } = useContext(DataContext); // Utiliser le contexte
  const fileInputRef = useRef();
  const router = useRouter()
  const { selectedSubject } = useContext(DataContext)


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          setColumnHeaders(jsonData[0]);
          importData(jsonData); // Mettre à jour les données dans le contexte global;
        }
      };
      reader.readAsArrayBuffer(file);
      event.target.value = null;
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    changeSubject(selectedSubject, columnHeaders); // Mettre à jour les données filtrées dans le contexte
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const uniqueSubjects = Array.from(new Set(columnHeaders)).filter(element => element !== "Subject" && element !== "" && element !== undefined);
  console.log(uniqueSubjects)
  return (
    <div>
      <div className={styles.button_container}>
        {selectedSubject !== "" && (
          <PlayerProfile></PlayerProfile>
        )}
        <div>
        {columnHeaders.length > 0 && (
          <select className={styles.subject_list} onChange={handleSubjectChange}>
            <option value="">Sélectionnez un joueur</option> {/* Option vide */}
            {uniqueSubjects.map((header, index) => (
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

    </div>
  );
}

export default ExcelUploader;


