import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    auth: authReducer, 
    post: postReducer, 
    userDetails: userReducer
}); 