"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import CloseIcon from "../../../public/assets/buttons/Close.svg";

interface DrawerProps {
    sections: string[][];
    onClose: () => void;
}

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className={styles.closeButton} onClick={onClose}>
        <span className={styles.close}>Cerrar</span>
        <Image src={CloseIcon} width={15} height={15} alt="close icon" />
    </div>
);

const OptionContainer: React.FC<{ options: string[] }> = ({ options }) => (
    <div className={styles.optionContainer}>
        {options.map((option) => (
            <span key={option} className={styles.option}>{option}</span>
        ))}
    </div>
);

const Drawer: React.FC<DrawerProps> = ({ sections, onClose }) => {
    return (
        <div className={styles.drawer}>
            <CloseButton onClose={onClose} />
            <div className={styles.optionsWrapper}>
                {sections.slice(0, -1).map((options, index) => (
                    <React.Fragment key={index}>
                        <OptionContainer options={options} />
                        <div className={styles.line} />
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.lastOptionWrapper}>
                <OptionContainer options={sections[sections.length - 1]} />
            </div>
        </div>
    );
};

export default Drawer;
