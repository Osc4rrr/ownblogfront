import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { userStartLoadingPosts } from '../../actions/user';
import PostUserItems from './PostUserItems';
import UpdateUserForm from './UpdateUserForm';

const useStyles = makeStyles({
    profileScreenContainer: {
        display:"flex", 
        backgroundColor:"", 
        justifyContent:"center"
    }, 
    titleProfileScreen: {
        margin:"2rem 0rem"
    }, 
    dataPostContainer: {
        display:"flex", 
        justifyContent:"space-around", 
        margin:"1rem 0rem", 
        backgroundColor:""
    }, 
    titlesPostData:{
        fontWeight:"lighter", 
        margin:"1rem 0rem"
    }, 
    myDataContainer:{
        display:"flex", 
        flexDirection:"column", 
        backgroundColor:""
    }, 
    myDataTextField:{
        margin:".5rem 0rem"
    }, 
    formData:{
        backgroundColor:"", 
        width:"45%"
    }, 
    tableDataD:{
        width:"45%"
    },
    tableData:{
        fontFamily:"arial", 
        border:"1px solid #333"
    }
}); 

const ProfileScreen = ({history}) => {

    const classes = useStyles();
    const dispatch = useDispatch(); 

    const {userPosts} = useSelector(state => state.userDetails);
    
    useEffect(() => {

        if(userPosts.length === 0){
            dispatch(userStartLoadingPosts());
        }
        
    }, [dispatch, userPosts]); 



    
    return (
        <>
        <div
            className={classes.profileScreenContainer}
        >
            <Typography 
                variant="h5"
                className={classes.titleProfileScreen}
            >
                PROFILE
            </Typography>
        </div>

        <div 
            className={classes.dataPostContainer}
        >
                <div 
                    className={classes.formData}
                >
                    <Typography 
                        variant="h6" 
                        className={classes.titlesPostData}
                    > 
                        MY DATA
                    </Typography>

                    <UpdateUserForm/>
                </div>

                <div
                    className={classes.tableDataD}
                >
                    <Typography 
                        variant="h6"
                        className={classes.titlesPostData}
                    > 
                        MY POSTS
                    </Typography>

                    


                    <TableContainer
                        component={Paper}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> Title </TableCell>
                                    <TableCell> Date Posted </TableCell>
                                    <TableCell> Image </TableCell>
                                    <TableCell> Actions </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {userPosts.map( post => {
                                        return <PostUserItems post={post} key={post.id} history={history} />
                                    })}
                            </TableBody>

                        </Table>

                    </TableContainer>
                </div>
        </div>
        </>
    )
}

export default ProfileScreen
