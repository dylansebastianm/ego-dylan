import { useState, useRef, useEffect } from "react";

const CARD_WIDTH = 292;
const MIN_CARDS = 10;

interface Feature {
    name: string;
    description: string;
    image: string;
}

interface UseCarrouselProps {
    features: Feature[];
}

export const useCarrousel = ({ features }: UseCarrouselProps) => {
    const filledFeatures = [...features];
    while (filledFeatures.length < MIN_CARDS) {
        filledFeatures.push(...features);
    }

    const infiniteFeatures = [...filledFeatures, ...filledFeatures];
    const totalSlides = infiniteFeatures.length;

    const carouselContainerRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState({
        visibleCount: 1,
        currentIndex: 0,
        isTransitioning: true,
        delayedIndex: 0,
        isDragging: false,
        startX: 0,
        isMobile: false,
    });

    const totalPages = Math.ceil(filledFeatures.length / state.visibleCount);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (carouselContainerRef.current) {
                const containerWidth = carouselContainerRef.current.offsetWidth;
                const count = Math.floor(containerWidth / CARD_WIDTH);
                setState((prev) => ({
                    ...prev,
                    visibleCount: count > 0 ? count : 1,
                    isMobile: window.innerWidth < 900,
                }));
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const nextSlide = () => {
        setState((prev) => ({
            ...prev,
            isTransitioning: true,
            currentIndex: prev.currentIndex + 1,
        }));
    };

    const prevSlide = () => {
        setState((prev) => ({
            ...prev,
            isTransitioning: true,
            currentIndex: prev.currentIndex - 1,
        }));
    };

    useEffect(() => {
        if (state.currentIndex >= filledFeatures.length) {
            setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    isTransitioning: false,
                    currentIndex: 0,
                }));
            }, 500);
        } else if (state.currentIndex < 0) {
            setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    isTransitioning: false,
                    currentIndex: filledFeatures.length - 1,
                }));
            }, 500);
        }
    }, [state.currentIndex, filledFeatures.length]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setState((prev) => ({
                ...prev,
                delayedIndex: prev.currentIndex,
            }));
        }, 200);
        return () => clearTimeout(timeout);
    }, [state.currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!state.isMobile) return;
        setState((prev) => ({ ...prev, isDragging: true, startX: e.touches[0].clientX }));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!state.isDragging || !state.isMobile) return;
        const diff = e.touches[0].clientX - state.startX;

        if (diff > 50) {
            prevSlide();
            setState((prev) => ({ ...prev, isDragging: false }));
        } else if (diff < -50) {
            nextSlide();
            setState((prev) => ({ ...prev, isDragging: false }));
        }
    };

    const handleTouchEnd = () => {
        setState((prev) => ({ ...prev, isDragging: false }));
    };

    return {
        refs: { carouselContainerRef },
        state: { ...state, totalPages },
        data: { infiniteFeatures, totalSlides },
        handlers: { handleTouchStart, handleTouchMove, handleTouchEnd, nextSlide, prevSlide },
    };
};
