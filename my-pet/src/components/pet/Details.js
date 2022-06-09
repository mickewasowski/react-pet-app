import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/UserContext';
import { isAuth } from '../../hoc/isAuth';

import styles from './Details.module.css';
import * as petService from '../../services/petService';
import * as userService from '../../services/userService';

const Details = ({
    match,
}) => {
    const { user } = useAuth();
    let history = useHistory();

    const [pet, setPet] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const [owner, setOwner] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const petId = match.params.petId;

        petService.getOne(petId)
            .then(result => {
                setPet(result)

                if (result.owner === user.userId) {
                    setOwner(user.fullName);
                    setIsCreator(true);
                }
                else {
                    userService.getById(result.owner)
                        .then(res => { setOwner(res.fullName) })
                }
            });

    }, [match, user]);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const deleteFromDb = async () => {
        await petService.deletePet(pet._id);

        history.push('/pets/all');
    }

    return (
        <div className={styles.detailsContainer}>

            <div className={styles.main}>
                <div>
                    <img className={styles.petImg} src={pet.imageURL} alt="animalPicture" />
                </div>
                <div>
                    <div>
                        <div className={styles.card}>
                            <h2>Pet Name : {pet.petName} </h2>
                            <h3>Owner : {owner}</h3>
                            <h3>Breed : {pet.breed} </h3>
                            <h3>Age : {pet.age} </h3>
                        </div>

                        {
                            isCreator === true
                                ?
                                <div className="buttonsContainer">
                                    <Link to={`/pets/edit/${pet._id}`} className={styles.editBtn}>Edit</Link>
                                    <button className={styles.delBtn} onClick={showModal}>Delete</button>
                                </div>
                                : ''
                        }
                    </div>
                </div>
            </div>

            {
                isModalVisible
                    ?
                    <div className={styles.deletePetModal}>
                        <div className={styles.options}>
                            <h3>Are you sure you want to delete this pet?</h3>
                            <button id={styles.confirm} onClick={deleteFromDb}>Yes</button>
                            <button id={styles.decline} onClick={() => { setIsModalVisible(false) }}>Cancel</button>
                        </div>
                    </div>
                    :
                    ""
            }

        </div>
    );
}

const EnhancedComponent = isAuth(Details);

export default EnhancedComponent;