// pages/index.js
import MainContent from "@/components/MainContent";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import BarChart from "@/components/HematocriteChart";
import { DataContext } from "@/context/context";



function OxygenePage() {
  
  const { selectedSubjectDateData, selectedSubject } = useContext(DataContext)
  const findData = useDataFinder()
  const [data, setData] = useState({})
  
  useEffect(() => {
    if (selectedSubjectDateData.length > 0) {
      const hematocrit = findData(selectedSubjectDateData,"Hematocrit")
      console.log(hematocrit)
      setData(hematocrit)
    }
    
  }, [selectedSubjectDateData]);

    return (
      <div className="main_container">
        <MainContent>
        <BarChart data={data} />
        </MainContent>
      </div>
    );
  }
  
  export default OxygenePage;