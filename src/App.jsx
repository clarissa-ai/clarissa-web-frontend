import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography} from '@material-ui/core';
import {connect, useDispatch} from 'react-redux';
import {setProfile} from 'redux/actions';
import './App.css';
import Profile from 'Profile.js';
import LoaderClass from 'components/navigation/loader/LoaderClass';

import Landing from 'pages/landing/Landing';
import Login from 'components/authentication/login/Login';
import ScreeningStart from 'components/misc/survey/ScreeningStart';
import Loader from 'components/navigation/loader/Loader';

// Here we create a new context, allowing all nested elements of ProfileContext.Provider to use the profile object.
const ProfileContext = createContext(null);
// We create a loader context as well, to pass down the object to all components who need to load something.
const LoaderContext = createContext(null);
const contrastText = '#2C3C56';
let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#306DDF',
            contrastText: '#ffff',
        },
        secondary: {
            main: '#FEAD18',
            contrastText: contrastText,
        },
        error: {
            main: '#F46D66',
            contrastText: contrastText,
        },
        info: {
            main: '#7064D0',
            contrastText: contrastText,
        },
        success: {
            main: '#47C594',
            contrastText: contrastText,
        },
        background: '#F5F8FF',
        text: {
            primary: '#2C3C56',
            secondary: '#AEAEAE',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});
theme = responsiveFontSizes(theme);

const App = (props) => {
    // State to control custom routing.
    const [routes, setRoutes] = useState(null);
    console.log(process.env.REACT_APP_ENDPOINT_BASE);
    const dispatch = useDispatch(); // react-redux dispatch
    useEffect(() => {
        const profile = new Profile();
        dispatch(setProfile(profile));
        fetch(`${process.env.REACT_APP_ENDPOINT_BASE}/api/routes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                return;
            }
            response.json().then((data) => {
                const {status, message} = data;
                if (status === 'success') {
                    setRoutes(data.routes);
                } else {
                    console.log(message);
                }
            });
        });
    }, [dispatch]);

    const redirect = [];
    if (routes) {
        Object.keys(routes).forEach((key) => redirect.push(<Redirect key={key} from={key} to={routes[key]} />));
    };

    return (
        <ProfileContext.Provider value={null}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => <Landing/> }></Route>
                        <Route exact path="/login" render={(props) => <Login/>} />
                        <Route path="/survey" render={(props) => <ScreeningStart {...props}/>} />
                        {redirect}
                        <Route render={(props) => <Typography>This is the 404 page.</Typography>} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </ProfileContext.Provider>
    );
};
export default App;
export {ProfileContext, LoaderContext};
