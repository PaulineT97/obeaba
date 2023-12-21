import React, { useState, useEffect } from 'react';
import styles from "./Carrousel.module.scss";

export default function Slider() {
    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log('Render - currentIndex:', currentIndex);
        console.log('Render - carouselData:', carouselData);
    }, [currentIndex, carouselData]);

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

                setCarouselData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); 

    const goToNextSlide = () => {
        const nextIndex = (currentIndex + 1) % carouselData.length;
        console.log('Next Index:', nextIndex);
        setCurrentIndex(nextIndex);
    };

    const goToPrevSlide = () => {
        const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        console.log('Prev Index:', prevIndex);
        setCurrentIndex(prevIndex);
    };

    const slideWidth = 100 / (carouselData.length);
    const slidesToShow = 3;
    const translateValue = -slideWidth * slidesToShow * currentIndex + '%';
    const sliderStyle = {
        transform: `translateX(${translateValue})`,
    };

    return (
        <div className={styles.allContainer}>
            <i className="fa-solid fa-angles-left Orange"
                onClick={goToPrevSlide}
                style={{ marginLeft: "2%" }}></i>
            <div className={styles.carrouselContainer}>

                <div className={styles.carrouselSlider} style={sliderStyle}>
                    {carouselData.map((element, index) => (
                        <div
                            key={index}
                            className={` slideContainer ${styles.carrouselSlide}`}
                        >
                            <div className="imgCarrousel">
                                <img src={element.photo} alt={`Portrait de ${element.nom}`} />
                            </div>

                            <div className="txt">
                                <h2>{element.nom}, {element.certification} </h2>
                                <p>{element.introduction}</p>
                            </div>


                        </div>
                    ))}
                </div>

            </div>
            <i className="fa-solid fa-angles-right Orange"
                onClick={goToNextSlide}
                style={{ marginLeft: "4%" }}></i>
        </div>

    );
};
