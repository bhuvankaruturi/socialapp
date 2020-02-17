import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
        .then(res => {
            let fbScaTok = `Bearer ${res.data.token}`;
            localStorage.setItem("fbScaTok", fbScaTok);
            axios.defaults.headers.common['Authorization'] = fbScaTok;
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
            let fbScaTok = `Bearer ${res.data.token}`;
            localStorage.setItem("fbScaTok", fbScaTok);
            axios.defaults.headers.common['Authorization'] = fbScaTok;
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
    axios.get('/user')
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(error => dispatch({
            type: SET_ERRORS,
            payload: error.response.data
    }));
};

export const signoutUser = () => (dispatch) => {
    localStorage.removeItem('fbScaTok');
    dispatch({type: SET_UNAUTHENTICATED});
}