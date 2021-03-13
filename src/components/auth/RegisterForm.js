import React from 'react'; 
import TextField from '@material-ui/core/TextField';
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RegisterAnimation from "../animations/RegisterAnimation";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';

const RegisterForm = () => {

    const dispatch = useDispatch();

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: "",
        rEmail: "", 
        rPassword1: "",
        rPassword2: ""
    });  

    const {rName, rEmail, rPassword1, rPassword2} = formRegisterValues; 

    const handleRegisterSubmit = (e) => {
        e.preventDefault(); 

        const user = {
            name: rName, 
            email: rEmail, 
            password: rPassword1
        }

        if(rPassword1 !== rPassword2){
            return Swal.fire("Error", "Passwords must be the same", "error");
        }

        dispatch(startRegister(user)); 
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
        <div className="form-reg">
            <RegisterAnimation/>
            <form 
                className={classes.root} 
                noValidate 
                autoComplete="off"
                onSubmit={handleRegisterSubmit}
            >
                <TextField 
                    className={classes.textField} 
                    id="outlined-basic" 
                    label="Name" 
                    name="rName"
                    value={rName}
                    onChange={handleRegisterInputChange}
                    variant="outlined" 
                />
                <TextField 
                    className={classes.textField} 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    name="rEmail"
                    value={rEmail}
                    onChange={handleRegisterInputChange}
                />
                <TextField 
                    className={classes.textField} 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    name="rPassword1"
                    value={rPassword1}
                    onChange={handleRegisterInputChange}
                />
                <TextField 
                    className={classes.textField} 
                    id="outlined-basic" 
                    label="Confirm Password" 
                    variant="outlined" 
                    type="password"
                    name="rPassword2"
                    value={rPassword2}
                    onChange={handleRegisterInputChange}
                />
                
                <Button 
                    variant="contained"
                    color="secondary" 
                    className={ classes.button}
                    type="submit"
                >
                    Register
                </Button> 
            </form>

            <Typography variant="overline" display="block" gutterBottom>
                Already Registered? <Link to="/login">Login Here</Link>
            </Typography>
        </div>
    )
}

export default RegisterForm

