import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = (theme) => ({
    visibleSeparator: theme.spreadThis.visibleSeparator,
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    grid: {
        width: '100%'
    },
    gridItem: {
        paddingBottom: 0
    }
});

export class Comments extends Component {
    render() {
        const {comments, classes} = this.props;
        return (
            <div className={classes.root}>
            <GridList cellHeight="auto" cols={1} className={classes.grid}>
                {comments.map(comment => (
                    <GridListTile
                        key={comment.commentId}
                        cols={1}
                        rows={1}
                        className={classes.gridItem}
                    >
                        <hr className={classes.visibleSeparator}/>
                        <Comment comment={comment}/>
                    </GridListTile>
                ))}
            </GridList>
            </div>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Comments);
