import React from 'react';

import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="Burger-logo" />
        </div>
    );
};

export default logo;