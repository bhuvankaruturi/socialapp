import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';

// Redux imports
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadThis.formStyles
})

class Signup extends Component {
    constructor(props) {
        super(props);
        // if (isAuthenticated()) this.props.history.push('/');
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.signupUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes, UI: {loading}} = this.props;
        let {UI: {errors}} = this.props;
        if (this.props.user.authenticated) return (<Redirect to="/"/>);
        return (
          <Grid container className={classes.form}>
              <Grid item sm/>
              <Grid item sm>
                <img src={icon} alt="App Icon" className={classes.image}/>
                <Typography variant="h4" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="username" 
                            name="username" 
                            type="username" 
                            label="Username" 
                            className={classes.testField}
                            helperText={errors.email}
                            error={errors.username ? true : false}
                            value= {this.state.username} 
                            onChange={this.handleChange}
                            required 
                            fullWidth/>
                    <TextField id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.testField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value= {this.state.email} 
                        onChange={this.handleChange} 
                        required
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
                        required
                        fullWidth/>
                    <TextField id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.testField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value= {this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        required
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
                        Signup
                    {loading 
                    &&  (<CircularProgress size={20} 
                        className={classes.progress}/>)}
                    </Button>
                    <small>Already have an account? Login <Link to="/login">here</Link></small>
                </form>
              </Grid>
              <Grid item sm/>
          </Grid>  
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
};

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));