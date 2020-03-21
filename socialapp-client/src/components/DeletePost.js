import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MuiButton from '../util/MuiButton';

// Redux imports
import {connect} from 'react-redux';
import {deletePost} from '../redux/actions/dataActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {

};

export class DeletePost extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({open: false});
    }

    render() {
        // const {classes} = this.props;
        return (
            <Fragment>
                <MuiButton tip="delete post"
                    onClick={this.handleOpen}
                    // btnClassName={classes.deleteButton}
                    >
                    <DeleteOutline color="secondary"/>
                </MuiButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>
                        Are you sure that you want to delete the post?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deletePost} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapActionsToProps = {
    deletePost
}

DeletePost.propTypes = {
    classes: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}


export default connect(null, mapActionsToProps)(withStyles(styles)(DeletePost));
