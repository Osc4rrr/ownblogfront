import { Button, CardMedia, makeStyles, TableCell, TableRow } from '@material-ui/core'
import React from 'react'; 
import moment from "moment"; 
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { postSetActive } from '../../actions/posts';
import { postStartDeleting } from '../../actions/user';


const useStyles = makeStyles({
    tableImage: {
        width:"50px"
    }
}); 

const PostUserItems = ({post, history}) => {
    const classes = useStyles(); 
    const dispatch = useDispatch();

    const handleEditPost = (id) => {
        dispatch(postSetActive(post)); 
        history.push(`/post/edit/${id}`);
    }

    const handleDeletePost = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(postStartDeleting(id));
            }
          })
    }


    return (

        <>
        <TableRow>
            <TableCell> {post.title}</TableCell>
            <TableCell> {(moment(post.posted).fromNow())} </TableCell>
            <TableCell> 
            <CardMedia
                    component="img"
                    alt="Post detail"
                    width="25"
                    height="25"
                    image={`${post.image}`}
                    title="Post detail"
                    className={classes.tableImage}
                />
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => handleEditPost(post.id)}
                >Edit</Button>
                <Button
                    onClick={() => handleDeletePost(post.id)}
                >Delete</Button>
            </TableCell>
        </TableRow>
        </>
    )
}

export default PostUserItems
