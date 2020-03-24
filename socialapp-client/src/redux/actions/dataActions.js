import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, 
    CREATE_POST, CREATE_COMMENT, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, 
    SET_POST, STOP_LOADING, UNSET_POST, SET_PROFILE, UNSET_PROFILE} from '../types';
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

export const getPost = (postId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/post/${postId}`)
        .then(response => {
            dispatch({type: SET_POST, payload: response.data});
            dispatch({type: STOP_LOADING});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_ERRORS, payload: error.response.data});
        })
}

export const clearPost = () => (dispatch) => {
    dispatch({type: UNSET_POST});
    dispatch({type: CLEAR_ERRORS});
}

export const createPost = (postData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/post', postData)
        .then(response => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: CREATE_POST, payload: response.data});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_ERRORS, payload: error.response.data});
        })
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

export const createComment = (postId, commentData) => (dispatch) => {
    axios.post(`/post/${postId}/comment`, commentData)
        .then(response => {
            dispatch({type: CLEAR_ERRORS});
            dispatch({type: CREATE_COMMENT, payload: {postId, data: response.data}});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_ERRORS, payload: error.response.data});
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

export const getUserData = (username) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${username}`)
        .then(response => {
            dispatch({type: SET_PROFILE, payload: response.data});
            dispatch({type: SET_POSTS, payload: response.data.posts});
        })
        .catch(error => {
            console.error(error);
            dispatch({type: SET_POSTS, payload: []});
            dispatch({type: UNSET_PROFILE, payload: {}})
        })
}

export const clearUserData = (username) => (dispatch) => {
    dispatch({type: UNSET_PROFILE});
}