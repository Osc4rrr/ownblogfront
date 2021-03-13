import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { login } from "./auth";


export const userStartLoadingDetails = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken("auth/userDetails"); 
            const body = await resp.json(); 

            if(body.success){
                dispatch(userLoadingDetails(body.user));
            }
        } catch (error) {
            console.log(error); 
        }
        
    }
}

const userLoadingDetails = (posts) => ({
    type: types.userLoadingDetails, 
    payload: posts
}); 

export const userStartLoadingPosts = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken("auth/userPosts"); 
            const body = await resp.json();  

            dispatch(userLoadingPosts(body.posts)); 
        } catch (error) {
            console.log(error);
        }
    }
}

export const postStartUpdating = (post) => {
    return async(dispatch) => {
        try {

            const resp = await fetchWithToken(`posts/${ post.id }`, post, 'PUT' );
            const body = await resp.json();

            // console.log(body.post);

            if(body.success){
                Swal.fire("Success","Post was updated", "success"); 
            }
            dispatch(postUpdating(body.post));
            // dispatch(userStartLoadingPosts());
        } catch (error) {
            Swal.fire("Error", "Hubo un error" + error, "error");
            console.log(error);
        }
    }
}

export const postStartDeleting = (id) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`posts/${ id }`,{}, 'DELETE' );
            const body = await resp.json();

            if(body.success){
                Swal.fire("Success", "Post was deleted", "success");
            }
            dispatch(postDeleting(id));
        } catch (error) {
            Swal.fire("Error", "It was an error", "error");
            console.log(error); 
        }
    }
}

const postDeleting = (id) => ({
    type: types.postDeleting, 
    payload: id
})

export const postUpdating = (post) => ({
    type: types.postUpdating, 
    payload: post
})

const userLoadingPosts = (posts) => ({
    type: types.userLoadingPosts, 
    payload: posts
})

export const userDetailsStartUpdating = (user) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`auth/${ user.id }`,user, 'PUT' );
            const body = await resp.json();

            if(body.success){
                console.log(body);
                Swal.fire("Success", "User was updated", "success");
                dispatch(userLoadingDetails({
                    _id: body.uid, 
                    name: body.name, 
                    email: body.email
                }));

                localStorage.setItem("token", body.token); 
                

                dispatch(login({
                    uid: body.uid, 
                    name: body.name
                })); 

                // dispatch(startChecking());
            }else{
                
                Swal.fire("Error", body.message, "error"); 
            }
        } catch (error) {
            Swal.fire("Error", error, "error");
            console.log(error); 
        }
    }
}

export const userClearDetails = () => ({
    type: types.userClearDetails 
})