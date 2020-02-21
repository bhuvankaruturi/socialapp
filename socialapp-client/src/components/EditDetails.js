import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Redux Imports
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';
// MUI Imports
import {withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// MUI Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    
});

export class EditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            website: '',
            location: '',
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit() {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        let credentials = this.props.credentials;
        if (credentials.bio === userDetails.bio
            && credentials.website === userDetails.website
            && credentials.location === userDetails.location) {
                this.handleClose();
        } else {
            this.props.editUserDetails(userDetails);
            this.handleClose();
        }
    }
    handleOpen() {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose() {
        this.setState({open: false});
    }
    componentDidMount() {
        this.mapUserDetailsToState(this.props.credentials);        
    }
    mapUserDetailsToState(credentials) {
        const {bio, location, website} = credentials;
        this.setState({
            bio: bio ? bio : '',
            location: location ? location : '',
            website: website ? website : ''
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                             name="bio"
                             type="text"
                             label="Bio"
                             multiline
                             rows="3"
                             placeholder="A short bio about yourself"
                             className={classes.textField}
                             value={this.state.bio}
                             onChange={this.handleChange}
                             fullWidth
                             />
                             <TextField
                             name="website"
                             type="text"
                             label="Website"
                             placeholder="Your personal website"
                             className={classes.textField}
                             value={this.state.website}
                             onChange={this.handleChange}
                             fullWidth
                             />
                             <TextField
                             name="location"
                             type="text"
                             label="Location"
                             placeholder="Where you live"
                             className={classes.textField}
                             value={this.state.location}
                             onChange={this.handleChange}
                             fullWidth
                             />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
