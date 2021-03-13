import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import { Button } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        boxShadow: "none",
        backgroundColor: "#333" 
      
    }, 
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titleAuth: {
        margin: "0px 10px"
    }, 
    linkTitle:{
      color:"white", 
      textDecoration:"none"
    } 
  }));

const Navbar = () => {

    let history = useHistory();

    const {uid} = useSelector(state => state.auth); 

    const dispatch = useDispatch(); 
    const {name} = useSelector(state => state.auth); 

    const classes = useStyles();


    const handleNewPost = () =>{
      history.push("/posts/new");
    }

    const handleProfile = () => {
      history.push("/profile");
    }

    const handleLogout = () => {
      dispatch(startLogout());
    }
    return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>

          <Typography 
              className={classes.title} 
              variant="overline" 
              display="block" 
              >
                <Link to="/" className={classes.linkTitle}>
                  Post OwnBlog
                </Link>
          </Typography>

          {uid ? (
            <>
              <Button 
              display="block" 
              color="inherit"
              onClick={handleProfile}
              >Profile</Button>

              <Button 
              display="block" 
              color="inherit"
              onClick={handleNewPost}
              >New Post</Button>

              <Button 
              display="block" 
              color="inherit"
              onClick={handleLogout}
              >Logout</Button>

              <Typography className={classes.titleAuth} variant="overline" display="block" gutterBottom >
              | Hola {name} 
              </Typography>
            </>
          ): null}

         

          

          
        </Toolbar>
      </AppBar>
    </>
    )
}

export default Navbar
