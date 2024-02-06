// pages/index.js
import BulletChart from "@/components/BulletChart";
import MainContent from "@/components/MainContent";
import { DataContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import LineChart from "@/components/LineChart";

function ImmunePage() {

  const { selectedSubjectDateData } = useContext(DataContext)
  const findData = useDataFinder()
  const [data, setData] = useState([])
  const [dataReactC, setDataReactC] = useState([])
  const [dataIL6, setDataIL6] = useState([])
  const rates = [
    { name: "Reverse severe", min: 0, max: 0.7, color: "lightblue" },
    { name: "Normal", min: 0.7, max: 2, color: "#008000" },
    { name: "Zone grise", min: 2, max: 3, color: "grey" },
    { name: "Inflammation bénine à modérée", min: 3, max: 7, color: "#ADFF2F" },
    { name: "Inflammation et stress modérée", min: 7, max: 11, color: "#FFFF00" },
    { name: "Inflammation et stress sévère", min: 11, max: 17, color: "#FFA500" },
    { name: "Stress et inflammation critique", min: 17, max: 25, color: "#FF0000" },
  ];
  const rates2 = [
    { name: "Normal", min: 0, max: 5, color: "#008000" },
    { name: "Elevé", min: 5, max: 10, color: "#FF0000" }
  ];
  
  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const neutrophils = findData(selectedSubjectDateData,"Neutrophils ").slice(2)
      const lymphocytes = findData(selectedSubjectDateData,"Lymphocytes ").slice(2)

      let nlrData = []
      for (let i = 0; i < neutrophils.length; i++) {
        let nlr = neutrophils[i] / lymphocytes[i]
        let data = {
          date : selectedSubjectDateData[0][i],
          nlr : nlr,
        }
        nlrData.push(data)
      }
      setData(nlrData)
    }
    
  }, [selectedSubjectDateData]);

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const cReactProt = findData(selectedSubjectDateData, "C Reactive Protein ")
      const datas = cReactProt.slice(2)
      const unit = cReactProt[1]

      let crpData = []
      for (let i = 0; i < datas.length; i++) {
        let data = {
          date : selectedSubjectDateData[0][i],
          crp : datas[i],
          unit : unit,
        }
        crpData.push(data)
      }
      setDataReactC(crpData)
    }
  }, [selectedSubjectDateData])

  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const IL6 = findData(selectedSubjectDateData, "IL-6 ")
      const datas = IL6.slice(2)
      const unit = IL6[1]

      let il6Data = []
      for (let i = 0; i < datas.length; i++) {
        let data = {
          date : selectedSubjectDateData[0][i],
          nlr : datas[i],
          unit : unit,
        }
        il6Data.push(data)
      }
      setDataIL6(il6Data)
    }
  }, [selectedSubjectDateData])


    return (
      <div className="main_container">
        <MainContent>
          <div className="linechart_container">
            <LineChart  data={dataReactC} max={5.5} title="Evolution de la Protéine Réactive C" treshold1={3} treshold2={5} tresholdText1="Inflammation bas grade" tresholdText2="Inflammation aigue" rect={false} unit="CRP mg/L"/>
          </div>
          <div className="bullet_container">
            <BulletChart data={data} rates={rates} title="Ratio Neutrophiles/Lymphocytes (NLR)" max={25}/>
            <BulletChart data={dataIL6} rates={rates2} title="Concentration en Interleukines-6 (IL6)" max={10}/>
          </div>
          
        </MainContent>
      </div>
    );
  }
  
  export default ImmunePage;
  