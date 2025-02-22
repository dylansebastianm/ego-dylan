"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { ProductDetail as ProductDetailType } from '@/components/productDetail/types';

interface ProductDetailProps {
    data: ProductDetailType;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ data }) => {
    return (
        <div className={styles.productDetail}>
            <div className={styles.imageContainer}>
                <Image src={data.photo} alt="car photo" width={700} height={480} />
            </div>

            <div className={styles.nameInformation}>
                <h3 className={styles.name}>{data.name}</h3>
                <div className={styles.information}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.description}>
                        {data.description.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
