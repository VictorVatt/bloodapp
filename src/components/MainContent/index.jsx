import useDataFinder from "@/utils/useDataFinder";
import styles from "./MainContent.module.css"
import { DataContext } from '@/context/context';
import Select from 'react-select';
import 'react-range-slider-input/dist/style.css';
import React, { useContext, useEffect, useState} from 'react';
import { getJsDateFromExcel } from "excel-date-to-js"

const MainContent = () => {
    const findData = useDataFinder()
    const { selectedSubjectData } = useContext(DataContext)
    const [dateRange, setDateRange] = useState([])
    const { selectedOptions, setSelectedOptions } = useContext(DataContext);
    const { changeDate } = useContext(DataContext);

    

    const handleSelectChange = (selectedDates) => {
        setSelectedOptions(selectedDates); // Mettre à jour le tableau des valeurs sélectionnées
    
        // Extraire les valeurs Excel des dates sélectionnées
        const datesExcel = selectedDates.map(option => option.value);
        changeDate(datesExcel);
    };
    
    

    useEffect(() => {
        const datesExcel = findData(selectedSubjectData, "Date de prélèvement");
        if (datesExcel) {
            datesExcel.shift();
            // Créer un tableau d'options avec les dates au format Excel et en français
            const options = datesExcel.map(dateExcel => ({
                value: dateExcel, // Utiliser la date Excel comme valeur
                label: getJsDateFromExcel(dateExcel)
                          .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            }));
            setDateRange(options);
        }
    }, [selectedSubjectData, setSelectedOptions]);
     // Ajout de 'selectedSubjectData' en tant que dépendance

    return (
        <div className={styles.container}>
            {dateRange && (
                <Select options={dateRange} isMulti onChange={handleSelectChange} value={selectedOptions}></Select>
            )}
        </div>
    );
};

export default MainContent;