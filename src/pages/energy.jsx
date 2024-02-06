// pages/index.js
import LineChart from "@/components/LineChart";
import { DataContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import MainContent from "@/components/MainContent";

function EnergyPage() {
  const { selectedSubjectDateData } = useContext(DataContext)
  const findData = useDataFinder()
  const [data, setData] = useState([])
  const [vitDdata, setVitDData] = useState([])

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const testosterone = findData(selectedSubjectDateData,"Testosterone").slice(2)
      const cortisol = findData(selectedSubjectDateData,"Cortisol ").slice(2)
      const unit = ""
      
      let TCData = []
      for (let i = 0; i < testosterone.length; i++) {
        let tc = testosterone[i] / cortisol[i]
        let data = {
          date : selectedSubjectDateData[0][i],
          crp : tc,
          unit : unit
        }
        TCData.push(data)
      }
      console.log(TCData)
      setData(TCData)
    }
    
  }, [selectedSubjectDateData]);

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const vitD = findData(selectedSubjectDateData, "1,25-dihydroxyvitamine D")
      const datas = vitD.slice(2)
      const unit = vitD[1]

      let vitDData = []
      for (let i = 0; i < datas.length; i++) {
        let data = {
          date : selectedSubjectDateData[0][i],
          crp : datas[i],
          unit : unit,
        }
        vitDData.push(data)
      }
      setVitDData(vitDData)
    }
  }, [selectedSubjectDateData])


    return (
      <div className="main_container">
        <MainContent>
          <div className="chartline_container">
            <LineChart  data={data} max={50} alert={true} title="Ratio Téstostérone / Cortisol" treshold1={0} treshold2={0} tresholdText1="" rect={true}/>
            <LineChart  data={vitDdata} max={70} title="Concentration en 1,25-dihydroxyvitamine D" treshold1={18} treshold2={64} tresholdText1="Norme" rect={true}/>
          </div>
        </MainContent>
      </div>
    );
  }
  
  export default EnergyPage;