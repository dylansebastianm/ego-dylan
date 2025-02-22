"use client";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import ArrowIcon from "../../../public/assets/buttons/ArrowDown.svg";
import DropdawnFilter from "../dropdawnFilter";

const filterOptions = ["Todos", "Autos", "Pickups y Comerciales", "SUVs y Crossovers"];
const sortOptions = ["Nada", "De menor a mayor precio", "De mayor a menor precio", "Más nuevos primero", "Más viejos primero"];

const FilterBy: React.FC<{ filterData: any; setFilterData: any }> = ({ filterData, setFilterData }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1200);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={styles.sortWrapper}>
            {isMobile ? (
                <div className={styles.filterButton} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                    <p className={styles.filterBy}>
                        {filterData.filterOption && filterData.filterOption !== "Todos"
                            ? filterData.filterOption
                            : "Filtrar por"}
                    </p>
                    <Image
                        src={ArrowIcon}
                        alt="order"
                        width={10}
                        height={6}
                        className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotate : ""}`}
                    />
                </div>
            ) : (
                <div className={styles.filterByOptions}>
                    <p className={styles.filterBy}>Filtrar por</p>
                    <div className={styles.optionContainer}>
                        {filterOptions.map((option) => (
                            <span
                                key={option}
                                className={`${styles.option} ${filterData.filterOption === option ? styles.active : ""}`}
                                onClick={() => setFilterData((prev: any) => ({ ...prev, filterOption: option }))}>
                                {option}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {isDropdownOpen && isMobile && (
                <DropdawnFilter
                    options={filterOptions}
                    selectedOption={filterData.filterOption}
                    onSelect={(option) => {
                        setFilterData((prev: any) => ({ ...prev, filterOption: option }));
                        setIsDropdownOpen(false);
                    }}
                />
            )}
        </div>
    );
};

const SortBy: React.FC<{ filterData: any; setFilterData: any }> = ({ filterData, setFilterData }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div className={styles.sortWrapper}>
            <div className={styles.filterButton} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <p className={styles.filterBy}>
                    {filterData.sortOption && sortOptions.includes(filterData.sortOption)
                        ? filterData.sortOption
                        : "Ordenar por"}
                </p>
                <Image
                    src={ArrowIcon}
                    alt="order"
                    width={10}
                    height={6}
                    className={`${styles.arrowIcon} ${isDropdownOpen ? styles.rotate : ""}`}
                />
            </div>
            {isDropdownOpen && (
                <DropdawnFilter
                    options={sortOptions}
                    selectedOption={filterData.sortOption}
                    onSelect={(option) => {
                        setFilterData((prev: any) => ({ ...prev, sortOption: option }));
                        setIsDropdownOpen(false);
                    }}
                />
            )}
        </div>
    );
};

const Filters: React.FC<{ filterData: any; setFilterData: any }> = ({ filterData, setFilterData }) => {
    return (
        <div className={styles.container}>
            <FilterBy filterData={filterData} setFilterData={setFilterData} />
            <SortBy filterData={filterData} setFilterData={setFilterData} />
        </div>
    );
};

export default Filters;
