import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            return { isToggled: !prevState.isToggled }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuthenticate={this.props.isAuthorized}
                    toggle={this.toggleSidebar} />
                <SideDrawer
                    isAuthenticate={this.props.isAuthorized}
                    toggled={this.state.isToggled}
                    toggle={this.toggleSidebar}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuthorized: state.auth.token != null
    };
};

export default connect(mapStateToProps)(Layout);