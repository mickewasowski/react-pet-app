import {useState, useEffect} from 'react';
import {useAuth} from '../../contexts/UserContext';
import {isAuth} from '../../hoc/isAuth';

import * as userService from '../../services/userService';

import styles from './MyPets.module.css';

import PetPartial from '../pet/partials/PetPartial';

const MyPets = () => {
   const {user} = useAuth();

   const [pets, setPets] = useState([]);

   useEffect(() => {
      userService.getById(user.userId)
         .then(res => {
            if (res.myPets.length > 0) {
               setPets(res.myPets);
            }
         })
   }, [user]);


   return (
      <div>
         <h2 className={styles.formHeadings}>My pets</h2>
         <div className={styles.myPets}>
               {
                  pets.length > 0
                  ? 
                  pets.map(x => 
                        <PetPartial key={x._id} pet={x}/>
                     )
                  :  <p>You have no pets yet :/</p>
               }
         </div>
      </div>
   );
}

const EnhancedComponent = isAuth(MyPets);

export default EnhancedComponent;