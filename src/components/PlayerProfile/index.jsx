import styles from "./PlayerProfile.module.css"
import icone from "../../../public/images/icone_joueur.jpg"
import { DataContext } from '@/context/context';
import Image from "next/image";
import { useContext, useEffect } from "react";

const PlayerProfile = ({ children }) => {
    const { selectedSubject, selectedSubjectData } = useContext(DataContext)
    const age = selectedSubjectData[2]
    const lastAge = age[age.length - 1]

    //age.toFixed()
    useEffect(() => {
        // Trouver l'élément parent
    const parentDiv = document.querySelector('.ImportData_button_container__zZL8h');
    if (parentDiv) {
      // Ajouter une nouvelle classe à la div parente
      parentDiv.style.justifyContent = "space-between";

      // Retirer la classe lorsque le composant est démonté
      return () => {
        parentDiv.style.justifyContent = "right";
      };
    }
  }, []);

    return (
        <div className={styles.container}>
            <Image src={icone} width={80} height={80 } alt="Icone joueur" />
            <div>
              <p className={styles.player_name}>Joueur : {selectedSubject}</p>
              <p className={styles.player_name}>Âge : {lastAge.toFixed()} ans</p>
            </div>
            
        </div>
    );
};

export default PlayerProfile;