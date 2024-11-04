import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    backgroundColor?: string;
    textColor?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = '', disabled = false, type, backgroundColor, textColor }) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={{ backgroundColor, color: textColor }}
        >
            {text}
        </button>
    );
};

export default Button;
