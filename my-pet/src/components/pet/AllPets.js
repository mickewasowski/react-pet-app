import styles from './AllPets.module.css';

import {isAuth} from '../../hoc/isAuth';

import { useState, useEffect } from 'react';

import * as petService from '../../services/petService';

import './partials/PetPartial';
import PetPartial from './partials/PetPartial';

function AllPets(){

   const [pets, setPets] = useState([]);

   useEffect(() => {
      async function fetch(){
         let result = await petService.getAll();

         setPets(result);
      }

      fetch();
   }, []);

   return(
      <div >
         <h3>ALL PETS</h3>

         <div className={styles.allPetsContainer}>
            
            {
               pets.length > 0 
               ? pets.map(x => 
                  
                  <PetPartial 
                     key={x._id}
                     pet={x}
                  />
                  )
                  : <p>No pets found yet.</p>
            }

         </div>
                  
         
      </div>
   );
}

const EnhancedComponent = isAuth(AllPets);

export default EnhancedComponent;