import React from 'react';
import styles from './index.module.scss';

type PageTitleProps = {
    text: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
    return (
        <h1 className={styles.title}>
            {text}
        </h1>
    );
};

export default PageTitle;
