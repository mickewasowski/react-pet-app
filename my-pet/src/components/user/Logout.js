import {useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';

const Logout = () => {
   const {logout} = useContext(UserContext);

   useEffect(() => {
      logout();
   }, []);
   
   return <Redirect to="/" />;
}

export default Logout;