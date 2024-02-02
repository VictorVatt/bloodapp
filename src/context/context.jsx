// src/context/DataContext.js
import React, { createContext, useState } from 'react';
// Autre fichier où vous voulez utiliser textDateToExcelDate
import convertDateToExcelFormat from "../utils/convertDate.jsx" // Ajustez le chemin d'accès selon la structure de votre projet


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [selectedSubjectData, setSelectedSubjectData] = useState([]);
  const [selectedSubjectDateData, setSelectedSubjectDateData] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([])

  const importData = (newData) => {
    setAllData(newData);
    // Réinitialiser les données du sujet sélectionné si nécessaire
  };

  const changeSubject = (subject) => {
    setSelectedSubject(subject);
  
    if (subject === 'Subject') {
      setSelectedSubjectData("Aucun sujet séléctionné");
    } else {
      // Trouver les indices des colonnes pour le sujet sélectionné
      const subjectColumnsIndices = allData[0].reduce((indices, currentSubject, index) => {
        if (currentSubject === subject) {
          indices.push(index);
        }
        return indices;
      }, []);
  
      // Filtrer et transformer les données pour chaque ligne
      const subjectData = allData.slice(1).map(row => {
        // Créer une nouvelle ligne avec uniquement les colonnes nécessaires
        const filteredRow = row.filter((_, index) => 
          index === 0 || index === 1 || subjectColumnsIndices.includes(index)
        );
  
        return filteredRow;
      });
  
      setSelectedSubjectData(subjectData);
    }
  };

  const changeDate = (selectedDatesExcel) => {
    // Trouver les indices des colonnes pour les dates sélectionnées et ajuster pour le décalage
    const dateColumnsIndices = selectedSubjectData[0].reduce((indices, currentDate, index) => {
        if (selectedDatesExcel.includes(currentDate)) {
            indices.push(index + 2); // Ajouter 2 pour compenser les deux premières colonnes
        }
        return indices;
    }, []);

    // Filtrer et transformer les données pour chaque ligne
    const dateData = selectedSubjectData.map(row => {
        // Filtrer chaque ligne selon les indices des dates sélectionnées (avec décalage)
        return row.filter((_, index) => 
            index === 0 || index === 1 || dateColumnsIndices.includes(index));
    });

    // Mettre à jour l'état avec les données filtrées
    setSelectedSubjectDateData(dateData);
};




  return (
    <DataContext.Provider value={{ 
      allData, 
      selectedSubjectData,
      selectedSubject, 
      selectedOptions,
      selectedSubjectDateData,
      setSelectedSubjectDateData,
      importData, 
      changeSubject,
      setSelectedOptions,
      changeDate}}>
      {children}
    </DataContext.Provider>
  );
};


