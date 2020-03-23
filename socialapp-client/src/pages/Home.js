import React, { Component } from 'react';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';

// Redux imports
import {connect} from 'react-redux';
import {getPosts} from '../redux/actions/dataActions';

// MUI imports
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

export class Home extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        let {loading, posts} = this.props.data;
        let postsMarkup = loading ? <p>Loading....</p> : posts.map(post => <Post post={post} key={post.postId}/>);
        return (
            <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
            </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPosts
}

Home.propTypes = {
    data: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
