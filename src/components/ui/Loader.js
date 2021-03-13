import { makeStyles } from '@material-ui/core';
import React from 'react'; 


const useStyles = makeStyles({
    root: {
        display:"flex",
        justifyContent:"center", 
        alignItems: "center", 
        height:"100vh" 
    }
}); 

const Loader = () => {

    const classes = useStyles(); 

    return (
        <div className={classes.root}>
            <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_iy2i0ky0.json" mode="bounce" background="transparent"  speed="3"   style={{width: "300px", height: "300px"}}  loop  autoplay></lottie-player>
        </div>
    )
}

export default Loader
