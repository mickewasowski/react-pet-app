import styles from './Create.module.css';

import { useAuth } from '../../contexts/UserContext';
import { isAuth } from '../../hoc/isAuth';

import * as petService from '../../services/petService';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Create() {
    const initialState = {
        petName: "",
        breed: "",
        age: 0,
        type: "",
        imageURL: ""
    };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [preventSubmit, setPreventSubmit] = useState(false);

    let history = useHistory();

    const { user } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();

        setIsSubmit(true);
        setFormErrors(validate(formData));

        if (preventSubmit) {
            let response = await petService.createPet(formData, user.userId);

            if (response._id) {
                history.push(`/pets/details/${response._id}`);
            }
        }
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setPreventSubmit(true);
        }
    }, [formErrors, isSubmit]);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validate = (values) => {
        let errors = {};

        if (!values.petName) {
            errors.petName = "Pet name is required!"
        } if (values.petName.length < 4 || values.petName.length > 10) {
            errors.petName = "Pet name must be between 4 and 10 characters!"
        }
        if (!values.breed) {
            errors.breed = "Breed is required!"
        }
        if (values.breed.length < 3) {
            errors.breed = "Breed must be at least 3 characters long!"
        }
        if (!values.age) {
            errors.age = "Age is required!"
        } if (values.age <= 0 || values.age > 20) {
            errors.age = "Age must be between 1 and 20 years!"
        }
        if (!values.type) {
            errors.type = "Animal species is required!"
        }
        if (!values.imageURL) {
            errors.imageURL = "Image is required!"
        }
        if (values.imageURL && (!values.imageURL.startsWith("http") || !values.imageURL.startsWith("https"))) {
            errors.imageURL = "Image must be a valid URL!"
        }

        return errors;
    }

    return (
        <div className={styles.addPetContainer}>
            <form onSubmit={submitHandler} className={styles.createPetForm}>
                <div className="createPet">
                    <div className={styles.formHeadings}>
                        <h3>ADD PET</h3>
                    </div>
                    <div>
                        <label>Pet name : </label>
                        <input type="text" placeholder="Enter Pet Name" name="petName" required
                            onChange={handleOnChange}
                            value={formData.petName} />
                        <p>{formErrors.petName}</p>
                    </div>
                    <div>
                        <label>Breed : </label>
                        <input type="text" placeholder="Enter Breed" name="breed" required
                            onChange={handleOnChange}
                            value={formData.breed} />
                        <p>{formErrors.breed}</p>
                    </div>
                    <div>
                        <label>Age : </label>
                        <input type="number" placeholder="Enter Age" name="age" required
                            onChange={handleOnChange}
                            value={formData.age} />
                        <p>{formErrors.age}</p>
                    </div>
                    <div>
                        <label>Species : </label>
                        {/* <input type="text" placeholder="Enter Type" name="type" required
                            onChange={handleOnChange}
                            value={formData.type} /> */}
                        <select className={styles.typeDropdown} name="type" onChange={handleOnChange}
                            value={formData.type}>
                            <option value=""> </option>
                            <option value="CAT">Cat</option>
                            <option value="DOG">Dog</option>
                            <option value="SNAKE">Snake</option>
                            <option value="PARROT">Parrot</option>
                        </select>
                        <p>{formErrors.type}</p>
                    </div>
                    <div>
                        <label>Image URL :</label>
                        <input type="text" placeholder="Enter Image URL" name="imageURL" required
                            onChange={handleOnChange}
                            value={formData.imageURL} />
                        <p>{formErrors.imageURL}</p>
                    </div>
                    <div className={styles.btnContainer}>
                        <button type="submit">ADD PET</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const EnhancedComponent = isAuth(Create);

export default EnhancedComponent;