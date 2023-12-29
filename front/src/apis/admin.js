const API_ADMIN = "http://127.0.0.1:8000/api/admin";

//NOTE - gestion des EDUCATEURS 

export async function fetchCertifications() {
    try {
        const response = await fetch(`${API_ADMIN}/getCertifications`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataBack = await response.json();
        console.log("fetch data", dataBack);

        return dataBack;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function addCertification(values) {
    console.log("Sending request to update:", values);
    const response = await fetch(`${API_ADMIN}/updateCertification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API update Certification:');
            throw new Error('Unexpected error');
        }
    }
}

export async function addEducator(values) {
    console.log("Sending request to add an educator:", values);
    const response = await fetch(`${API_ADMIN}/addEducator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API adding an educator:');
            throw new Error('Unexpected error');
        }
    }
}

export async function deleteEducBack(educateurId) {
    const response = await fetch(`${API_ADMIN}/deleteEducateur/${educateurId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API deleting an educator:');
            throw new Error('Unexpected error');
        }
    }
}

//NOTE - gestion des ADHERENTS

export async function fetchAllAdherents(){
    try {
        const response = await fetch(`${API_ADMIN}/getAdherents`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataBack = await response.json();
        console.log("fetch data", dataBack);

        return dataBack;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function deleteAdherentBack(adherentId) {
    const response = await fetch(`${API_ADMIN}/deleteAdherent/${adherentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API deleting an educator:');
            throw new Error('Unexpected error');
        }
    }
}

//NOTE - gestion des CHIENS

export async function fetchAllDogs(){
    try {
        const response = await fetch(`${API_ADMIN}/getDogs`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataBack = await response.json();
        console.log("fetch data", dataBack);

        return dataBack;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function changeLevel(values) {
    console.log("Sending request to update:", values);
    const response = await fetch(`${API_ADMIN}/updateLevel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API update Certification:');
            throw new Error('Unexpected error');
        }
    }
}