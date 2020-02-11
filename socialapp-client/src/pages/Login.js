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
});

class Login extends Component {
    constructor(props) {
        super(props);
        // if (isAuthenticated()) this.props.history.push('/');
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
        .then(res => {
            localStorage.setItem("fbScaTok", `Bearer ${res.data.token}`);
            localStorage.setItem("username", "username");
            this.setState({
                loading: false
            });
            this.props.isAuthenticated(true, "username");
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);