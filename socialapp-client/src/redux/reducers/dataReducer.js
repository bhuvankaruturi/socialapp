import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST, SET_POST, UNSET_POST} from '../types';

const initialState = {
    posts: [],
    loading: false,
    currentPost: null
}

export default function (state=initialState, action) {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_POST:
            return {
                ...state,
                currentPost: action.payload
            }
        case UNSET_POST:
            return {
                ...state,
                currentPost: null
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case CREATE_POST:
            if (action.payload !== null) {
                return {
                    ...state,
                    posts: [
                        {...action.payload.data},
                        ...state.posts
                    ],
                    loading: false
                }
            } else {
                return state;
            }
        case DELETE_POST:
            if (action.payload !== null) {
                return {
                    ...state,
                    posts: state.posts.filter(post => post.postId !== action.payload.postId)
                }
            } else {
                return state;
            }
        case LIKE_POST:
        case UNLIKE_POST:
            if (action.payload !== null) {
                return {
                    ...state,
                    posts: state.posts.map(post => {
                        if (post.postId !== action.payload.postId) return post
                        else {
                            let likes = post.likes?post.likes:0;
                            likes += action.payload.likes;
                            return {...post, likes}
                        };
                    })
                }
            } else {
                return state;
            }
        default: 
            return state;
    }
}