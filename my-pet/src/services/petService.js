const baseURL = 'http://localhost:5000';

export function getAll() {
    return fetch(`${baseURL}/pets/all`)
        .then(res => res.json())
}

export const getOne = (id) => fetch(`${baseURL}/pets/${id}`).then(res => res.json());

export const createPet = (petName, breed, age, type, imageURL, userId) =>
    fetch(`${baseURL}/pets/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petName,
            breed,
            age,
            type,
            imageURL,
            userId
        })
    })
        .then(res => { return res.json() });


export const getTopThreeAdded = () => fetch(`${baseURL}`)
    .then(res => res.json());
