import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux imports
import {connect} from 'react-redux';
import {markNotificationsRead} from  '../../redux/actions/userActions';

// MUI imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
// MUI icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import ThumpUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';

class Notifications extends Component {
    state = {
        anchorEl: null
    };

    handleOpen = (event) => {
        this.setState({anchorEl: event.target})
        // this.onMenuOpened();
    }

    handleClose = () => {
        this.setState({anchorEl: null});
    }

    onMenuOpened = () => {
        let unreadNotifications = this.props.notifications
                                    .filter(notification => !notification.read)
                                    .map(notification => notification.id);
        this.props.markNotificationsRead(unreadNotifications);
    }

    render() {
        const {notifications} = this.props;
        const anchorEl = this.state.anchorEl;
        let notificationIcon = (<NotificationsIcon color="action"/>);

        dayjs.extend(relativeTime);

        if (notifications && notifications.length > 0) {
            let unreadCount = notifications.filter(notification => !notification.read).length;
            if (unreadCount > 0) {
                notificationIcon = (
                    <Badge badgeContent={unreadCount} color="secondary">
                        <NotificationsIcon color="action"/>
                    </Badge>
                );
            }
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notification => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(notification.createdAt).fromNow();
                const iconColor = notification.read ? 'primary' : 'secondary';
                const icon = notification.type === 'like' ? (
                                <ThumpUpIcon color={iconColor} style={{marginRight: 10}}/>
                            ) : (
                                <CommentIcon color={iconColor} style={{marginRight: 10}} />
                            )
                return (
                    <MenuItem key={notification.id} onClick={this.handleClose}>
                        {icon}
                        <Typography 
                            component={Link}
                            color="textPrimary"
                            variant="body1"
                            to={`/user/${notification.recipient}/post/${notification.postId}`}
                        >
                            {notification.sender} {verb} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications
            </MenuItem>
        );
        return (
            <Fragment>
                <Tooltip placement="bottom" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
                    </IconButton>
                </Tooltip> 
                <Menu 
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);