import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class NavBar extends Component {
    render() {
        return (
            <React.Fragment>
                <AppBar position="fixed">
                    <Toolbar className="nav-container">
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </React.Fragment>
        )
    }
}

export default NavBar;
