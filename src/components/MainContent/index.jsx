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
    
    useEffect(() => {
        const datesExcel = findData(selectedSubjectData, "Date de prélèvement");
        if (datesExcel) {
            datesExcel.shift()
            // Utilisation de 'map' pour créer un nouveau tableau avec des dates JavaScript
            const datesJs = datesExcel.map(date => getJsDateFromExcel(date));
            const datesFormatSimples = datesJs.map(date => 
                date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            );
            const options = datesFormatSimples.map((date, index) => ({
                value: index.toString(), // Utilisez une valeur unique comme index pour chaque option
                label: date // Utilisez la date comme label
            }));
            setDateRange(options)
            console.log(datesFormatSimples)
        }
    }, [selectedSubjectData]); // Ajout de 'selectedSubjectData' en tant que dépendance

    return (
        <div className={styles.container}>
            {dateRange && (
                <Select options={dateRange} isMulti></Select>
            )}
        </div>
    );
};

export default MainContent;