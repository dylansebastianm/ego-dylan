"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { ModelFeature } from "@/components/productDetail/types";

const Card: React.FC<ModelFeature> = ({ name, description, image }) => {
    return (
        <article className={styles.card}>
            <Image src={image} alt={name} width={268} height={146} />
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        </article>
    );
};

export default Card;
