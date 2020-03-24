import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

// Redux imports
import {connect} from 'react-redux';
import {likePost, unlikePost} from '../../redux/actions/dataActions';

// MUI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CommentIcon from '@material-ui/icons/Comment';
import MuiButton from '../../util/MuiButton';
import withStyles from '@material-ui/core/styles/withStyles'; 

const styles = (theme) => ({
    card: {
        marginBottom: 15,
    },
    content: {
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    span: {
        paddingBottom: 1
    }
});

class Post extends Component {
    deletePost = () => {
        this.props.deletePost(this.props.post.postId);
    }
    render() {
        dayjs.extend(relativeTime);
        let {classes, post, user, openDialog} = this.props;
        const deleteButton = user.authenticated && post.username === user.username 
                            ? (<DeletePost postId={post.postId}/>)
                            : null;
        return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar alt="Profile image" src={post.userImage} />
                }
                title={<Typography variant="h6" color="primary" component={Link} to={`/user/${post.username}`}>
                    {post.username}
                </Typography>}
                action={
                    deleteButton
                }
                subheader={dayjs(post.createdAt).fromNow() }
            />
            <CardContent classes={{root: classes.content}}>
                <Typography variant="body1" color="textPrimary" component="p">{post.body}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <LikeButton postId={post.postId} />
                <span className={classes.span}>{post.likes?post.likes:0} likes</span>
                <MuiButton tip="comment">
                    <CommentIcon/>
                </MuiButton>
                <span className={classes.span}>{post.commentCount?post.commentCount:0} comments</span>
                <PostDialog postId={post.postId} username={post.username} openDialog={openDialog} unsetPostId={this.props.unsetPostId}/>
            </CardActions>
        </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,
    unsetPostId: PropTypes.func
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));