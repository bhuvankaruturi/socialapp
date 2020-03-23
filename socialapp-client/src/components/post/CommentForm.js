import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux imports
import {connect} from 'react-redux';
import {createComment} from '../../redux/actions/dataActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.spreadThis.formStyles,
    visibleSeparator: theme.spreadThis.visibleSeparator,
    gridItem: {
        textAlign: 'center'
    }
})

export class CommentForm extends Component {
    state = {
        body: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.authenticated) {
            let commentData = {
                body: this.state.body
            };
            this.props.createComment(this.props.postId, commentData);
            this.setState({body: ''});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        const {classes, authenticated, UI} = this.props;
        const commentForm = authenticated ? (
            <Grid item sm={12} className={classes.gridItem}>
                <hr className={classes.visibleSeparator}/>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name="body"
                        type="text"
                        label="Comment on the post"
                        value={this.state.body}
                        error={UI.errors.comment ? true : false }
                        helperText={UI.errors?UI.errors.comment:""}
                        className={classes.textField}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
            </Grid>
        ) : null;
        return (
            <Fragment>
                {commentForm}
            </Fragment>
        )
    }
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    createComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {createComment})(withStyles(styles)(CommentForm));
