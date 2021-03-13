import { Button, makeStyles, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { userDetailsStartUpdating, userStartLoadingDetails } from '../../actions/user';
import Swal from 'sweetalert2';


const useStyles = makeStyles({
    profileScreenContainer: {
        display:"flex", 
        backgroundColor:"", 
        justifyContent:"center"
    }, 
    titleProfileScreen: {
        margin:"2rem 0rem"
    }, 
    dataPostContainer: {
        display:"flex", 
        justifyContent:"space-around", 
        margin:"1rem 0rem", 
        backgroundColor:""
    }, 
    titlesPostData:{
        fontWeight:"lighter", 
        margin:"1rem 0rem"
    }, 
    myDataContainer:{
        display:"flex", 
        flexDirection:"column", 
        backgroundColor:""
    }, 
    myDataTextField:{
        margin:".5rem 0rem"
    }, 
    formData:{
        backgroundColor:"", 
        width:"45%"
    }, 
    tableDataD:{
        width:"45%"
    },
    tableData:{
        fontFamily:"arial", 
        border:"1px solid #333"
    }
}); 

const UpdateUserForm = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const {userDetails} = useSelector(state => state.userDetails);

    useEffect(() => {
        if(Object.keys(userDetails).length === 0){
            dispatch(userStartLoadingDetails());
        }
    }, [dispatch, userDetails]);

    const [state, setstate] = useState(userDetails); 
    
    useEffect(() => {
        setstate(userDetails); 
    }, [userDetails]);

    const handleInputChange = (event) => {
        setstate({
            ...state,
            [event.target.name] : event.target.value
        })
    }

    const handleUpdateUser = (e) => {
        e.preventDefault(); 

        const {name, email, password, password2} = state; 

        if(password !== password2){
            Swal.fire("Error", "Password must be the same", "error"); 
            return;
        }

        if(!name || !email){
            Swal.fire("Error", "Please complete all the fields", "error"); 
            return;
        }

        const user = {
            name, 
            email, 
            password, 
            id: state._id
        }

        dispatch(userDetailsStartUpdating(user));
        //console.log("Actualizando");
    }
    return (
        <div>
            { Object.keys(userDetails).length > 0 ? (
            <form
            className={classes.myDataContainer}
            onSubmit={handleUpdateUser}
        >
                    <TextField
                        className={classes.myDataTextField} 
                        id="name" 
                        label="" 
                        variant="outlined" 
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                    />

                    <TextField
                        id="email" 
                        variant="outlined" 
                        label=""
                        name="email"
                        className={classes.myDataTextField}
                        value={state.email}
                        onChange={handleInputChange}
                    />

                    <TextField
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        name="password"
                        className={classes.myDataTextField}
                        value={state.password}
                        type="password"
                        onChange={handleInputChange}
                    />

                    <TextField
                        id="password2" 
                        label="Confirm Password" 
                        variant="outlined" 
                        name="password2"
                        type="password"
                        className={classes.myDataTextField}
                        value={state.password2}
                        onChange={handleInputChange}
                    />

                    <Button
                        variant="outlined"
                        type="submit"
                    >
                        Save
                    </Button>

                    
                </form>
            ) : "Cargando..."}

        </div>
    )
}

export default UpdateUserForm
