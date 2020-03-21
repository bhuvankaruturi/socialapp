import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST} from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get("/posts")
        .then(response => {
            dispatch({type: SET_POSTS, payload: response.data});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_POSTS, payload: []});
        });
}

export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
        .then(response => {
            dispatch({type: DELETE_POST, payload: {postId}});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: DELETE_POST, payload: null});
        })
}

export const likePost = (username, postId) => (dispatch) => {
    axios.post(`/post/${postId}/like`)
            .then(response => {
                dispatch({type: LIKE_POST, payload: {username, postId, likes: 1}});
            })
            .catch(error => {
                console.error(error);
                dispatch({type: LIKE_POST, payload: null})
            })
}

export const unlikePost = (username, postId) => (dispatch) => {
    axios.delete(`/post/${postId}/like`)
            .then(response => {
                dispatch({type: UNLIKE_POST, payload: {username, postId, likes: -1}});
            })
            .catch(error => {
                console.error(error);
                dispatch({type: UNLIKE_POST, payload: null})
            })
}