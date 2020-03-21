import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST} from '../types';

const initialState = {
    posts: [],
    loading: false
}

export default function (state=initialState, action) {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
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