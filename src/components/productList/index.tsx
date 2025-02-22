import React from 'react';
import Card from '@/components/card';
import { Car } from "@/components/card/types";
import styles from './index.module.scss'

interface ProductListProps {
    cars: Car[];
    filterData: { filterOption: string; sortOption: string };
}

const ProductList: React.FC<ProductListProps> = ({ cars, filterData }) => {
    let filteredCars = [...cars];

    if (filterData.filterOption !== "Todos") {
        filteredCars = filteredCars.filter(car => car.segment === filterData.filterOption);
    }

    if (filterData.sortOption === "De menor a mayor precio") {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (filterData.sortOption === "De mayor a menor precio") {
        filteredCars.sort((a, b) => b.price - a.price);
    } else if (filterData.sortOption === "Más nuevos primero") {
        filteredCars.sort((a, b) => b.year - a.year);
    } else if (filterData.sortOption === "Más viejos primero") {
        filteredCars.sort((a, b) => a.year - b.year);
    }

    return (
      <div className={styles.productList}>
            {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                    <Card key={car.id} data={car} />
                ))
            ) : (
                <p>No hay resultados para la selección actual.</p>
            )}
        </div>
    );
};

export default ProductList;
