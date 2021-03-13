import { Button, Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import moment from "moment"; 
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postSetActive } from '../../actions/posts';

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
      margin:"10px",
      height:"100%"
    },
    posted: {
        margin: "10px 0px"
    },
    btnMore: {
        display:"flex",
        justifyContent:"flex-end"
    }, 
    btnStyle: {
        backgroundColor:"#ccc", 
        padding: "10px", 
        borderRadius:"10%",
        color:"#333", 
        textDecoration:"none",
        fontFamily:"roboto", 
        fontSize:"12px",
        textTransform:"capitalize"
    }

});
const PostItem = (props) => {

    const dispatch = useDispatch(); 

    let history = useHistory();
    const {post} = props;

    const classes = useStyles();

    const handlePostDetails = () => {
        dispatch(postSetActive(post)); 
        history.push(`/post/${post.id}`); 
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="150"
                    image={`${post.image}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.description}
                    </Typography>

                    <Typography className={classes.posted} variant="caption" display="block" gutterBottom>
                        Posted on {moment(post.posted).format('DD/MM/YYYY HH:mm')} by {post.user.name}
                    </Typography>

                    <div className={classes.btnMore}>
                         <Button 
                            className={classes.btnStyle}
                            onClick={handlePostDetails}
                        >
                            Ver mas
                        </Button> 

                        
                    </div>
                    
                </CardContent>
            </Card>
        </div>
    )
}

export default PostItem
