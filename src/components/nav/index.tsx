"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logos/Logo.svg";
import MenuIcon from "../../../public/assets/nav/Menu.svg";

import styles from "./index.module.scss";

interface NavOptionProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavOption: React.FC<NavOptionProps> = ({ label, isActive, onClick }) => (
    <div className={`${styles.section} ${isActive ? styles.active : ""}`} onClick={onClick}>
        <p className={`${styles.option} ${isActive ? styles.active : ""}`}>{label}</p>
    </div>
);

interface NavProps {
    onMenuClick: () => void;
}

const Nav: React.FC<NavProps> = ({ onMenuClick }) => {
    const [activeOption, setActiveOption] = React.useState<string>("Modelos");

    const menuOptions = ["Modelos", "Ficha de modelo"];

    return (
        <div className={styles.container}>
            <div className={styles.logoOptions}>
                <Image src={Logo} alt="Logo" width={38} height={40} />
                <div className={styles.sectionContainer}>
                    {menuOptions.map((option) => (
                        <NavOption
                            key={option}
                            label={option}
                            isActive={activeOption === option}
                            onClick={() => setActiveOption(option)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.menuContainer} onClick={onMenuClick}>
                <span>Menú</span>
                <Image
                    className={styles.menuIcon}
                    src={MenuIcon}
                    alt="Menu Icon"
                    width={25}
                    height={18}
                />
            </div>
        </div>
    );
};

export default Nav;
