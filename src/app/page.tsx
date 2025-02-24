"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/title";
import Filters from "@/components/filters";
import styles from "./page.module.css";
import ProductList from "@/components/productList";
import { fetchCars } from "@/containers/home/utils/fetchsHome";
import { Car } from "@/components/card/types";


const Home: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filterData, setFilterData] = useState({
        filterOption: "Todos",
        sortOption: "Ordenar por"
    });

    useEffect(() => {
        const loadCars = async () => {
            const fetchedCars = await fetchCars();
            setCars(fetchedCars);
        };

        loadCars();
    }, []);

    return (
        <div>
            <div className={styles.body}>
                <div className={styles.titleFilters}>
                    <PageTitle text="Descubrí todos los modelos" />
                    <Filters filterData={filterData} setFilterData={setFilterData} />
                </div>
                <ProductList cars={cars} filterData={filterData} />
            </div>
        </div>
    );
};

export default Home;
