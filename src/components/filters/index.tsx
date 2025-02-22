"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import ArrowIcon from "../../../public/assets/buttons/ArrowDown.svg";
import DropdawnFilter from "../dropdawnFilter";

interface FilterOptionProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ label, isActive, onClick }) => {
    return (
        <span
            className={`${styles.option} ${isActive ? styles.active : ""}`}
            onClick={onClick}
        >
            {label}
        </span>
    );
};

const FilterBy: React.FC<{ filterData: any; setFilterData: any }> = ({ filterData, setFilterData }) => {
    const filterOptions = ["Todos", "Autos", "Pickups y Comerciales", "SUVs y Crossovers"];

    return (
        <div className={styles.filterByOptions}>
            <p className={styles.filterBy}>Filtrar por</p>
            <div className={styles.optionContainer}>
                {filterOptions.map((option) => (
                    <FilterOption
                        key={option}
                        label={option}
                        isActive={filterData.filterOption === option}
                        onClick={() => setFilterData((prev: any) => ({ ...prev, filterOption: option }))}
                    />
                ))}
            </div>
        </div>
    );
};

const SortBy: React.FC<{ filterData: any; setFilterData: any }> = ({ filterData, setFilterData }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div className={styles.sortWrapper}>
            <div className={styles.filterButton} onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <p className={styles.filterBy}>{filterData.sortOption}</p>
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
