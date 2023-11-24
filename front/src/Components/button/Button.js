import React from 'react';
import styles from "./Button.module.scss";

export default function Button({content, onClick, className}) {
    return (
        <div className={`${styles.button}`}>
            <button className={className} onClick={onClick} type='button'>{content}</button>
            {/* le type button permet de ne pas faire recharger la page */}
        </div>
    )
}

