import {types} from "../types/types"; 


const initialState = {
    posts: [], 
    activePost: null
}

export const postReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.postsLoaded: 
            return {
                ...state, 
                posts: [...action.payload]
            }
        case types.postSetActive: 
            return{
                ...state, 
                activePost: action.payload
            }
        case types.postClearActive:
            return {
                ...state, 
                activePost: {}
            }
        case types.postUploading: 
            return {
                ...state, 
                posts: [
                    ...state.posts, 
                    action.payload
                ]
            }
        default:
            return state;
    }
}