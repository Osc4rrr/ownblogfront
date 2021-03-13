import {types} from "../types/types"; 
import {fetchWithToken } from "../helpers/fetch"
import Swal from "sweetalert2";
import { userStartLoadingPosts } from "./user";


export const postStartLoading = () => {

    return async(dispatch) => {
        try {
            const resp = await fetchWithToken("posts"); 
            const body = await resp.json(); 

            const posts = body; 
            dispatch(postLoaded(posts.posts));
        } catch (error) {
            console.log(error);
        }
    }
}

export const postStartUploading = (post) => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().auth;
        try {
            const resp = await fetchWithToken("posts", post, "POST"); 
            const body = await resp.json(); 

            if(body.success){
                post.id = body.post.id; 
                post.user = {
                    _id: uid, 
                    name: name
                }

                Swal.fire("Success", "Post was saved", "success");
                dispatch(postUploading(post));
                dispatch(userStartLoadingPosts());
            }else{
                return Swal.fire("Error", body.message, "error"); 
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const postUploading = (post) => ({
    type: types.postUploading, 
    payload: post
}); 


const postLoaded = (posts) => ({
    type: types.postsLoaded, 
    payload: posts
}); 


export const userPostEditLoading = (id) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`posts/edit/${id}`); 
            const body = await resp.json(); 

            if(body.success){
                dispatch(postSetActive(body.post));
            }

        } catch (error) {
            console.log(error);
        }
    }
}



export const postSetActive = (post) => ({
    type: types.postSetActive, 
    payload: post
})

export const postClearActive = () => ({
    type: types.postClearActive
})