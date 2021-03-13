import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'; 
import EditPostForm from './EditPostForm';

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

const PostEdit = ({match}) => {
    const classes = useStyle(); 

    return (
        <div className={classes.newPostContainer}>
            <Typography variant="h5" className={classes.titleContainer}>
                Edit Post
            </Typography>

            <EditPostForm id={match.params.id}/>

        </div>
    )
}

export default PostEdit

 