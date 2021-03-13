import React from 'react'; 
import {Grid} from "@material-ui/core";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
    return (
            <Grid container>
                <Grid item sm={4}></Grid>
                <Grid item sm={4}>
                    <LoginForm/>
                </Grid>
                <Grid item sm={4}></Grid>
            </Grid>
    )
}

export default LoginScreen
