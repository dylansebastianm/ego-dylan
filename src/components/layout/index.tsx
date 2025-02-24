"use client";
import React, { useState } from "react";
import Nav from "../nav";
import Footer from "../footer";
import Drawer from "../drawer";
import { SECTIONS } from "@/containers/home/constants/drawerSections";
import styles from "./index.module.scss";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className={`${styles.layout} ${isDrawerOpen ? styles.drawerOpen : ""}`}>
            <Nav onMenuClick={() => setIsDrawerOpen(true)} />
            
            {isDrawerOpen ? (
                <Drawer sections={SECTIONS} onClose={() => setIsDrawerOpen(false)} />
            ) : (
                <main className={styles.main}>
                    <div className={styles.contentContainer}>{children}</div>
                    <Footer />
                </main>
            )}
        </div>
    );
};

export default Layout;
