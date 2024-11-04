import React from 'react';
import {Controller, Control, FieldErrors, RegisterOptions} from 'react-hook-form';
import styles from './AmountInput.module.css';


interface AmountInputProps {
    control: Control<any>;
    errors: FieldErrors;
    name: string;
    label: string;
    width?: string;
    rules?: RegisterOptions;
}

const AmountInput = ({ control, errors, name, label, width, rules }: AmountInputProps) => {
    const formatValue = (value: string) => {
        const numericValue = value.replace(/[^\d]/g, '');
        return numericValue ? `${numericValue} ₽` : '';
    };

    const parseValue = (value: string) => {
        return value.replace(/[^\d]/g, '');
    };
    const hasError = !!errors[name];

    return (
        <div className={styles.formGroup} style={{ width }}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id={name}
                            value={field.value ? formatValue(field.value) : ''}
                            onChange={(e) => field.onChange(parseValue(e.target.value))}
                            className={`${styles.input} ${hasError ? styles.inputError : ''}`}                        />
                    </div>
                )}
            />
            {errors[name] && <span className={styles.error}>{(errors[name] as any).message}</span>}
        </div>
    );
};

export default AmountInput;
