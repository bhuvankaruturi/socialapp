import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';

// Redux imports
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.formStyles
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {classes, UI: {loading}} = this.props;
        let {UI: {errors}} = this.props;
        if (errors == null) errors = {};
        if (this.props.user.authenticated) return (<Redirect to="/"/>);
        return (
          <Grid container className={classes.form}>
              <Grid item sm/>
              <Grid item sm>
                <img src={icon} alt="App Icon" className={classes.image}/>
                <Typography variant="h4" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.testField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value= {this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    <TextField id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.testField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}>
                        Login
                    {loading 
                    &&  (<CircularProgress size={20} 
                        className={classes.progress}/>)}
                    </Button>
                    <small>Don't have an account? Signup <Link to="/signup">here</Link> </small>
                </form>
              </Grid>
              <Grid item sm/>
          </Grid>  
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
};

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));