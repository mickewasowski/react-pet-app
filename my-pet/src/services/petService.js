const baseURL = 'http://localhost:5000';

export function getAll() {
    return fetch(`${baseURL}/pets/all`)
        .then(res => res.json())
}

export const getOne = (id) => fetch(`${baseURL}/pets/${id}`).then(res => res.json());

export const createPet = ({ petName, breed, age, type, imageURL }, userId) =>
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
        .then(res => { return res.json() })
        .catch(err => { console.log(err) });


export const getTopThreeAdded = () => fetch(`${baseURL}`)
    .then(res => res.json());

export const updatePet = ({ petName, breed, _id }) =>
    fetch(`${baseURL}/pets/${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petName,
            breed,
        })
    })
        .then(res => { return res.json() })
        .catch(err => { console.log(err) });

export const deletePet = (petId) =>
    fetch(`${baseURL}/pets/${petId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => { console.log(res) })