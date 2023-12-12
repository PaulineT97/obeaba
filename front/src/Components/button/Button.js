import React from 'react';
import styles from "./Button.module.scss";

export default function Button({content, onClick, className, type}) {
    return (
        <div className={`${styles.button}`}>
            <button className={className} onClick={onClick} type={type}>{content}</button>
        </div>
    )
}

