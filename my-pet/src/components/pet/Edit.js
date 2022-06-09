import styles from './Edit.module.css';

import { useState, useEffect } from 'react';
import { isAuth } from '../../hoc/isAuth';

import * as petService from '../../services/petService';



const Edit = ({
    match,
}) => {
    const [pet, setPet] = useState({});

    useEffect(() => {
        petService.getOne(match.params.petId)
            .then(result => {
                setPet(result)
            });

    }, [match]);

    const submitHandler = async (e) => {
        e.preventDefault();
    }


    return (
        <form className={styles.editPetForm} action="" onSubmit={submitHandler}>
            <div className="editPet">
                <div className={styles.formHeadings}>
                    <h3>EDIT PET</h3>
                    <img src={pet.imageURL} alt="animalPicture"
                        width="100px" height="100px" />
                </div>
                <div>
                    <label>Pet name : </label>
                    <input type="text" defaultValue={pet.petName}></input>
                </div>
                <div>
                    <label>Breed : </label>
                    <input type="text" defaultValue={pet.breed}></input>
                </div>
                <div>
                    <label>Age : </label>
                    <input type="number" defaultValue={pet.age}></input>
                </div>
                <div>
                    <label>Type : </label>
                    <input type="text" defaultValue={pet.type}></input>
                </div>
                <div className={styles.btnContainer}>
                    <button type="submit"> EDIT </button>
                </div>
            </div>
        </form>
    );
}

const EnhancedComponent = isAuth(Edit);

export default EnhancedComponent;