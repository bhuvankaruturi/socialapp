import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Signout extends Component {
    render() {
        localStorage.removeItem('fbScaTok');
        this.props.isAuthenticated(false, '');
        localStorage.setItem('username', '');
        return (
            <Redirect to="/login"/>
        )
    }
}

export default Signout;
