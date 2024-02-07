// pages/index.js
import MainContent from "@/components/MainContent";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import BarChart from "@/components/BarChart";
import { DataContext } from "@/context/context";
import AlertCard from "@/components/AlertCard";



function OxygenePage() {
  
  const { selectedSubjectDateData } = useContext(DataContext)
  const findData = useDataFinder()
  const [dataHemato, setDataHemato] = useState({})
  const [dataHemo, setDataHemo] = useState({})
  const [dataFerritin, setDataFerritin] = useState({})
  const [dataSaturationTransferrin, setDataSaturationTransferrin] = useState({})
  
  
  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const hematocrit = findData(selectedSubjectDateData,"Hematocrit")
      const hemoglobine = findData(selectedSubjectDateData,"Hemoglobin ")
      const ferritin = findData(selectedSubjectDateData,"Ferritin  ")
      const saturationTransferrin = findData(selectedSubjectDateData,"Transferrin Saturation ")

      setDataHemato(hematocrit)
      setDataHemo(hemoglobine)
      setDataFerritin(ferritin)
      setDataSaturationTransferrin(saturationTransferrin)
    }
    
  }, [selectedSubjectDateData]);

    return (
      <div className="main_container">
        <MainContent>
          <div className="card_container">
            <AlertCard name="Hemoglobin " treshold={13}/>
            <AlertCard name="Ferritin  " treshold={30}/>
            <AlertCard name="Transferrin Saturation " treshold={20}/> 
          </div>
          
          <div className="barchart_container">
            <div className="line_container">
              <BarChart data={dataHemato} normal={[40, 54]} max={100} title="Evolution de l'hématocrite" barColor="#e3342b"/>
              <BarChart data={dataHemo} normal={[13, 17]} max={40} title="Taux d'hémoglobine"barColor="#e3342b"/>
            </div>
            <div className="line_container">
              <BarChart data={dataFerritin} normal={[30, 300]}  max={500} title="Concentration en ferritinine" barColor="#f8c54e"/>
              <BarChart data={dataSaturationTransferrin} normal={[20, 50]} max={100} title="Taux de saturation en transferrine" barColor="#f8c54e"/>
            </div>
          </div>
          
        </MainContent>
      </div>
    );
  }
  
  export default OxygenePage;