import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

//MUI 
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardActions from '@material-ui/core/CardActions';

const styles = (theme) => ({
    card: {
        marginBottom: 15
    },
    cardContent: {
        margin: '5px 14px',
        paddingTop: 0,
        paddingBottom: 0
    },
    cardActions: {
        margin: '5px 7px'
    },
    username: {
        width: 60,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        width: 100,
        height: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    fullLine: {
        height: 25,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        marginBottom: 10
    }
})

const PostSkeleton = (props) => {
    const {classes} = props;
    let content = Array.from({length: 4}).map((item, index) => {
        return (
            <Card className={classes.card} key={index}>
                <CardHeader
                    avatar={
                        <Avatar alt="profile" src={null} />
                    }
                    title={
                        <div className={classes.username}></div>
                    }
                    subheader={
                        <div className={classes.date}></div>
                    }
                />
                <CardContent className={classes.cardContent}>
                    <div className={classes.fullLine}></div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <div className={classes.halfLine}></div>
                </CardActions>
            </Card>
        );
    })
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PostSkeleton);
