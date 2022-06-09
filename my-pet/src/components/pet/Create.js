import styles from './Create.module.css';

import {useAuth} from '../../contexts/UserContext';
import {isAuth} from '../../hoc/isAuth';

import * as petService from '../../services/petService';
import { useHistory } from 'react-router-dom';


function Create() {
    let history = useHistory();

    const {user} = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let petName = formData.get('petName');
        let breed = formData.get('breed');
        let age = formData.get('age');
        let type = formData.get('type');
        let imageURL = formData.get('imageURL');
        
        let response = await petService.createPet(petName, breed, age, type, imageURL, user.userId);

        if(response._id){
            //history.push('/pets/all');
            history.push(`/pets/details/${response._id}`);
        }
    }


   return (
         <form onSubmit={submitHandler} className={styles.createPetForm}>
            <div className="createPet">
                <div className={styles.formHeadings}>
                    <h3>ADD PET</h3>
                </div>
                <div>
                <label>Pet name : </label>
                <input type="text" placeholder="Enter Pet Name" name="petName" required />
            </div><div>
                <label>Breed : </label>
                <input type="text" placeholder="Enter Breed" name="breed" required />
            </div>
            <div>
                <label>Age : </label>
                <input type="number" placeholder="Enter Age" name="age" required />
            </div>
            <div>
                <label>Type : </label>
                <input type="text" placeholder="Enter Type" name="type" required />
            </div>
            <div>
                <label>Image URL :</label>
                <input type="text" placeholder="Enter Image URL" name="imageURL" required />
            </div>
            <div className={styles.btnContainer}>
                <button type="submit">ADD PET</button>
            </div>
            </div>
        </form>
   );
}

const EnhancedComponent = isAuth(Create);

export default EnhancedComponent;