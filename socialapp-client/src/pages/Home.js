import React, { Component } from 'react';
import Post from '../components/Post';
import axios from "axios";
// MUI imports
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    componentDidMount() {
        axios.get("/posts")
        .then(response => {
            this.setState({posts: response.data});
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        let postsMarkup = this.state.posts ? this.state.posts.map(post => <Post post={post} key={post.postId}/>) : <p>Loading....</p>;
        return (
            <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile.....</p>
                </Grid>
            </Grid>
            </Container>
        )
    }
}

export default Home;