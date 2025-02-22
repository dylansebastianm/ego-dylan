import React from 'react';
import styles from './index.module.scss';

type ButtonProps = {
    text: string;
    textColor?: string;
    containerClassName?: string;
    onClick?: () => void;  
};

const Button: React.FC<ButtonProps> = ({ text, textColor = '#FFFFFF', containerClassName = '', onClick }) => {
    return (
        <div 
            className={`${styles.container} ${containerClassName}`} 
            onClick={onClick}  
        >
            <span className={styles.text} style={{ color: textColor }}>
                {text}
            </span>
        </div>
    );
};

export default Button;
