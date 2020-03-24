import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
        .then(res => {
            setLocalStorageToken(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        }
    );
}

export const signupUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/signup', userData)
        .then(res => {
            setLocalStorageToken(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        }
    );
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
};

export const signoutUser = () => (dispatch) => {
    localStorage.removeItem('fbScaTok');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getUserData());
        })
        .catch(err => console.error(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user', userDetails)
    .then(res => {
        dispatch(getUserData());
    })
    .catch(err => console.error(err)); 
}

export const markNotificationsRead = (notifications) => (dispatch) => {
    axios.post('/notifications', {notifications})
        .then(res => {
            dispatch({type: MARK_NOTIFICATIONS_READ});
        })
        .catch(err => console.error(err));
}

export const setLocalStorageToken = (token) => {
    let fbScaTok = `Bearer ${token}`;
    localStorage.setItem("fbScaTok", token);
    axios.defaults.headers.common['Authorization'] = fbScaTok;
}