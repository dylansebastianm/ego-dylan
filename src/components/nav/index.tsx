"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/logos/Logo.svg";
import MenuIcon from "../../../public/assets/nav/Menu.svg";

import styles from "./index.module.scss";

interface NavOptionProps {
    label: string;
    isActive: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const NavOption: React.FC<NavOptionProps> = ({ label, isActive, disabled, onClick }) => (
    <div
        className={`${styles.section} ${isActive ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
        onClick={!disabled ? onClick : undefined}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
        <p className={`${styles.option} ${isActive ? styles.active : ""}`}>{label}</p>
    </div>
);

interface NavProps {
    onMenuClick: () => void;
}

const Nav: React.FC<NavProps> = ({ onMenuClick }) => {
    const pathname = usePathname();
    const isProductPage = pathname.includes("/product/");

    return (
        <div className={styles.container}>
            <div className={styles.logoOptions}>
                <Link href="/" className={styles.logoLink}>
                    <Image src={Logo} alt="Logo" width={38} height={40} />
                </Link>

                <div className={styles.sectionContainer}>
                    <Link href="/" className={styles.link}>
                        <NavOption label="Modelos" isActive={!isProductPage} />
                    </Link>

                    <NavOption label="Ficha de modelo" isActive={isProductPage} disabled />
                </div>
            </div>

            <div className={styles.menuContainer} onClick={onMenuClick}>
                <span className={styles.menu}>Menú</span>
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
