import React, {createContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography} from '@material-ui/core';
import './App.css';

import Profile from 'Profile.js';
// import SurveyDAG from 'components/misc/Survey/SurveyDAG';
import Login from 'components/authentication/login/Login';

// Here we create a new context, allowing all nested elements of ProfileContext.Provider to use the profile object.
const ProfileContext = createContext(null);
// const survey = new SurveyDAG();
const contrastText = '#2C3C56';
let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#306DDF',
            contrastText: contrastText,
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
    },
    typography: {
        fontFamily: 'Poppins',
    },
});
theme = responsiveFontSizes(theme);

const App = () => {
    // We create a new profile object. It should automatically be populated if the user has already logged in.
    const profile = new Profile();
    console.log(process.env.REACT_APP_ENDPOINT_BASE);

    return (
        <ProfileContext.Provider value={profile}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => <Typography>{process.env.NODE_ENV}</Typography> }></Route>
                        <Route exact path="/login" render={(props) => <Login/>} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </ProfileContext.Provider>
    );
};
export default App;
export {ProfileContext};

