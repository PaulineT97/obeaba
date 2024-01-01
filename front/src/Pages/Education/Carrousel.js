import React, { useState, useEffect } from 'react';
import styles from "./Carrousel.module.scss";

export default function Slider() {
    const [carrouselData, setCarrouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8000/api/educators/allEducateurs');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const dataBack = await response.json();
                console.log("fetch data", dataBack);

                const formattedData = await Promise.all(dataBack.map(async educateur => {
                    if (educateur.photo && educateur.photo.data) {
                        const blob = new Blob([new Uint8Array(educateur.photo.data)]);
                        const imageUrl = URL.createObjectURL(blob);
                        return {
                            id: educateur.idEduc,
                            nom: educateur.nom,
                            certification: educateur.nameCertification,
                            introduction: educateur.introduction,
                            photo: imageUrl,
                        };
                    }
                }));
                console.log("formattedData", formattedData);

                setCarrouselData(formattedData);
                console.log(carrouselData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log(carrouselData);
    console.log(currentIndex);


    const nextSlide = () => {
        console.log('click next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carrouselData.length);
    };

    const prevSlide = () => {
        console.log('click prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + carrouselData.length) % carrouselData.length);
    };

    return (
        <div className={styles.allContainer}>
            <i className="fa-solid fa-angles-left Orange"
                onClick={prevSlide}
                style={{ marginLeft: "2%" }}></i>
            {carrouselData.length > 0 ? (
                <>
                    <div className={styles.carrouselContainer}>
                        <div className={styles.carrouselSlider}>
                            {carrouselData.map((slide, index) => (
                                <div key={index} className={`${styles.carrouselSlide} ${index === currentIndex ? styles.active : styles.autre}`}>
                                    <div className={styles.imageContainer}>
                                        <img src={slide.photo} alt={`Slide ${index + 1}`} />
                                    </div>
                                    <div className={styles.texteContainer}>
                                        <h2>{slide.nom}, {slide.certification} </h2>
                                        <p>{slide.introduction}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p className='titreArticle'>Chargement des éducateurs en cours ...</p>
            )}

            <i className="fa-solid fa-angles-right Orange"
                onClick={nextSlide}
                style={{ marginLeft: "4%" }}></i>
        </div>
    );
};