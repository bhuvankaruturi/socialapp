import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class NavBar extends Component {
    render() {
        let signup;
        let login;
        if (this.props.authenticated) {
            signup = <Typography>Signed in as {this.props.username}</Typography>;
            login = <Button color="inherit" component={Link} to="/signout">Signout</Button>;
        } else {
            signup = <Button color="inherit" component={Link} to="/signup">Signup</Button>;
            login = <Button color="inherit" component={Link} to="/login">Login</Button>;
        }
        return (
            <React.Fragment>
                <AppBar position="fixed">
                    <Toolbar className="nav-container">
                        <Button color="inherit" component={Link} to="/">Home</Button> 
                        {signup}
                        {login}
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </React.Fragment>
        )
    }
}

export default NavBar;
