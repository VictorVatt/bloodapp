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
    if(subject === '') {
      setSelectedSubjectData([]);
    } else {
      const subjectData = allData.filter(item => item.subject === subject); // Assurez-vous que 'subject' correspond au champ du sujet dans vos données
      setSelectedSubjectData(subjectData);
    }
  };

  return (
    <DataContext.Provider value={{ allData, selectedSubjectData, importData, changeSubject, selectedSubject }}>
      {children}
    </DataContext.Provider>
  );
};
