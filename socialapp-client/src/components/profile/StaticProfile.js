import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
// MUI icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles =(theme) => ({
    ...theme.spreadThis.profile
});

export class StaticProfile extends Component {
    render() {
        const {classes, username, profile: {
            createdAt, 
            imageUrl, 
            bio, 
            website, 
            location
        }} = this.props;
        
        let profileMarkup =
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
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
                    </div>
                </div>
            </Paper>;
        return  profileMarkup;
    }
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
}

export default withStyles(styles)(StaticProfile);
