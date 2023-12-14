const API_DOGS = "/api/dogs";

export async function addDogs(newDog) {
    console.log("Sending request to add a dog:", newDog);
    const response = await fetch(`${API_DOGS}/addDog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDog),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API adding a dog:');
            throw new Error('Unexpected error');
        }
    }
}

export async function deleteDogBack(idChien) {
    console.log("Sending request to delete a dog:", idChien);
    const response = await fetch(`${API_DOGS}/deleteDog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({idChien:idChien}),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API deleting a dog:');
            throw new Error('Unexpected error');
        }
    }
}

export async function addActivity(values) {
    console.log("sending new activities to add :", values);
    const response = await fetch(`${API_DOGS}/addActivity`, {
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
            console.error('Error API deleting a dog:');
            throw new Error('Unexpected error');
        }
    }
}