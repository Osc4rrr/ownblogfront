import React from 'react'; 
import {Grid} from "@material-ui/core";
import RegisterForm from './RegisterForm';

const RegisterScreen = () => {
    return (
        <Grid container>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} >
                <RegisterForm/>
            </Grid>
            <Grid item sm={4}></Grid>

        </Grid>
    )
}

export default RegisterScreen
