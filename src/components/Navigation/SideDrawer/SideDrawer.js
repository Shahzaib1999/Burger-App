import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props) => {

    let showSidebar = [classes.SideDrawer, classes.Close];
    
    if (props.toggled) {
        showSidebar = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop
                show={props.toggled}
                onHide={props.toggle}
            />
            <div className={showSidebar.join(' ')} onClick={props.toggle}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticate={props.isAuthenticate} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;