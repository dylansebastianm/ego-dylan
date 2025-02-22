"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

interface HighlightProps {  
    highlights: {
        title: string;
        content: string;
        image: string;
    }[];
}

const Highlight: React.FC<HighlightProps> = ({ highlights }) => {
    return (
        <div className={styles.highlightContainer}>
            {highlights.map((highlight, index) => (
                <div key={index} className={`${styles.highlight} ${index % 2 !== 0 ? styles.reversed : ""}`}>
                    <div className={styles.textContainer}>
                        <h3 className={styles.title}>{highlight.title}</h3>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: highlight.content }} />
                    </div>
                    <div className={styles.imageContainer}>
                        <Image src={highlight.image} alt={highlight.title} width={560} height={294.73} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Highlight;
