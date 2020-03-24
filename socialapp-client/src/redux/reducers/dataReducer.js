import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, 
        CREATE_POST, CREATE_COMMENT, SET_POST, UNSET_POST, SET_PROFILE, UNSET_PROFILE} from '../types';

const initialState = {
    posts: [],
    loading: false,
    currentPost: {},
    profile: {}
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
                currentPost: {}
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
                        action.payload,
                        ...state.posts
                    ],
                    loading: false
                }
            } else {
                return state;
            }
        case CREATE_COMMENT:
            if (action.payload.postId === state.currentPost.postId) {
                return {
                    ...state,
                    currentPost: {
                        ...state.currentPost,
                        comments: [
                            {...action.payload.data},
                            ...state.currentPost.comments
                        ]
                    }
                }
            } else { 
                return state;
            }
        case SET_PROFILE: 
            return {
                ...state,
                profile: (({posts, ...x})=>x)(action.payload)
            }
        case UNSET_PROFILE:
            return {
                ...state,
                profile: {}
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
                    }),
                    currentPost: state.currentPost.postId === action.payload.postId ? {
                        ...state.currentPost,
                        likes: state.currentPost.likes + action.payload.likes
                    }: state.currentPost
                }
            } else {
                return state;
            }
        default: 
            return state;
    }
}