// pages/index.js
import BulletChart from "@/components/BulletChart";
import MainContent from "@/components/MainContent";
import { DataContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";

function ImmunePage() {

  const { selectedSubjectDateData } = useContext(DataContext)
  const findData = useDataFinder()
  const [data, setData] = useState([])
  const rates = [
    { name: "Reverse severe", min: 0, max: 0.7, color: "lightblue" },
    { name: "Normal", min: 0.7, max: 2, color: "#008000" },
    { name: "Zone grise", min: 2, max: 3, color: "grey" },
    { name: "Inflammation bénine à modérée", min: 3, max: 7, color: "#ADFF2F" },
    { name: "Inflammation et stress modérée", min: 7, max: 11, color: "#FFFF00" },
    { name: "Inflammation et stress sévère", min: 11, max: 17, color: "#FFA500" },
    { name: "Stress et inflammation critique", min: 17, max: 25, color: "#FF0000" },
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
      console.log(nlrData)
      setData(nlrData)
      
    }
    
  }, [selectedSubjectDateData]);

    return (
      <div className="main_container">
        <MainContent>
          <BulletChart data={data} rates={rates} title="Ratio Neutrophiles/Lymphocytes (NLR)"/>
        </MainContent>
      </div>
    );
  }
  
  export default ImmunePage;
  