import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider, createMuiTheme, responsiveFontSizes, Typography} from '@material-ui/core';
import './App.css';
import Profile from 'Profile.js';
// import SurveyDAG from 'components/misc/Survey/SurveyDAG';
import Landing from 'pages/landing/Landing';
import Login from 'components/authentication/login/Login';
import ScreeningStart from 'components/misc/survey/ScreeningStart';
import SymptomLog from 'components/dashboard/SymptomLog';
import SymptomHistory from 'components/dashboard/SymptomHistory';
import PrescriptionCard from 'components/dashboard/PrescriptionCard';

// Here we create a new context, allowing all nested elements of ProfileContext.Provider to use the profile object.
const ProfileContext = createContext(null);
// const survey = new SurveyDAG();
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
            primary: '#FEAD18',
            secondary: '#47C594',
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
    // State to control custom routing.
    const [routes, setRoutes] = useState(null);
    console.log(process.env.REACT_APP_ENDPOINT_BASE);

    useEffect(() => {
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
    }, []);

    const redirect = [];
    if (routes) {
        Object.keys(routes).forEach((key) => redirect.push(<Redirect key={key} from={key} to={routes[key]} />));
    };

    return (
        <ProfileContext.Provider value={profile}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => <Landing/> }></Route>
                        <Route exact path="/preview" render={(props) => <div><SymptomLog /><SymptomHistory /><PrescriptionCard /></div> }></Route>
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
export {ProfileContext};
