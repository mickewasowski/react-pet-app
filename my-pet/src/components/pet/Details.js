import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { useAuth } from '../../contexts/UserContext';
import {isAuth} from '../../hoc/isAuth';

import styles from './Details.module.css';
import * as petService from '../../services/petService';
import * as userService from '../../services/userService';

const Details = ({
    match,
}) => {
    const {user} = useAuth();

    const [pet, setPet] = useState({});
    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        const petId = match.params.petId;

        petService.getOne(petId)
            .then(result => {
                setPet(result)
            });
        
    }, [match]);

    useEffect(() => {
        const userId = user.userId;

        userService.getById(userId)
        .then(res => {
            var pet = res.myPets.find(function(pet, index) {
                if (pet._id === match.params.petId) {
                    return true;
                }
            })

            if (pet !== undefined) {
                setIsCreator(true);
            }
        })
    }, [match]);

   return (
      <div className="details">
          
                <div className={styles.main}>
                    <div className="left">
                        <div className="petDetails">
                            <h1>Pet Name : {pet.petName} </h1>
                            <h3>Owner : </h3>
                            <div className="card">
                                <p>Breed : {pet.breed} </p>
                                <p>Age : {pet.age} </p>
                                <p>Type : {pet.type} </p>
                            </div>

                            {
                                isCreator === true
                                ?
                                <div className="buttonsContainer">
                                    <Link to={`/pets/edit/${pet._id}`} className={styles.editBtn}>Edit</Link>
                                    <Link to={`/pets/delete/${pet._id}`} className={styles.delBtn}>Delete</Link>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    <div >
                        <img className={styles.petImg} src={pet.imageURL} alt="animalPicture"/>
                    </div>
                </div>

      </div>
   );
}

const EnhancedComponent = isAuth(Details);

export default EnhancedComponent;