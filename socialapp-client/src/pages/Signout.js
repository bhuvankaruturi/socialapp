import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

// Redux imports
import {connect} from 'react-redux';
import {signoutUser} from '../redux/actions/userActions';

class Signout extends Component {
    componentDidMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <Redirect to="/login"/>
        )
    }
}


const mapActionstoProps = {
    signoutUser
};

export default connect(() => ({}), mapActionstoProps)(Signout);
