import { Button,makeStyles, TextField } from '@material-ui/core'
import React, {useState} from 'react'; 
import { useDispatch } from 'react-redux';
import {postStartUpdating} from "../../actions/user"; 
import { fetchImageWithoutToken } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from '../ui/Loader';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    formContainer: {
        background:"", 
        width:"50%", 
        padding:"10px",
        display:"flex", 
        [theme.breakpoints.down("xs")]: {
            width:"100%"
        },
    }, 
    form:{
        display:"flex", 
        justifyContent:"center",
        width:"100%",
        flexDirection:"column", 
        backgroundColor:"#ccc", 
        padding:"0rem"
    }, 
    textField: {
        backgroundColor:"",
        width:"100%", 
        margin:"1rem 0rem"
    }
}));

const EditPostForm = () => {
    
    const dispatch = useDispatch(); 
    const classes = useStyles();

    let history = useHistory();

    
    const [uploadingImage, setUploadingImage] = useState(false); 
    const [imageUrl, setImageUrl] = useState(""); 


    const {activePost} = useSelector(state => state.post); 

    if(activePost === null){
        history.push("/profile");
    }

    const [formNewPostValues, handleNewPostInputChange] = useForm({
        title: activePost ? activePost.title : "",
        description: activePost ? activePost.description : ""
    }); 

    const {title, description} = formNewPostValues; 

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]; 
        setUploadingImage(true); 

        try {
            const resp = await fetchImageWithoutToken("uploadImage",file,"POST"); 
            const body = await resp.json(); 

            if(body.success){
                setUploadingImage(false); 
                setImageUrl(`${process.env.REACT_APP_API_IMAGE_URL}${body.imagePath}`);
                
                
                //console.log(); 
            }
        } catch (error) {
            console.log("imagen no fue subida");
            console.log(error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault(); 

        const post = {
            id: activePost.id,
            title, 
            description,
            image: imageUrl ? imageUrl : activePost.image
        }

        if(!post.title || !post.description || !post.image){
            Swal.fire("Error", "Please Complete all the fields", "error");
            return;
        }

        dispatch(postStartUpdating(post)); 
        history.push("/profile");
    }
    return (
        <>
        {true ? (
            <div
                className={classes.formContainer}
            >
                
                    <form 
                        className={classes.form}
                        onSubmit={handleSubmit}
                    >
                    <TextField
                        className={classes.textField} 
                        id="title" 
                        label="Title" 
                        variant="outlined" 
                        name="title"
                        value={title}
                        onChange={handleNewPostInputChange}
                    />

                    <TextField
                        className={classes.textField} 
                        id="description" 
                        label="" 
                        variant="outlined" 
                        name="description"
                        multiline
                        rows={10}
                        value={description}
                        onChange={handleNewPostInputChange}
                    />

                    <Button
                        className={classes.textField} 
                        variant="outlined"
                        component="label"
                    >
                        Upload Image
                        <input
                            onChange={handleUploadImage}
                            type="file"
                            hidden
                        />
                        
                    </Button>
                    {uploadingImage && "Cargando imagen..."}
                    {/* {imageUrl ? "Hay foto" : "No hay foto"} */}
                    {imageUrl && `New Image: ${imageUrl}` }
                    { activePost ? <a href={activePost.image} target="_blank" rel="noreferrer">{activePost.image}</a> : ""} 
                    {/* {postSelected && <a href={postSelected.image} target="_blank">{postSelected.image}</a>} */}
                    

                    <Button
                        className={classes.textField} 
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Edit Post
                    </Button>


                </form>
                
                
            </div>
            ) : <Loader/>}
        </>

    )
}

export default EditPostForm
