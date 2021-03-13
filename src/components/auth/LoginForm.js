import React from 'react'; 
import TextField from '@material-ui/core/TextField';
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LoginAnimation from "../animations/LoginAnimation";
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

const LoginForm = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: "", 
        lPassword: ""
    }); 

    const {lEmail, lPassword} = formLoginValues; 

    const handleLogin = (e) =>{
        e.preventDefault(); 
        dispatch(startLogin(lEmail, lPassword)); 
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(0),
            width: '25ch',
          },
        },
        button: {
            width:"100%",
            height:"45px",
            margin:"20px 0px"
        },
        textField:{
            width:"100%",
            marginTop:"20px",
            height:"45px", 
            margin:"5px 0px"
        }
        
    }));

    const classes = useStyles();
    return (
        <div className="form-log">
            <LoginAnimation/>
            <form 
                className={classes.root} 
                noValidate 
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <TextField 
                    className={classes.textField} 
                    id="lEmail" 
                    label="Email" 
                    variant="outlined" 
                    name="lEmail"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                />
                
                <TextField 
                    className={classes.textField} 
                    id="Password" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    name="lPassword"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                />
                
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={ classes.button} 
                    type="submit"
                >
                    Login
                </Button> 
            </form>

            <Typography 
                variant="overline" 
                display="block" 
                gutterBottom
            >
                You dont have an account? 
                <Link 
                    to="/register"
                >
                    Register Here
                </Link>
            </Typography>
        </div>
    )
}

export default LoginForm
