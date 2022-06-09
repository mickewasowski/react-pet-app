import { useState } from 'react';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/UserContext';

import { NavLink } from 'react-router-dom'

function Header() {
    const { user } = useAuth();
    const [isActive, setIsActive] = useState(false);

    const dropdown = () => {
        setIsActive(!isActive);
    }

    let activeStyles = { backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '3px' };

    return (
        <header>
            <div className={styles.brandName}><h2>MY PETS</h2></div>
            {
                user.userId !== ''
                    ? <div className={styles.nameDiv}><h3>Hello, {user.fullName}!</h3></div>
                    : ''
            }

            <a className={styles.toggleButton} href="#" onClick={dropdown}>
                <span className={styles.dash}></span>
                <span className={styles.dash}></span>
                <span className={styles.dash}></span>
            </a>

            <div className={isActive ? `${styles.navigation} ${styles.active}` : styles.navigation}>
                <ul>
                    <li><NavLink to="/">HOME</NavLink></li>
                    {
                        user.userId !== ''
                            ? <>
                                <li><NavLink activeStyle={activeStyles} to="/pets/myPets">MY PETS</NavLink></li>
                                <li><NavLink activeStyle={activeStyles} to="/pets/all">ALL PETS</NavLink></li>
                                <li><NavLink activeStyle={activeStyles} to="/pets/create">CREATE</NavLink></li>
                                <li><NavLink activeStyle={activeStyles} to="/user/myprofile">MY PROFILE</NavLink></li>
                                <li><NavLink activeStyle={activeStyles} to="/user/logout">LOGOUT</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink activeStyle={activeStyles} to="/user/register">REGISTER</NavLink></li>
                                <li><NavLink activeStyle={activeStyles} to="/user/login">LOGIN</NavLink></li>
                            </>
                    }
                </ul>
            </div>
        </header>
    );
}

export default Header;