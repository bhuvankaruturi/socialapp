import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MuiButton from '../../util/MuiButton';
import NewPost from '../post/NewPost';
// Redux imports
import {connect} from 'react-redux';
// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// MUI Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import SignoutIcon from '@material-ui/icons/ExitToApp';

export class NavBar extends Component {
    render() {
        return <React.Fragment>
                <AppBar position="fixed">
                    <Toolbar className="nav-container">
                        {this.props.authenticated
                        ?   <React.Fragment>
                                <NewPost />
                                <Link to="/">
                                    <MuiButton tip="Home">
                                        <HomeIcon color="action"/>
                                    </MuiButton>
                                </Link>
                                <MuiButton tip="Notifications">
                                    <Notifications color="action"/>
                                </MuiButton>
                                <Link to="/signout">
                                    <MuiButton tip="Signout">
                                        <SignoutIcon color="action"/>
                                    </MuiButton>
                                </Link>
                            </React.Fragment>
                        :   <React.Fragment>
                                <Button color="inherit" component={Link} to="/">Home</Button> 
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                            </React.Fragment>
                        }    
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </React.Fragment>;
    }
}

const MapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated,
    }
}

export default connect(MapStateToProps)(NavBar);
