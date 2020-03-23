import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MuiButton from '../../util/MuiButton';

// Redux imports
import {connect} from 'react-redux';
import {createPost} from '../../redux/actions/dataActions';
import {clearErrors} from '../../redux/actions/uiActions';

// MUI imports
import AddIcon from '@material-ui/icons/Add';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, DialogContent, TextField } from '@material-ui/core';

const styles = theme => ({
    ...theme.spreadThis.formStyles,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: "absolute"
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
        paddingBottom: 0
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
})

export class NewPost extends Component {
    state = {
        open: false,
        body: "",
        submitted: false
    };

    componentDidUpdate(prevProps) {
        if (this.props.loading === prevProps.loading && this.props.errors === prevProps.errors)
            return;
        if (!this.props.loading && this.props.errors == null) {
            this.handleClose();
        }
    }

    handleOpen = () => {
        if (this.props.errors !== null) this.props.clearErrors();
        this.setState({open: true, body: "", submitted: false});
    }

    handleClose = () => {
        if (this.props.errors !== null) this.props.clearErrors();
        this.setState({open: false, body: "", submitted: false});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createPost({body: this.state.body});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {classes, loading, errors} = this.props;
        return (
            <Fragment>
                <MuiButton tip="create a post" onClick={this.handleOpen}>
                    <AddIcon color="action"/>
                </MuiButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                    <DialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">Create a new post on SocialApp</Typography>
                        <MuiButton tip="close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                            <CloseIcon />
                        </MuiButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="New Post"
                                multiline
                                rows="3"
                                placeholder="Write something here..."
                                error={errors.body ? true : false}
                                helperText={errors.body?errors.body:""}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary"
                                className={classes.submitButton} disabled={loading}>
                                    Submit
                                    {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

NewPost.propTypes = {
    createPost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    errors: state.UI.errors
});


export default connect(mapStateToProps, {createPost, clearErrors})(withStyles(styles)(NewPost));
