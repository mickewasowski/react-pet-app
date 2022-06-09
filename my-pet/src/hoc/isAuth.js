import {Redirect} from 'react-router-dom';
import {useAuth} from '../contexts/UserContext';

export const isAuth = (Component) => {

   const EnhancedComponent = (props) => {
      const {isAuthenticated} = useAuth();

      return isAuthenticated 
      ? <Component {...props} />
      : <Redirect to="/user/login"/>
   }

   return EnhancedComponent;
}


export const isNotAuth = (Component) => {

   const EnhancedComponent = (props) => {
      const {isAuthenticated} = useAuth();

      return isAuthenticated 
      ? <Redirect to="/"/>
      : <Component {...props} />
   }

   return EnhancedComponent;
}