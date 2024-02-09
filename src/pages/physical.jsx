// pages/index.js

import MainContent from "@/components/MainContent";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "@/context/context";
import useDataFinder from "@/utils/useDataFinder";
import LineChart from "@/components/LineChart";
import RadarChart from "@/components/SpiderChart";

function calculerMasseMaigre(poidsTotal, pourcentageGras) {
  let masseGrasse = poidsTotal * (pourcentageGras / 100);
  let masseMaigre = poidsTotal - masseGrasse;
  return masseMaigre;
}


function PhysicalPage() {
  const { selectedSubjectDateData } = useContext(DataContext)
  const findData = useDataFinder()
  const [dataMM, setDataMM] = useState([])
  const [dataPhysical, setDataPhysical] = useState([])

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const masseGrassePercent = findData(selectedSubjectDateData, "Masse grasse").slice(2)
      const totalWeight = findData(selectedSubjectDateData, "Poids").slice(2)
      const unit = "kg"

      let dataMM = []
      for (let i = 0; i < masseGrassePercent.length; i++) {
        let mm = calculerMasseMaigre(totalWeight[i], masseGrassePercent[i])
        let data = {
          date : selectedSubjectDateData[0][i],
          crp : mm,
          unit : unit
        }
        dataMM.push(data)
      }
      setDataMM(dataMM)
    }

  }, [selectedSubjectDateData])

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const teamIFT = findData(selectedSubjectDateData, "30-15 IFT ").slice(2)
      const teamSJ = findData(selectedSubjectDateData, "SJ").slice(2)
      const teamCMJ = findData(selectedSubjectDateData, "CMJ").slice(2)
      const teamFC = findData(selectedSubjectDateData, "FC de récupération").slice(2)
      const teamMassGrasse = findData(selectedSubjectDateData, "FC de récupération").slice(2)

      let physicaldata = []
      for (let i = 0; i < teamIFT.length; i++) {
        let data = {
          player : selectedSubjectDateData[0][i],
          Test30_15_IFT : teamIFT[i],
          SJ : teamSJ[i],
          CMJ : teamCMJ[i],
          FC : teamFC[i],
          MasseMaigre : 100 - teamMassGrasse[i]
        }
        physicaldata.push(data)
      }
      setDataPhysical(physicaldata)
    } 
      
  }, [selectedSubjectDateData])

 


    return (
      <div className="main_container">
        <MainContent>
          <div className="physical_container">
          {selectedSubjectDateData.length > 0 &&
            <RadarChart data={dataPhysical} title="Données physiques" dimensions={{ width: 500, height: 500 }} keyMulti={"player"} type={"date"}/>
          } 
          <LineChart  data={dataMM} max={90} alert={false} title="Masse Maigre" treshold1={0} treshold2={0} tresholdText1="" rect={true}/>
          </div>
        </MainContent>
      </div>
    );
  }
  
  export default PhysicalPage;