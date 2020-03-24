import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';

// Redux imports
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';

// MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import PostSkeleton from '../util/PostSkeleton';

const styles = (theme) => ({

});

export class User extends Component {
    state = {
        postId: null,
    }
    componentDidMount() {
        const username = this.props.match.params.username;
        const postId = this.props.match.params.postId;
        if (postId) this.setState({postId});
        this.props.getUserData(username);
    }
    unsetPostId = () => {
        this.setState({postId: null});
    }
    render() {
        const {posts, profile, loading} = this.props;
        const username = this.props.match.params.username;
        const postsMarkup = loading ? (
            <PostSkeleton />
        ) : posts.length === 0 ? (
            <p>No posts from this user</p>
        ) : this.state.postId ? (
            posts.map(post => {
                if (post.postId !== this.state.postId) 
                    return <Post post={post} key={post.postId} />
                else
                    return <Post post={post} key={post.postId} openDialog={true} unsetPostId={this.unsetPostId}/>
            })
        ) : (
            posts.map(post => <Post post={post} key={post.postId} openDialog={false}/>)
        );
        return (
            <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item sm={4} xs={12}>
                    <StaticProfile profile={profile} username={username}/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
            </Grid>
            </Container>
        )
    }
}

User.propTypes = {
    profile: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    getUserData: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    posts: state.data.posts,
    profile: state.data.profile,
    loading: state.data.loading
})

const mapActionsToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(User));
