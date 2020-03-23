import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    cardContent: {
        paddingTop: 2
    }
})

export class Comment extends Component {
    render() {
        const {classes, comment} = this.props;
        return (
            <Card raised={false} elevation={0}>
                <CardHeader
                    avatar={
                        <Avatar alt="profile" src={comment.userImage} className={classes.small}/>
                    }
                    title={<Typography variant="subtitle1" 
                            color="primary" 
                            component={Link} 
                            to={`/user/${comment.username}`}>
                        {comment.username}
                    </Typography>}
                    subheader={dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {comment.body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
}

export default withStyles(styles)(Comment);
