// pages/index.js

import MainContent from "@/components/MainContent";
import { DataContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import useDataFinder from "@/utils/useDataFinder";
import RadarChart from "@/components/SpiderChart";
import BarChart from "@/components/BarChart";

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
  const [tcTeam, setTcTeam ] = useState([])
  const [players, setPlayers] = useState([])
  const [nlrTeamn, setNlrTeam] = useState([])
  const [hemoTeam, setHemoTeam] = useState([])
  

  useEffect(() => {
    if (allData && allData.length > 0) {
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
          Test30_15_IFT : teamIFT[i],
          SJ : teamSJ[i],
          CMJ : teamCMJ[i],
          FC : teamFC[i],
          MasseMaigre : 100 - teamMassGrasse[i]
        }
        allTeamdata.push(dataPlayer)
      }
      setTeamData(allTeamdata)
    } 
      
  }, [allData])


  useEffect(() => {
    if (allData.length > 0) {
      let lastDataIndexForEachSubject = findLastIndexes(allData[0], [])
      lastDataIndexForEachSubject.splice(1, 0, 1)
      let lastDataForEachSubject = filterByIndexes(allData, lastDataIndexForEachSubject)
      const testosterone = findData(lastDataForEachSubject,"Testosterone").slice(2)
      const cortisol = findData(lastDataForEachSubject,"Cortisol ").slice(2)
      const players = findData(lastDataForEachSubject, "Subject").slice(1)
      let TCData = []
      for (let i = 0; i < testosterone.length; i++) {
        let tc = testosterone[i] / cortisol[i]
        TCData.push(tc)
      }
      TCData.unshift("Ratio Téstostérone / Cortisol", " ")
      setPlayers(players)
      setTcTeam(TCData)
    }
    
  }, [allData]);

  console.log(teamData)
  useEffect(() => {
    if (allData.length > 0) {
      let lastDataIndexForEachSubject = findLastIndexes(allData[0], [])
      lastDataIndexForEachSubject.splice(1, 0, 1)
      let lastDataForEachSubject = filterByIndexes(allData, lastDataIndexForEachSubject)
      const neutrophils = findData(lastDataForEachSubject,"Neutrophils ").slice(2)
      const lymphocytes = findData(lastDataForEachSubject,"Lymphocytes ").slice(2)
      const hemoglobine = findData(lastDataForEachSubject,"Hemoglobin ")

      let NLRData = []
      for (let i = 0; i < neutrophils.length; i++) {
        let nlr = neutrophils[i] / lymphocytes[i]
        NLRData.push(nlr)
      }
      NLRData.unshift("Ratio Neutrophyles / Lymphocites", " ")
      setNlrTeam(NLRData)
      setHemoTeam(hemoglobine)
    }
    
  }, [allData]);

    return (
      <div className="main_container">
        <MainContent>
          <div className="radar_container">
            {teamData && teamData.length > 0 && 
            <RadarChart data={teamData} title="Données physiques du groupe" dimensions={{ width: 500, height: 500 }} keyMulti={"player"} type={"joueur"}/>}          </div>
          <div className="team_bar_container">
            <BarChart data={hemoTeam} normal={[13, 17]} max={40} title="Transport d'oxygène : taux d'hémoglobine"barColor="#e3342b" team={players}/>
            <BarChart data={nlrTeamn} normal={[]} max={5} title="Système immunitaire : ratio de Neutrophyles / Lymphocytes" barColor="#88f075" team={players}/>
          </div>
          <div className="radar_container">
            <BarChart data={tcTeam} normal={[]} max={50} title="Métabolisme énergétique : ratio de téstostérone / cortisol" barColor="#122ec9" team={players}/>
          </div>
        </MainContent>
      </div>
    );
  }
  
  export default TeamPage;