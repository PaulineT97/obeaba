const API_USERS = "/api/users";


export async function createUser(newUser) {
    console.log("Sending request to register:", newUser);
    const response = await fetch(`${API_USERS}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API create User:');
            throw new Error('Unexpected error');
        }
    }
}

export async function updateUser(actualUser) {
    console.log("Sending request to update:", actualUser);
    const response = await fetch(`${API_USERS}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(actualUser),
    });
    const backResponse = await response.json();
    if (response.ok) {
        console.log(backResponse);
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            console.error('Error API update User:');
            throw new Error('Unexpected error');
        }
    }
}

export async function signin(values) {
    const response = await fetch(`${API_USERS}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    const backResponse = await response.json();
    if (response.ok) {
        return backResponse;
    } else {
        if (backResponse) {
            throw backResponse;
        } else {
            throw new Error("Error API login");
        }
    }
}

export async function getConnectedUser() {
    const response = await fetch(`${API_USERS}/userConnected`);
    const user = await response.json();
    return user;
}

export async function signout() {
    await fetch(`${API_USERS}/logout`, {
        method: "DELETE",
    })
}

export async function deleteUserBack(idAd) {
    console.log("Sending request to delete a user:", idAd);
    const response = await fetch(`${API_USERS}/deleteUserBDD`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idAd }),
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