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

const CARD_WIDTH = 292; // Ancho fijo de la carta
const MIN_CARDS = 10; // Mínimo de cartas a mostrar

const Carrousel: React.FC<CarrouselProps> = ({ features }) => {
  // Rellenar con datos duplicados si hay menos de 10
  const filledFeatures = [...features];
  while (filledFeatures.length < MIN_CARDS) {
    filledFeatures.push(...features);
  }

  // Para hacer el carrusel infinito duplicamos los elementos
  const infiniteFeatures = [...filledFeatures, ...filledFeatures];

  const totalSlides = infiniteFeatures.length;
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalPages = Math.ceil(filledFeatures.length / visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (carouselContainerRef.current) {
        const containerWidth = carouselContainerRef.current.offsetWidth;
        const count = Math.floor(containerWidth / CARD_WIDTH);
        setVisibleCount(count > 0 ? count : 1);
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

  // Resetear el índice cuando alcanzamos los límites para efecto infinito
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

  return (
    <div className={styles.carrouselContainer} ref={carouselContainerRef}>
      {/* Flecha Izquierda */}
      <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
        <Image src={Arrow} alt="Previous" width={12} height={21} style={{ transform: "rotate(180deg)" }} />
      </button>

      {/* Carrusel */}
      <div className={styles.carouselViewport}>
        <div
          className={styles.cardsContainer}
          style={{
            width: `${totalSlides * CARD_WIDTH}px`,
            transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {infiniteFeatures.map((feature, index) => (
            <div
              key={index}
              className={`${styles.cardWrapper} ${
                index >= currentIndex + visibleCount ? styles.faded : ""
              }`}
            >
              <Card name={feature.name} description={feature.description} image={feature.image} />
            </div>
          ))}
        </div>
      </div>

      {/* Flecha Derecha */}
      <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
        <Image src={Arrow} alt="Next" width={12} height={21} />
      </button>

      {/* Paginación */}
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
