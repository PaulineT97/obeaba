import React from 'react';
import styles from './Home.module.scss';

const MapComponent = () => {
    const mapEmbedURL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1628.0192874413583!2d2.657724189083828!3d50.515767370413904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2304a7ac3a1d%3A0x1f1147aa4c740e27!2sAssurances%20Vigreux!5e0!3m2!1sfr!2sfr!4v1695745109685!5m2!1sfr!2sfr`;

    return (
        <div className={styles.map} 
        // style={{ height: '350px }}
        >
            <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapEmbedURL}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default MapComponent;