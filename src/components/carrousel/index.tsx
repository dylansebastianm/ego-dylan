"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Card from "./card/index";
import Arrow from "../../../public/assets/carrousel/Arrow.jpg";

interface CarrouselProps {
    features: {
        name: string;
        description: string;
        image: string;
    }[];
}

const CARD_WIDTH = 292;
const MIN_CARDS = 10;

const Carrousel: React.FC<CarrouselProps> = ({ features }) => {
    const filledFeatures = [...features];
    while (filledFeatures.length < MIN_CARDS) {
        filledFeatures.push(...features);
    }

    const infiniteFeatures = [...filledFeatures, ...filledFeatures];

    const totalSlides = infiniteFeatures.length;
    const carouselContainerRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [delayedIndex, setDelayedIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const totalPages = Math.ceil(filledFeatures.length / visibleCount);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (carouselContainerRef.current) {
                const containerWidth = carouselContainerRef.current.offsetWidth;
                const count = Math.floor(containerWidth / CARD_WIDTH);
                setVisibleCount(count > 0 ? count : 1);
                setIsMobile(window.innerWidth < 900);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => {
            window.removeEventListener("resize", updateVisibleCount);
        };
    }, []);

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        if (currentIndex >= filledFeatures.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500);
        } else if (currentIndex < 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(filledFeatures.length - 1);
            }, 500);
        }
    }, [currentIndex, filledFeatures.length]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedIndex(currentIndex);
        }, 200);

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return;
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !isMobile) return;
        const diff = e.touches[0].clientX - startX;

        if (diff > 50) {
            prevSlide();
            setIsDragging(false);
        } else if (diff < -50) {
            nextSlide();
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className={styles.carrouselContainer}
            ref={carouselContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
                <Image src={Arrow} alt="Previous" width={12} height={21} style={{ transform: "rotate(180deg)" }} />
            </button>

            <div className={styles.carouselViewport}>
                <div
                    className={styles.cardsContainer}
                    style={{
                        width: `${totalSlides * CARD_WIDTH}px`,
                        transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
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
                                className={`${styles.cardWrapper} ${index >= delayedIndex + visibleCount || index === delayedIndex ? styles.faded : ""
                                    }`}
                            >
                                <Card name={trimmedName} description={feature.description} image={feature.image} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
                <Image src={Arrow} alt="Next" width={12} height={21} />
            </button>

            <div className={styles.pagination}>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.pageDot} ${i === Math.floor(currentIndex / visibleCount) ? styles.activePage : ""}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrousel;