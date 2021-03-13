import { Button, makeStyles, TextField } from '@material-ui/core'
import React, {useState} from 'react'; 
import { useDispatch } from 'react-redux';
import { postStartUploading } from '../../actions/posts';
import { fetchImageWithoutToken } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
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

const NewPostForm = () => {

    let history = useHistory();

    const dispatch = useDispatch(); 

    const [uploadingImage, setUploadingImage] = useState(false); 
    const [imageUrl, setImageUrl] = useState(""); 
    const classes = useStyles(); 

    const [formNewPostValues, handleNewPostInputChange] = useForm({
        title: "", 
        description: ""
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


        let posted = new Date().toISOString().slice(0, 16).replace('T', ' ');
        let image = imageUrl;
        
        if(!title || !description || !image){
            Swal.fire("Error", "Please Complete all the fields", "error");
            return;
        }

        let post = {
            title, 
            description,
            posted,
            image
        }

        dispatch(postStartUploading(post));
        history.push("/profile");
    }
    return (
        <>
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
                        label="Description" 
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
                    {imageUrl && <a href={imageUrl} target="_blank" rel="noreferrer">{imageUrl}</a>}
                    

                    <Button
                        className={classes.textField} 
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Save Post
                    </Button>


                </form>
            </div>
        </>

    )
}

export default NewPostForm
