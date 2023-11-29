import React, { useState, useEffect } from 'react';
import styles from "./Carrousel.module.scss";

export default function Slider() {
    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/api/educators/allEducateurs');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const dataBack = await response.json();
                console.log(dataBack);

                // Assuming dataBack is an array of educateurs
                const formattedData = dataBack.map(educateur => ({
                    nom: educateur.nom,
                    introduction: educateur.introduction,
                    photo: educateur.photo,
                }));

                setCarouselData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); // Le tableau vide [] signifie que cet effet ne s'exécutera qu'une fois après le montage initial.

    const goToNextSlide = () => {
        const nextIndex = (currentIndex + 1) % carouselData.length;
        setCurrentIndex(nextIndex);
    };

    const goToPrevSlide = () => {
        const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <div className={styles.carrouselContainer}>
            <div className={styles.carrouselSlider}>
                {carouselData.map((element, index) => (
                    <div
                        key={index}
                        className={`${styles.carrouselSlide} ${index === currentIndex ? styles.carrouselSlideActive : ''}`}
                    >
                        <h2>{element.nom}</h2>
                        <p>{element.introduction}</p>
                        <img src={element.photo} alt={`Portrait de ${element.nom}`} />
                    </div>
                ))}
            </div>
            <button onClick={goToPrevSlide}>Previous</button>
            <button onClick={goToNextSlide}>Next</button>
        </div>
    );
};
