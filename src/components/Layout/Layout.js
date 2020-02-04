import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        isToggled: true
    };

    toggleSidebar = () => {
        this.setState({
            isToggled: !this.state.isToggled
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer 
                    toggled={this.state.isToggled} 
                    toggle={this.toggleSidebar}
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    };
}

export default Layout;