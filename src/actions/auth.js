import {types} from "../types/types"; 
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import Swal from "sweetalert2";
import { userClearDetails } from "./user";

export const startLogin = (email, password) => {

    return async(dispatch) => {
        const resp = await fetchWithoutToken("auth/login", {email, password}, "POST");
        const body = await resp.json(); 

        if(body.success){
            localStorage.setItem("token", body.token); 
            //localStorage.setItem("token-init-date", new Date.getTime());

            dispatch(login({
                uid: body.uid, 
                name: body.name
            })); 
        }else{
            Swal.fire("Error", body.message, "error")
        }
    }
}

export const startRegister = (user) => {

    return async (dispatch) => {

        const resp = await fetchWithoutToken("auth/register", user, "POST");
        const body = await resp.json(); 

        if(body.success){
            localStorage.setItem("token", body.token); 

            dispatch(login({
                uid: body.uid, 
                name: body.name
            })); 
        }else{
            Swal.fire("Error", body.message, "error")
        }

        
    }
}

export const startChecking = () => {

    return async (dispatch)=> {
        const resp = await fetchWithToken("auth/renew");
        const body = await resp.json(); 

        if(body.success){
            localStorage.setItem("token", body.token); 

            dispatch(login({
                uid: body.uid, 
                name: body.name
            })); 
        }else{
            Swal.fire("Error", body.message, "error")
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(userClearDetails());
        dispatch(logout()); 
    }
}

const logout = () => ({
    type: types.authLogout
})