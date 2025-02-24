"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Card from "./card/index";
import Arrow from "../../../public/assets/carrousel/Arrow.jpg";
import { useCarrousel } from "./hooks/useCarrousel";

interface CarrouselProps {
    features: {
        name: string;
        description: string;
        image: string;
    }[];
}

const Carrousel: React.FC<CarrouselProps> = ({ features }) => {
    const { refs, state, data, handlers } = useCarrousel({ features });

    return (
        <div
            className={styles.carrouselContainer}
            ref={refs.carouselContainerRef}
            onTouchStart={handlers.handleTouchStart}
            onTouchMove={handlers.handleTouchMove}
            onTouchEnd={handlers.handleTouchEnd}
        >
            <ArrowButton direction="left" onClick={handlers.prevSlide} />

            <CarouselViewport
                infiniteFeatures={data.infiniteFeatures}
                currentIndex={state.currentIndex}
                visibleCount={state.visibleCount}
                isTransitioning={state.isTransitioning}
                delayedIndex={state.delayedIndex}
            />

            <ArrowButton direction="right" onClick={handlers.nextSlide} />

            <Pagination totalPages={state.totalPages} currentIndex={state.currentIndex} visibleCount={state.visibleCount} />
        </div>
    );
};

const ArrowButton: React.FC<{ direction: "left" | "right"; onClick: () => void }> = ({ direction, onClick }) => (
    <button className={`${styles.arrow} ${direction === "left" ? styles.left : styles.right}`} onClick={onClick}>
        <Image
            src={Arrow}
            alt={direction === "left" ? "Previous" : "Next"}
            width={12}
            height={21}
            style={direction === "left" ? { transform: "rotate(180deg)" } : {}}
        />
    </button>
);

const CarouselViewport: React.FC<{
    infiniteFeatures: { name: string; description: string; image: string }[];
    currentIndex: number;
    visibleCount: number;
    isTransitioning: boolean;
    delayedIndex: number;
}> = ({ infiniteFeatures, currentIndex, visibleCount, isTransitioning, delayedIndex }) => (
    <div className={styles.carouselViewport}>
        <div
            className={styles.cardsContainer}
            style={{
                transform: `translateX(-${currentIndex * 292}px)`,
                transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
            }}
        >
            {infiniteFeatures.map((feature, index) => {
                const words = feature.name.split(" ");
                let trimmedName = words.slice(0, 3).join(" ");
                if (words[3] && words[3].length > 3) {
                    trimmedName += " " + words[3];
                } else if (words[4]) {
                    trimmedName += " " + words[4];
                }

                return (
                    <div
                        key={index}
                        className={`${styles.cardWrapper} ${
                            index >= delayedIndex + visibleCount || index === delayedIndex ? styles.faded : ""
                        }`}
                    >
                        <Card name={trimmedName} description={feature.description} image={feature.image} />
                    </div>
                );
            })}
        </div>
    </div>
);

const Pagination: React.FC<{ totalPages: number; currentIndex: number; visibleCount: number }> = ({
    totalPages,
    currentIndex,
    visibleCount,
}) => (
    <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} className={`${styles.pageDot} ${i === Math.floor(currentIndex / visibleCount) ? styles.activePage : ""}`} />
        ))}
    </div>
);

export default Carrousel;
