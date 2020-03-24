import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MuiButton from '../../util/MuiButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

// Redux imports
import {connect} from 'react-redux';
import {getPost, clearPost} from '../../redux/actions/dataActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// MUI icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CommentIcon from '@material-ui/icons/Comment';

const styles = (theme) => ({
    ...theme.spreadThis,
    spinner: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    dialogContent: {
        paddingTop: 20,
        paddingBottom: 15
    },
    span: {
        paddingBottom: 1
    }
})

export class PostDialog extends Component {
    state = {
        open: false,
        oldPath: ''
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const {username, postId}  = this.props;
        const newPath = `/user/${username}/post/${postId}`;
        window.history.pushState(null, null, newPath);
        if (oldPath === newPath) oldPath = `/user/${username}`;
        this.setState({open: true, oldPath});
        this.props.getPost(this.props.postId);
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
        this.props.clearPost();
        if (this.props.unsetPostId) {
            this.props.unsetPostId();
        }
    }

    render() {
        const {classes, post, UI} = this.props;
        const dialogContent = UI.loading ?
            (
                <div className={classes.spinner}>
                    <CircularProgress size={150} thickness={2}/>
                </div>
            )
            : (
                <Grid container>
                    <Grid item sm={3}>
                        <Avatar alt={post.username} src={post.userImage} className={classes.large}/>
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/user/${post.username}`}
                            >
                                {post.username}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(post.createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {post.body}
                        </Typography>
                        <LikeButton postId={this.props.postId}/>
                        <span className={classes.span}>{post.likes?post.likes:0} likes</span>
                        <MuiButton tip="comment">
                            <CommentIcon/>
                        </MuiButton>
                        <span className={classes.span}>{post.commentCount?post.commentCount:0} comments</span>
                    </Grid>
                    <CommentForm postId={this.props.postId} />
                    <Comments comments={post.comments?post.comments:[]}/>
                </Grid>
            )
        return (
            <Fragment>
                <MuiButton tip="expand post" 
                    onClick={this.handleOpen} 
                    >
                    <UnfoldMoreIcon color="action"/>
                </MuiButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MuiButton 
                        tip="close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MuiButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogContent}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    post: state.data.currentPost,
    UI: state.UI
})

const mapActionsToProps = {
    getPost,
    clearPost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
