import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';

// Redux imports
import {connect} from 'react-redux';
import {likePost, unlikePost} from '../redux/actions/dataActions';

//sMUI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import MuiButton from '../util/MuiButton';
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
    likePostState = () => {
        if (this.props.user.likes.findIndex(like => like.postId === this.props.post.postId)>=0) 
            return true;
        return false;
    }
    likePost = () => {
        this.props.likePost(this.props.user.username, this.props.post.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.user.username, this.props.post.postId);
    }
    deletePost = () => {
        this.props.deletePost(this.props.post.postId);
    }
    render() {
        dayjs.extend(relativeTime);
        let {classes, post, user} = this.props;
        let likeButton;
        if (this.props.user.authenticated) {
            if (this.likePostState()) {
                likeButton = (
                    <MuiButton tip="unlike" onClick={this.unlikePost}>
                        <ThumbUpIcon color="primary"/>
                    </MuiButton>
                );
            } else {
                likeButton = (
                    <MuiButton tip="like" onClick={this.likePost}>
                        <ThumbUpOutlinedIcon/>
                    </MuiButton>
                );
            }
        } else {
            likeButton = (
                <Link to="/login">
                    <MuiButton tip="like">
                        <ThumbUpOutlinedIcon/>
                    </MuiButton>
                </Link>
            );
        }
        const deleteButton = user.authenticated && post.username === user.username 
                            ? (<DeletePost postId={post.postId}/>)
                            : null;
        return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar alt="Profile image" src={post.userImage} className={classes.avatar} />
                }
                title={<Typography variant="h6" color="primary" component={Link} to={`/users/${post.username}`}>
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
                {likeButton}
                <span>{post.likes?post.likes:0} likes</span>
                <MuiButton tip="comment">
                    <CommentIcon/>
                </MuiButton>
                <span>{post.commentCount?post.commentCount:0} comments</span>
            </CardActions>
            <PostDialog postId={post.postId} username={post.username}/>
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
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));