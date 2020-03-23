import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MuiButton from '../../util/MuiButton';

// Redux imports
import {connect} from 'react-redux';
import {likePost, unlikePost} from '../../redux/actions/dataActions';

// MUI imports
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { withStyles } from '@material-ui/core';

const styles = {

}

export class LikeButton extends Component {
    likePostState = () => {
        if (this.props.likes.findIndex(like => like.postId === this.props.postId) >= 0)
            return true;
        return false;
    }
    likePost = () => {
        this.props.likePost(this.props.username, this.props.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.username, this.props.postId);
    }
    render() {
        let likeButton;
        if (this.props.authenticated) {
            if (this.likePostState()) {
                likeButton =  (
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
        return (
            <Fragment>
                {likeButton}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username?state.user.username:"",
    authenticated: state.user.authenticated,
    likes: state.user.likes,
});

const mapActionsToProps =  {
    likePost,
    unlikePost
};

LikeButton.propTypes = {
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));
