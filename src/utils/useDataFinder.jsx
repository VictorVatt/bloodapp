import { useCallback } from 'react';

const useDataFinder = () => {
    const findData = useCallback((tableau, nomVariable) => {
        for (let i = 0; i < tableau.length; i++) {
            if (tableau[i][0] === nomVariable) {
                return tableau[i];
            }
        }
        return null;
    }, []);

    return findData;
};

export default useDataFinder;
