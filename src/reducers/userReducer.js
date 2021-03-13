import { types } from "../types/types";

const initialState = {
    userDetails: {}, 
    userPosts: []
}

export const userReducer = (state=initialState, action ) => {
    switch (action.type) {
        case types.userLoadingDetails:
            return{
                ...state, 
                userDetails: action.payload
            }
        case types.userLoadingPosts: 
            return {
                ...state, 
                userPosts: action.payload
            }
        case types.postUpdating: 
            return {
                ...state, 
                userPosts: state.userPosts.map(
                    p => (p.id === action.payload.id) ? action.payload : p
                )
            }
        case types.postDeleting: 
            return {
                ...state, 
                userPosts: state.userPosts.filter(
                    p => (p.id !== action.payload)
                )
            }
        case types.userClearDetails:
            return {
                ...state, 
                ...initialState
            }
    
        default:
            return state; 
    }
}