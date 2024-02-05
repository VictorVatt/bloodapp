import styles from './Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faDumbbell, faVirus, faBolt,faRightLeft, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'; // Importez le fichier CSS pour le style
import Link from 'next/link';
import ImportData from "../ImportData"// pages/index.js

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.side_container}>
                <div className={styles.top_container}>
                    <svg width="247.2" height="77.25365622781415" viewBox="-14 0 384.1515151515152 120.0530303030303" className="looka-1j8o68f">
                        <defs id="SvgjsDefs4872"></defs>
                        <g id="SvgjsG4873" featurekey="hmhgWD-0" transform="matrix(0.26515151515151514,0,0,0.26515151515151514,-39.45454545454545,-7.484848484848484)" fill="#d72323">
                            <title xmlns="http://www.w3.org/2000/svg">Slice 1</title>
                            <description xmlns="http://www.w3.org/2000/svg">Created with Sketch (http://www.bohemiancoding.com/sketch)</description>
                            <g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M256,480 C344.365564,480 416,408.365564 416,320 C416,231.634436 256,32 256,32 C256,32 96,231.634436 96,320 C96,408.365564 167.634436,480 256,480 Z M256,480" fill="#d72323"></path>
                            </g>
                        </g>
                        <g id="SvgjsG4874" featurekey="1RRcwp-0" transform="matrix(4.0247651215219,0,0,4.0247651215219,98.96285615603227,7.461317622466439)" fill="#d72323">
                            <path d="M11.44 20 l-9.94 0 l0 -14.24 l2.68 0 l0 11.62 l7.26 0 l0 2.62 z M17.1 20.22 l-0.02 0 c-0.58 0 -1.18 -0.14 -1.74 -0.4 c-0.52 -0.22 -1 -0.58 -1.44 -1.04 c-0.7 -0.76 -1.12 -1.76 -1.22 -2.8 c-0.02 -0.18 -0.04 -0.36 -0.04 -0.56 c0 -0.4 0.06 -0.82 0.16 -1.24 c0.18 -0.8 0.56 -1.54 1.1 -2.1 c0.4 -0.44 0.86 -0.78 1.44 -1.06 c0.54 -0.26 1.14 -0.38 1.76 -0.38 c0.64 0 1.22 0.12 1.76 0.38 c0.6 0.28 1.08 0.64 1.44 1.06 c0.52 0.56 0.92 1.28 1.12 2.1 c0.1 0.38 0.14 0.78 0.14 1.24 l0 0.46 l-6.72 0 l0.02 0.14 c0.26 1.24 1.2 2.14 2.24 2.14 l0.02 0 c0.58 -0.04 1.22 -0.4 1.6 -0.72 l0.22 -0.18 l1.66 1.44 l-0.3 0.26 c-0.22 0.2 -0.5 0.44 -0.8 0.6 l-0.02 0 c-0.72 0.42 -1.5 0.64 -2.38 0.66 z M17.1 12.719999999999999 c-0.78 0 -1.56 0.54 -1.98 1.38 l-0.08 0.16 l4.14 0 l-0.08 -0.16 c-0.46 -0.86 -1.22 -1.38 -2 -1.38 z M28.76 20.12 c-0.46 0 -0.94 -0.06 -1.44 -0.16 c-1.48 -0.3 -2.92 -1.02 -4.18 -2.12 l-0.38 -0.34 l1.76 -2 l0.38 0.34 c0.92 0.8 1.94 1.34 2.94 1.54 l0.02 0 c0.3 0.06 0.6 0.1 0.9 0.1 c0.5 0 0.96 -0.1 1.34 -0.28 c0.48 -0.2 1.04 -0.64 1.04 -1.46 c0 -0.44 -0.22 -0.78 -0.68 -1.06 c-0.56 -0.34 -1.32 -0.52 -1.86 -0.62 c-0.24 -0.04 -2.28 -0.46 -3.22 -0.98 c-0.62 -0.38 -1.1 -0.86 -1.44 -1.42 c-0.34 -0.58 -0.5 -1.22 -0.5 -1.92 c0 -0.76 0.24 -1.52 0.7 -2.22 c0.44 -0.58 1.04 -1.06 1.76 -1.4 s1.52 -0.52 2.38 -0.52 c0.34 0 0.7 0.04 1.06 0.08 c1.32 0.24 2.62 0.84 3.76 1.8 l0.38 0.32 l-1.7 2.06 l-0.38 -0.32 c-1.3 -1.06 -2.42 -1.3 -3.14 -1.3 c-0.46 0 -0.88 0.1 -1.24 0.26 c-0.56 0.26 -0.92 0.74 -0.92 1.22 c0 0.44 0.16 0.72 0.54 0.98 s0.96 0.46 1.88 0.66 c0.12 0.02 0.28 0.06 0.44 0.1 c0.84 0.16 1.96 0.4 2.74 0.86 c0.68 0.36 1.2 0.86 1.56 1.44 s0.54 1.26 0.54 1.98 c0 0.9 -0.24 1.7 -0.72 2.38 c-0.42 0.58 -1.04 1.08 -1.86 1.48 c-0.7 0.36 -1.48 0.52 -2.46 0.52 z M40.08 20.18 c-1.26 0 -2.46 -0.48 -3.38 -1.38 c-0.9 -0.92 -1.4 -2.12 -1.4 -3.38 s0.5 -2.46 1.4 -3.38 c0.9 -0.9 2.1 -1.38 3.38 -1.38 c0.84 0 1.6 0.3 2.26 0.9 l0.1 0.08 l0 -0.8 l2.42 0 l0 9.16 l-2.42 0 l0 -0.72 l-0.1 0.1 c-0.72 0.7 -1.54 0.8 -2.26 0.8 z M40.08 13 c-1.28 0 -2.36 1.12 -2.36 2.42 c0 1.32 1.08 2.42 2.36 2.42 s2.36 -1.1 2.36 -2.42 c0 -1.3 -1.08 -2.42 -2.36 -2.42 z M56.239999999999995 20 l-2.52 0 l0 -4.9 c0 -1.08 -0.86 -1.92 -1.94 -1.92 c-1.04 0 -1.94 0.86 -1.94 1.92 l0 4.9 l-2.5 0 l0 -9.16 l2.5 0 l0 0.66 c0.62 -0.62 1.28 -0.84 1.94 -0.84 c1.2 0 2.32 0.46 3.16 1.28 c0.84 0.86 1.3 1.98 1.3 3.16 l0 4.9 z M62.48 25.32 c-0.96 0 -1.88 -0.24 -2.64 -0.72 l0 0 c-0.38 -0.2 -0.72 -0.52 -0.88 -0.66 l-0.32 -0.32 l1.8 -1.58 l0.26 0.22 c0.54 0.4 1.22 0.68 1.78 0.72 l0 0 l0 0 c1.36 -0.02 2.48 -1.18 2.48 -2.58 l0 -1.16 l-0.1 0.1 c-0.7 0.68 -1.36 0.78 -2.1 0.82 l-0.34 0 c-1.24 -0.04 -2.34 -0.5 -3.2 -1.36 c-0.9 -0.92 -1.4 -2.12 -1.4 -3.38 s0.5 -2.46 1.4 -3.38 c0.92 -0.9 2.12 -1.38 3.38 -1.38 c0.98 0 1.66 0.26 2.26 0.86 l0.1 0.08 l0 -0.76 l2.42 0 l0 9.58 c0 1.32 -0.52 2.54 -1.46 3.46 c-0.9 0.94 -2.12 1.44 -3.44 1.44 z M62.599999999999994 12.98 c-1.28 0 -2.36 1.12 -2.36 2.44 s1.08 2.42 2.36 2.42 s2.36 -1.1 2.36 -2.42 s-1.08 -2.44 -2.36 -2.44 z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <Link className={styles.link_button} href={"/"}><FontAwesomeIcon className={styles.nav_icons} icon={faHouse} />Accueil</Link>
                        <Link className={styles.link_button} href={"/physical"}><FontAwesomeIcon className={styles.nav_icons} icon={faDumbbell} />Données physiques</Link>
                        <Link className={styles.link_button} href={"/oxygene"}><FontAwesomeIcon className={styles.nav_icons} icon={faRightLeft} />Transport oxygène</Link>
                        <Link className={styles.link_button} href={"/immune"}><FontAwesomeIcon className={styles.nav_icons} icon={faVirus} />Système immunitaire</Link>
                        <Link className={styles.link_button} href={"/energy"}><FontAwesomeIcon className={styles.nav_icons} icon={faBolt} />Métabolisme énergétique</Link>
                        <Link className={styles.link_button_team} href={"/team"}><FontAwesomeIcon className={styles.nav_icons} icon={faPeopleGroup} />Données équipes</Link>

                    </nav>
                </div>
            </div>
            
            <main className={styles.content}>
                <ImportData></ImportData>
                {children}
            </main>
        </div>
    );
};

export default Layout;
