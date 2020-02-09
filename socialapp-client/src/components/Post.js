import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import withStyles from '@material-ui/core/styles/withStyles'; 

const styles = {
    card: {
        marginBottom: 15,
    },
    content: {
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime);
        let {classes, post} = this.props;
        return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar alt="Profile image" src={post.userImage} className={classes.avatar} />
                }
                title={<Typography variant="h6" color="primary" component={Link} to={`/users/${post.username}`}>
                    {post.username}
                </Typography>}
                subheader={dayjs(post.createdAt).fromNow() }
            />
            <CardContent classes={{root: classes.content}}>
                <Typography variant="body1" color="textPrimary" component="p">{post.body}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like post"><ThumbUpIcon /></IconButton>
                <IconButton aria-label="comment on post"><CommentIcon /></IconButton>
            </CardActions>
        </Card>
        );
    }
}

export default withStyles(styles)(Post);