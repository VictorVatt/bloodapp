import React, { useState } from 'react';
import TextModal from '../TextModal';
import styles from "./SavoirPlus.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'; // Importez le fichier CSS pour le style
import Image from 'next/image';

const textes = {
    team: "",
    physical: "",
    oxygene: <p>Hémoglobine (g/dL) : L'hémoglobine est une glycoprotéine qui transporte l'oxygène, notamment vers les muscles. Des niveaux d'hémoglobine bas peuvent entraîner une capacité réduite à transporter l'oxygène vers les muscles, entraînant fatigue prématurée et performances diminuées sur le terrain. Les valeurs normales sont<strong> entre 13 et 17 g/dL</strong>.
    <br></br>
    <br></br>
    Hématocrite (%) : L'hématocrite mesure le pourcentage de volume occupé par les globules rouges dans le sang. Un niveau trop élevé peut augmenter la viscosité sanguine, entraînant des risques cardiovasculaires, tandis qu'un niveau bas peut indiquer une anémie, affectant le transport d'oxygène et les performances. Les valeurs normales sont<strong> entre 40 et 54%</strong>.
    <br></br>
    <br></br>
    Ferritine (µg/L) : La ferritine, protéine qui stocke le fer, indique la disponibilité de fer pour la production d'hémoglobine et la fonction des globules rouges. Des niveaux élevés peuvent signaler une surcharge en fer, tandis que des niveaux bas peuvent indiquer une carence, conduisant à l'anémie. Les valeurs normales sont entre<strong> 30 et 300 µg/L</strong>.
    <br></br>
    <br></br>
    TSAT (%) : La saturation de la transferrine mesure la charge en fer de la transferrine circulante. Un TSAT élevé peut indiquer une surcharge en fer, tandis qu'un TSAT bas peut être associé à une carence. Les valeurs normales sont entre<strong> 20 et 50%</strong>.
    <br></br>
    <br></br>
    Résumé global : Ces mesures fournissent des informations cruciales sur le transport d'oxygène par le sang. Des valeurs en dehors des plages normales peuvent indiquer un risque d'anémie chez le sportif, nécessitant une attention particulière du staff médical.</p>,
    immune: <p><strong>Ratio neutrophiles/lymphocytes</strong>
    <br></br>
    <br></br> 
    Le ratio neutrophiles/lymphocytes, également connu sous le nom de NLR, est un indicateur significatif dans l'analyse sanguine des sportifs. Ce ratio est calculé en divisant le nombre de neutrophiles par le nombre de lymphocytes présents dans le sang. Les neutrophiles sont des cellules du système immunitaire impliquées dans la réponse inflammatoire, tandis que les lymphocytes jouent un rôle clé dans l'immunité spécifique. Un NLR élevé peut indiquer une inflammation systémique, souvent associée à un stress physique excessif ou à une surcharge d'entraînement. Surveiller l’évolution du NLR permet d’évaluer le niveau de récupération, de prévenir les risques de surentraînement et d’optimiser les performances. Une analyse régulière du NLR offre ainsi des informations précieuses sur l'état immunitaire et la capacité du corps à faire face aux contraintes de l'entraînement intensif, contribuant ainsi à une gestion plus éclairée de la santé des sportifs.
    <br></br>
    <br></br>
    <strong>Protéine C-réactive (CRP) et InterLeukines-6</strong>
    <br></br>
    <br></br>
    La protéine C-réactive (CRP) et les InterLeukines-6 (IL-6) constituent des marqueurs cruciaux lors de l'analyse sanguine des sportifs. La CRP et les IL-6 sont produits en réponse à une inflammation dans le corps, ce qui en fait un indicateur sensible des processus inflammatoires. Dans le contexte sportif, des niveaux élevés de CRP et IL-6 peuvent signaler une inflammation résultant de l'entraînement intensif ou d'une blessure. Surveiller ces marqueurs permet de détecter rapidement des signes d'inflammation excessive en fonction des valeurs seuils décrites.
    <div className={styles.modal_image_container}><Image src={"/images/inflammation.jpg"} width={500} height={150} alt='dezzdzd'/></div>
    </p>,
    energy: ""
};


const TextWithModal = () => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getTexteSelonURL = () => {
        switch (router.pathname) {
          case '/team':
            return textes.team
          case '/physical':
            return textes.physical
          case '/oxygene':
            return textes.oxygene
          case '/immune':
            return textes.immune
          case '/energy':
            return textes.energy
          default:
            return '';
        }
      };

    const texte = getTexteSelonURL();
    return (
        <div>
            <div>
                <p onClick={openModal} className={styles.more}>En savoir plus <FontAwesomeIcon className={styles.more_icon}icon={faCircleInfo} /></p>
            </div>
            <TextModal isOpen={isModalOpen} onClose={closeModal}>
               {texte}
            </TextModal>
        </div>
    );
};

export default TextWithModal;
