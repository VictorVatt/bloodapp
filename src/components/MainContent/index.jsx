import styles from "./MainContent.module.css"
import { DataContext } from '@/context/context';
import { useContext } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const MainContent = ({ children }) => {
    const { selectedSubjectData } = useContext(DataContext)

    

    return (
        <div className={styles.container}>
            <RangeSlider></RangeSlider>
        </div>
    );
};

export default MainContent;