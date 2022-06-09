import styles from './Edit.module.css';

import { useState, useEffect } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useHistory } from 'react-router-dom';

import * as petService from '../../services/petService';



const Edit = ({
    match,
}) => {
    let history = useHistory();

    const [pet, setPet] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [preventSubmit, setPreventSubmit] = useState(false);

    useEffect(() => {
        petService.getOne(match.params.petId)
            .then(result => {
                setPet(result)
            });

    }, [match]);

    const submitHandler = async (e) => {
        e.preventDefault();

        setFormErrors(validate(pet));

        if (!preventSubmit) {
            let response = await petService.updatePet(pet);

            history.push(`/pets/details/${response._id}`);
        }
    }

    useEffect(() => {
        console.log(Object.keys(formErrors).length);
        if (Object.keys(formErrors).length > 0) {
            setPreventSubmit(true);
        }
        else if (Object.keys(formErrors).length === 0) {
            setPreventSubmit(false);
        }
    }, [formErrors])

    const handleChange = (e) => {
        let { name, value } = e.target;

        setPet({ ...pet, [name]: value })
    }

    const validate = ({ petName, breed }) => {
        const errors = {};

        if (!petName) {
            errors.petName = "Pet name is required!"
        }
        if (petName.length < 4) {
            errors.petName = "Pet name must be at least 4 characters long!"
        }

        if (!breed) {
            errors.breed = "Breed is required!"
        }
        if (breed.length < 3) {
            errors.breed = "Breed must be at least 3 characters long!"
        }

        return errors;
    }


    return (
        <div className={styles.editContainer}>
            <form className={styles.editPetForm} onSubmit={submitHandler}>
                <div className="editPet">
                    <div className={styles.formHeadings}>
                        <h3>EDIT PET</h3>
                        <img src={pet.imageURL} alt="animalPicture"
                            width="100px" height="100px" />
                    </div>
                    <div>
                        <label>Pet name : </label>
                        <input type="text" name="petName" defaultValue={pet.petName} onChange={handleChange} />
                        <p>{formErrors.petName}</p>
                    </div>
                    <div>
                        <label>Breed : </label>
                        <input type="text" name="breed" defaultValue={pet.breed} onChange={handleChange} />
                        <p>{formErrors.breed}</p>
                    </div>
                    <div className={styles.btnContainer}>
                        <button type="submit"> EDIT </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const EnhancedComponent = isAuth(Edit);

export default EnhancedComponent;