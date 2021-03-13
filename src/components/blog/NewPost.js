import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'; 
import NewPostForm from './NewPostForm';

const useStyle = makeStyles({
    newPostContainer: {
        display:"flex", 
        backgroundColor:"", 
        height:"100%", 
        justifyContent:"center",
        alignItems:"center", 
        flexDirection:"column",
        margin:"2rem 0rem"
    }, 
    titleContainer: {
        margin:"25px 0px", 
        textTransform:"uppercase", 
        fontWeight:"lighter"
    }
}); 

const NewPost = () => {

    const classes = useStyle(); 

    return (
        <div className={classes.newPostContainer}>
            <Typography variant="h5" className={classes.titleContainer}>
                New Post
            </Typography>

            <NewPostForm/>

        </div>
    )
}

export default NewPost
