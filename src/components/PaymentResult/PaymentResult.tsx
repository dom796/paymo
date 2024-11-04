import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult: React.FC = () => {
    const location = useLocation();
    const postData = location.state;

    return (
        <div>
            <h1>Payment Result</h1>
            <pre>{JSON.stringify(postData, null, 2)}</pre>
        </div>
    );
};

export default PaymentResult;
