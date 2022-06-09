import styles from './HomeScreen.module.css';
import { useAuth } from '../../contexts/UserContext';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import * as petService from '../../services/petService';
import PetPartial from '../pet/partials/PetPartial';


const HomeScreen = () => {
   const { user } = useAuth();

   const [topPets, setTopPets] = useState([]);

   useEffect(() => {
      petService.getTopThreeAdded()
         .then(res => {
            setTopPets(res);
         });
   }, []);

   return (
      <div className={styles.homeContainer}>
         <div>
            <h2 style={{ margin: 0 }}>Welcome to the pet app!</h2>
            <p>Here you can add your pet's details and share them with everyone!</p>
            {
               !user
                  ?
                  <p>You can <NavLink to={"user/register"}>SignUp</NavLink> and start sharing or you can <NavLink to={"user/login"}>SignIn</NavLink> if you already have an account!</p>
                  :
                  ""
            }
         </div>
         <div>
            <h3>Check out the latest pets who joined us:</h3>
            <div className={styles.topPetsAdded}>
               {
                  topPets.length > 0
                     ? topPets.map(x =>

                        <PetPartial
                           key={x._id}
                           pet={x}
                        />
                     )
                     : <p>No pets added yet.</p>
               }
            </div>
         </div>

      </div>
   );

};

export default HomeScreen;