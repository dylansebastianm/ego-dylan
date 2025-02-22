import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface DropdawnFilterProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const DropdawnFilter: React.FC<DropdawnFilterProps> = ({ options, selectedOption, onSelect }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<"left" | "right">("right");

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const isOverflowingLeft = rect.left < 0;

            setPosition(isOverflowingLeft ? "left" : "right");
        }
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdawn} ${position === "left" ? styles.left : styles.right}`}
        >
            {options.map((option, index) => (
                <div
                    key={option}
                    className={`${styles.optionContainer} ${selectedOption === option ? styles.active : ""} ${index === 0 ? styles.firstOption : ""
                        }`}
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
