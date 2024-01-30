import styles from "./PlayerProfile.module.css"
import icone from "../../../public/images/icone_joueur.jpg"
import { DataContext } from '@/context/context';
import Image from "next/image";
import { useContext, useEffect } from "react";

const PlayerProfile = ({ children }) => {
    const { selectedSubject } = useContext(DataContext)

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
            <p className={styles.player_name}>Joueur : {selectedSubject}</p>
        </div>
    );
};

export default PlayerProfile;