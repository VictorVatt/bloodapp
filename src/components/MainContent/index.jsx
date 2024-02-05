import useDataFinder from "@/utils/useDataFinder";
import styles from "./MainContent.module.css"
import { DataContext } from '@/context/context';
import Select from 'react-select';
import 'react-range-slider-input/dist/style.css';
import React, { useContext, useEffect, useState} from 'react';
import { getJsDateFromExcel } from "excel-date-to-js"

const MainContent = ({children}) => {
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
        if (datesExcel && datesExcel.length > 0) {
            datesExcel.shift(0)
            // Créer un tableau d'options avec les dates au format Excel et en français
            const options = datesExcel.map(dateExcel => ({
                value: dateExcel, // Utiliser la date Excel comme valeur
                label: getJsDateFromExcel(dateExcel)
                          .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            }));
            setDateRange(options);
            
            // Sélectionner par défaut la première date
            const defaultSelectedDate = options[0];
            setSelectedOptions([defaultSelectedDate]);
            
            // Mettre à jour les données de date du sujet sélectionné
            if (defaultSelectedDate) { // Vérifier que defaultSelectedDate est défini
                changeDate([defaultSelectedDate.value]);
            }
        }
    }, [selectedSubjectData, setSelectedOptions, changeDate]);
    

    return (
        <div className={styles.container}>
            {selectedSubjectData.length == 0 ? (
            <h2 className={styles.subjet_message}>Importez des données et/ou séléctionnez un sujet ! </h2>
            ) : (
            <div>
                <p className={styles.label}>Choisir une date</p>
                {dateRange && (
                <Select className={styles.date_picker} instanceId options={dateRange} isMulti onChange={handleSelectChange} value={selectedOptions}></Select>
                )}
                {children}
            </div>
            )}
            
        </div>
    );
};

export default MainContent;