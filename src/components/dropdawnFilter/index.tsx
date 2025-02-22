import React from "react";
import styles from "./index.module.scss";

interface DropdawnFilterProps {
    selectedOption: string;
    onSelect: (option: string) => void;
}

const options = ["Nada", "De menor a mayor precio", "De mayor a menor precio", "Más nuevos primero", "Más viejos primero"];

const DropdawnFilter: React.FC<DropdawnFilterProps> = ({ selectedOption, onSelect }) => {
    return (
        <div className={styles.dropdawn}>
            {options.map((option) => (
                <div
                    key={option}
                    className={`${styles.optionContainer} ${selectedOption === option ? styles.active : ""}`}
                    onClick={() => onSelect(option)}
                >
                    <span className={styles.option}>
                        <b>{option}</b>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default DropdawnFilter;
