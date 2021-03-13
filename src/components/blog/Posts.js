import { makeStyles } from '@material-ui/core';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postStartLoading } from '../../actions/posts';
import Loader from '../ui/Loader';
import PostItem from './PostItem'; 

const useStyles = makeStyles({
    root: {
        backgroundColor:"tranparent",
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        height:"100vh", 
        flexWrap:"wrap",
        margin:"3.3rem"
    },

});

const Posts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postStartLoading()); 
    }, [dispatch])

    const classes = useStyles();
    const {posts} = useSelector(state => state.post); 

    if(posts.length === 0){
        return <Loader/>
    }

    return (
        <>  
            
            <div className={classes.root}>
                {posts.map( post => {
                    return <PostItem key={post.id} post={post}/>
                })}
            </div>
        </>
    )
}

export default Posts
