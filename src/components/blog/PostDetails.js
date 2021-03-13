import React from 'react'; 
import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from "moment";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
    }, 
    container: {
        display:"flex", 
        justifyContent:"center", 
        alignItems:"", 
        height:"100%", 
        marginTop:"2rem" 
    }, 
    mediaImg: {
        border:"0 solid #333"
    }, 
    goBackLink:{
        position:"absolute", 
        textTransform:"uppercase", 
        textDecoration:"none", 
        color:"#333", 
        left:"10px",
        margin: "-25px 0px"
    }
}); 

const PostDetails = ({history}) => {
    const classes = useStyles(); 

    const {activePost:postSelected} = useSelector(state => state.post); 

    if(postSelected === null){
        history.push("/");
    }
    
    return (
        <div className={classes.container}>
            <Link 
                to="/"
                className={classes.goBackLink}
            >
                <ArrowBackIcon/>
            </Link>
            <Card className={classes.root}>
                <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="300"
                        image={`${postSelected.image}`}
                        title="Contemplative Reptile"
                        className={classes.mediaImg}
                />
                
                <CardContent>
                    <Typography 
                        variant="h4"
                    >
                        {postSelected.title}
                    </Typography>

                    <Typography 
                        variant="body2" 
                        component="p"
                    >
                        {postSelected.description}
                    </Typography>

                    <Typography 
                        variant="overline" 
                        component="p"
                    >
                        Posted {(moment(postSelected.posted).fromNow())}  by {postSelected.user.name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostDetails