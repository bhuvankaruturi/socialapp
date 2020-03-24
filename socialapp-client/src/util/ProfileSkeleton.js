import React from 'react';
import PropTypes from 'prop-types';
import noImg from '../images/no-img.webp';
import withStyles from '@material-ui/core/styles/withStyles';

//MUI imports
import Paper from '@material-ui/core/Paper';
//MUI icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadThis.profile,
    username: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto',
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '50%',
        marginBottom: 10
    }
})

function ProfileSkeleton(props) {
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="profile"  className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.username}></div>
                    <hr />
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <hr />
                    <LocationOn color="primary"/> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary"/> https://website.com
                    <hr />
                    <CalendarToday color="primary"/> Joined date
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);