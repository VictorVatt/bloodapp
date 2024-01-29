import styles from "./PlayerProfile.module.css"
import icone from "../../../public/images/icone_joueur.jpg"
import { DataContext } from '@/context/context';
import Image from "next/image";
import { useContext, useEffect } from "react";

const PlayerProfile = ({ children }) => {

    const { selectedSubject } = useContext(DataContext)

    return (
        <div className={styles.container}>
            <Image src={icone} width={80} height={80 } alt="Icone joueur" />
            <p className={styles.player_name}>Joueur : {selectedSubject}</p>
        </div>
    );
};

export default PlayerProfile;