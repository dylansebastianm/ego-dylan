"use client";
import React from 'react';
import { CardProps } from './types';
import Image from 'next/image';
import styles from './index.module.scss';
import Button from '../button';
import { useRouter } from "next/navigation";

const Card: React.FC<CardProps> = ({ data }) => {
    const isLargeImage = data.id === 3;  // Comprobamos si el id es igual a 3 ya que esta imagen tiene un tamaño mas grande de lo normal 
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data.id}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.buttonContainer}>
                <Button text='Ver modelo' onClick={handleClick} />
            </div>
            <Title name={data.name} year={data.year} />
            <YearPrice year={data.year} price={data.price} />
            <Thumbnail src={data.thumbnail} alt={data.name} isLargeImage={isLargeImage} />
        </div>
    );
};

const Title: React.FC<{ name: string; year: number }> = ({ name, year }) => {
    return (
        <h1 className={styles.title}>
            {name}
        </h1>
    );
};

const YearPrice: React.FC<{ year: number; price: number }> = ({ year, price }) => {
    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    return (
        <div className={styles.yearPrice}>
            <span className={styles.year}>{year}</span> |
            <span className={styles.year}>{formattedPrice}</span>
        </div>
    );
};

const Thumbnail: React.FC<{ src: string; alt: string; isLargeImage: boolean }> = ({ src, alt, isLargeImage }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={200}
            height={132}
            className={`${styles.thumbnail} ${isLargeImage ? styles.largeImage : ''}`}  // Aplicamos la clase condicional
        />
    );
};


export default Card;
