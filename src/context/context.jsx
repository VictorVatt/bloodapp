// src/context/DataContext.js
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [selectedSubjectData, setSelectedSubjectData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

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

  return (
    <DataContext.Provider value={{ allData, selectedSubjectData, importData, changeSubject, selectedSubject }}>
      {children}
    </DataContext.Provider>
  );
};


