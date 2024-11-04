import React from 'react';
import styles from './PaymentModal.module.css';
import InputWithLabel from "../../shared/ui/InputWithLabel/InputWithLabel";
import { useForm } from "react-hook-form";
import AmountInput from "../../shared/ui/AmountInput/AmountInput";
import Button from "../../shared/ui/Button/Button";
import useLuhnCheck from "../../shared/hooks/useLuhnCheck";
import { useNavigate } from 'react-router-dom';


interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    initiator: string;
    collectionName: string;
}

interface PaymentFormInputs {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    amount: number;
    name: string;
    message: string;
}

const PaymentModal= ({ isOpen, onClose, initiator, collectionName }: PaymentModalProps) => {
    const { control, handleSubmit, formState: { errors }, setError } = useForm<PaymentFormInputs>();
    const luhnCheck = useLuhnCheck();
    const navigate = useNavigate();
    if (!isOpen) return null;

    const handlePayment = (data: PaymentFormInputs) => {
        if (!luhnCheck(data.cardNumber.replace(/\s+/g, ''))) {
            setError('cardNumber', { type: 'manual', message: 'Неверный номер карты' });
            return;
        }

        const postData = {
            api_key: "316b2be8-3475-4462-bd57-c7794d4bdb53",
            secret: "1234567890",
            cardNumber: data.cardNumber,
            expiryDate: data.expiryDate,
            cvv: data.cvv,
            amount: data.amount,
            name: data.name,
            message: data.message,
            custom_data: {
                initiator: initiator,
                collection_name: collectionName
            }
        };

        console.log('POST data:', postData);
        navigate('/payment-result', { state: postData });

        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit(handlePayment)}>
                    <div className={styles.header}>
                        <label>{initiator} собирает 10 000 ₽ на «{collectionName}»</label>
                    </div>
                    <InputWithLabel
                        name="cardNumber"
                        label="Номер карты"
                        control={control}
                        mask="9999 9999 9999 9999"
                        error={errors.cardNumber?.message}
                        width="536px"
                        rules={{ required: 'Ведите номер карты' }}

                    />
                    <div className={styles.cvv}>
                        <InputWithLabel
                            name="expiryDate"
                            label="Срок действия"
                            control={control}
                            mask="99/99"
                            error={errors.expiryDate?.message}
                            placeholder="ММ/ГГ"
                            width="240px"
                            rules={{ required: 'Ведите срок' }}

                        />
                        <InputWithLabel
                            name="cvv"
                            label="CVV"
                            control={control}
                            mask="999"
                            error={errors.cvv?.message}
                            width="240px"
                            rules={{ required: 'Ведите CVV' }}

                        />
                    </div>
                    <AmountInput
                        name="amount"
                        label="Сумма перевода"
                        control={control}
                        errors={errors}
                        width="536px"
                        rules={{
                            required: 'Сумма перевода обязательна',
                            min: { value: 10, message: 'Минимальная сумма перевода 10 рублей' }
                        }}

                    />
                    <InputWithLabel
                        name="name"
                        label="Ваше имя"
                        control={control}
                        error={errors.name?.message}
                        width="536px"
                        rules={{ required: 'Ведите имя' }}
                    />
                    <InputWithLabel
                        name="message"
                        label="Сообщение получателю"
                        control={control}
                        error={errors.message?.message}
                        placeholder={collectionName}
                        width="536px"
                    />
                    <div className={styles.footer}>
                        <Button
                            type="submit"
                            text="Перевести"
                            onClick={() => {}}
                            backgroundColor="#0663EF"
                            textColor="white"
                        />
                        <Button
                            onClick={onClose}
                            text="Вернуться"
                            backgroundColor="#0663EF14"
                            textColor="#0663EF"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
