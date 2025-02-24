"use client";
import React, { useEffect } from "react";
import Nav from "../nav";
import Footer from "../footer";
import Drawer from "../drawer";
import { SECTIONS } from "@/containers/home/constants/drawerSections";
import styles from "./index.module.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden"; // Bloquea el scroll en toda la página
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "auto"; // Restaura el scroll cuando se cierra
            document.body.style.height = "auto";
        }
    }, [isDrawerOpen]);

    return (
        <div className={`${styles.layout} ${isDrawerOpen ? styles.drawerOpen : ""}`}>
            <div className={styles.navWrapper}>
                <Nav onMenuClick={() => setIsDrawerOpen(true)} />
            </div>
            {isDrawerOpen && <Drawer sections={SECTIONS} onClose={() => setIsDrawerOpen(false)} />}
            <main className={styles.main}>
                <div className={styles.contentContainer}>{children}</div> 
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
