import styles from "./AlertCard.module.css"
import { DataContext } from '@/context/context';
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";


const AlertCard = ( { name, treshold } ) => {
    
    const { selectedSubjectData } = useContext(DataContext)
    const findData = useDataFinder()
    const [backgroundColorClass, setBackgroundColorClass] = useState("");
    const [data, setData] = useState()
    const [unit, setUnit] = useState()

    
    useEffect(() => {
      if (selectedSubjectData.length > 0) {
        console.log(name)
        const data = findData(selectedSubjectData, name)
        const unit = data[1]
        let lastData = data[data.length - 1]
        setBackgroundColorClass(lastData < treshold ? styles["bg-red"] : styles["bg-green"]);
        setData(lastData)
        setUnit(unit)
      }
  }, [selectedSubjectData]);

    return (
      <div>
      {selectedSubjectData.length > 0 && (
        <div className={`${styles.container} ${backgroundColorClass}`}>
          <h3 className={styles.card_title}>{name}</h3>
          <p>{data} {unit}</p>
          <p>Seuil = {treshold}{unit}</p>
        </div>
      )}
      </div>
    );
};

export default AlertCard;


