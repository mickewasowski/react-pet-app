import styles from './Register.module.css';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isNotAuth } from '../../hoc/isAuth';

import * as userService from '../../services/userService';

function Register() {
   const [error, setError] = useState('');
   let history = useHistory();

   const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      let username = formData.get('username');
      let fullName = formData.get('fullName');
      let email = formData.get('email');
      let password = formData.get('password');
      let rePassword = formData.get('rePassword');

      userService.register(username, fullName, email, password, rePassword)
         .then(res => {
            if (!res._id) {
               return setError(res.message);
            }
            history.push('/user/login');
         })
   }

   return (
      <div className={styles.registerContainer}>
         <form className={styles.registerForm} onSubmit={submitHandler}>
            <div className="register">
               <div className={styles.formHeadings}>
                  <h3>REGISTER</h3>
                  <p className={styles.error}>{error}</p>
               </div>
               <div>
                  <label>Username : </label>
                  <input type="text" placeholder="Enter Username" name="username" required />
               </div>
               <div>
                  <label>Full Name : </label>
                  <input type="text" placeholder="Enter Full Name" name="fullName" required />
               </div>
               <div>
                  <label>Email : </label>
                  <input type="text" placeholder="Enter Email" name="email" required />
               </div>
               <div>
                  <label>Password : </label>
                  <input type="password" placeholder="Enter Password" name="password" required />
               </div>
               <div>
                  <label>Repeat Password : </label>
                  <input type="password" placeholder="Enter Repeat Password" name="rePassword" required />
               </div>
               <div className={styles.btnContainer}>
                  <button type="submit">REGISTER</button>
               </div>
            </div>
         </form>
      </div>
   )
}

const EnhancedComponent = isNotAuth(Register);


export default EnhancedComponent;