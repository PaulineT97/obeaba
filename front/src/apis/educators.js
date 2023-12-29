const API_EDUC = "http://127.0.0.1:8000/api/educators";

export async function fetchAllEducateurs() {
    try {
        const response = await fetch(`${API_EDUC}/allEducateurs`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataBack = await response.json();
        // console.log("fetch data", dataBack);

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
        // console.log("formattedData", formattedData);

        return formattedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propage l'erreur pour que le composant puisse la gérer
    }
}
