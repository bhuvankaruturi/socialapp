import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MuiButton from '../../util/MuiButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// Redux imports
import {connect} from 'react-redux';
import {uploadImage} from '../../redux/actions/userActions';
// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles =(theme) => ({
    ...theme.spreadThis.profile
});

export class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    render() {
        const {classes, user: {
            authenticated,
            username,
            credentials : {createdAt, imageUrl, bio, website, location}, 
            loading}} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                        <MuiButton tip="Edit Image" placement="top" btnClassName={classes.buttons} onClick={this.handleEditPicture}>
                            <EditIcon color="primary"/>
                        </MuiButton>
                    </div>  
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/user/${username}`} color="primary" variant="h5">
                            @{username}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"/> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        <hr/>
                        <EditDetails/>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton />);
        return  profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    uploadImage
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
