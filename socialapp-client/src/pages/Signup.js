import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';
import axios from 'axios';
import isAuthenticated from '../util/isAuthenticated';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.formStyles
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
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        axios.post('/signup', userData)
        .then(res => {
            localStorage.setItem("fbScaTok", `Bearer ${res.data.token}`);
            localStorage.setItem("username", this.state.username);
            this.setState({
                loading: false
            });
            this.props.isAuthenticated(true, this.state.username);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error(error);
            this.setState({
                errors: error.response ? error.response.data : error,
                loading: false
            })
        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
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
                    <TextField id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.testField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value= {this.state.confirmPassword} 
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);