import React, {useEffect} from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import HomeScreen from '../components/blog/HomeScreen';
import PostDetails from '../components/blog/PostDetails';
import Loader from '../components/ui/Loader';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Navbar from '../components/ui/Navbar';
import NewPost from '../components/blog/NewPost';
import ProfileScreen from '../components/blog/ProfileScreen';
import PostEdit from '../components/blog/PostEdit';


const AppRouter = () => {
    const dispatch = useDispatch(); 

    const {checking, uid} = useSelector(state => state.auth); 

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])


    if(checking){
        return <Loader/>;
    }

    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />

                    <PublicRoute 
                        exact 
                        path="/register" 
                        component={RegisterScreen}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={HomeScreen}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute  
                        exact
                        path="/post/:id" 
                        component={PostDetails}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute  
                        exact
                        path="/posts/new" 
                        component={NewPost}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        exact
                        path="/profile"
                        component={ProfileScreen}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute  
                        exact
                        path="/post/edit/:id" 
                        component={PostEdit}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
