// pages/index.js

import MainContent from "@/components/MainContent";
import { DataContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import RadarChart from "@/components/SpiderChart";

function findLastIndexes(arr, exclude) {
  let lastIndexMap = new Map();
  
  arr.forEach((element, index) => {
      if (!exclude.includes(element)) {
          lastIndexMap.set(element, index);
      }
  });

  return Array.from(lastIndexMap.values());
}

function filterByIndexes(arrayOfArrays, indexes) {
  return arrayOfArrays.map(subArray => {
      return indexes.map(index => subArray[index]).filter(element => element !== undefined);
  });
}


function TeamPage() {

  
  const { allData } = useContext(DataContext)
  const findData = useDataFinder()
  const [teamData, setTeamData] = useState([])
  

  useEffect(() => {
    if (allData.length > 0) {
      let lastDataIndexForEachSubject = findLastIndexes(allData[0], [])
      lastDataIndexForEachSubject.splice(1, 0, 1)
      let lastDataForEachSubject = filterByIndexes(allData, lastDataIndexForEachSubject)

      const players = findData(lastDataForEachSubject, "Subject").slice(1)
      const teamIFT = findData(lastDataForEachSubject, "30-15 IFT ").slice(2)
      const teamSJ = findData(lastDataForEachSubject, "SJ").slice(2)
      const teamCMJ = findData(lastDataForEachSubject, "CMJ").slice(2)
      const teamFC = findData(lastDataForEachSubject, "FC de récupération").slice(2)
      const teamMassGrasse = findData(lastDataForEachSubject, "FC de récupération").slice(2)

      let allTeamdata = []
      for (let i = 0; i < teamIFT.length; i++) {
        let dataPlayer = {
          player : players[i],
          IFT : teamIFT[i],
          SJ : teamSJ[i],
          CMJ : teamCMJ[i],
          FC : teamFC[i],
          MMaigre : 100 - teamMassGrasse[i]
        }
        allTeamdata.push(dataPlayer)
      }
      setTeamData(allTeamdata)
    } 
      
  }, [allData])


    return (
      <div className="main_container">
        <MainContent>
            <RadarChart data={teamData} dimensions={{ width: 500, height: 500 }}/>
        </MainContent>
      </div>
    );
  }
  
  export default TeamPage;