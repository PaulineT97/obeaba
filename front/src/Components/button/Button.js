import React from 'react';
import styles from "./Button.module.scss";

export default function Button({content, onClick, className, type, title}) {
    return (
        <div className={`${styles.button}`}>
            <button className={className} onClick={onClick} type={type} title={title}>{content}</button>
        </div>
    )
}

