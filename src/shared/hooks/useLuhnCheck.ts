import { useCallback } from 'react';

const useLuhnCheck = () => {
    const luhnCheck = useCallback((cardNumber: string) => {
        let sum = 0;
        for (let i = 0; i < cardNumber.length; i++) {
            let intVal = parseInt(cardNumber.substr(i, 1));
            if (i % 2 === 0) {
                intVal *= 2;
                if (intVal > 9) {
                    intVal = 1 + (intVal % 10);
                }
            }
            sum += intVal;
        }
        return (sum % 10) === 0;
    }, []);

    return luhnCheck;
};

export default useLuhnCheck;
