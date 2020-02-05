import React, { Component } from 'react';

import Aux from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        isToggled: false
    };

    toggleSidebar = () => {
        this.setState((prevState) => {
            return { isToggled: !this.state.isToggled }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar toggle={this.toggleSidebar} />
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