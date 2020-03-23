import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, DELETE_POST} from '../types';

const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    username: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            if (action.payload !== null)
                return {
                    ...state,
                    likes: [
                        ...state.likes,
                        {
                            username: action.payload.username,
                            postId: action.payload.postId
                        }
                    ]
                }
            else return state;
        case DELETE_POST:
        case UNLIKE_POST:
            if (action.payload !== null)
                return {
                    ...state,
                    likes: state.likes.filter(post => post.postId !== action.payload.postId)
                }
            else return state;
        default:
            return state;
    }
}