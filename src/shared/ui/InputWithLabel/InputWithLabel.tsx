import React from 'react';
import {Controller, Control, RegisterOptions} from 'react-hook-form';
import styles from './InputWithLabel.module.css';
import InputMaskWithRef from "../../../components/InputMaskWithRef/InputMaskWithRef";

interface InputWithLabelProps {
    name: string;
    label: string;
    control: Control<any>;
    mask?: string;
    error?: string;
    placeholder?: string;
    width?: string;
    rules?: RegisterOptions;
}

const InputWithLabel = ({ name, label, control, mask, error, placeholder, width, rules }: InputWithLabelProps) => {
    return (
        <div className={styles.formGroup} style={{ width }}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <InputMaskWithRef
                        {...field}
                        mask={mask || ''}
                        id={name}
                        placeholder={placeholder}
                        className={`${styles.input} ${error ? styles.inputError : ''}`}
                    />
                )}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default InputWithLabel;
