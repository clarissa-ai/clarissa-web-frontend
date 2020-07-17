import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ThemeProvider, createMuiTheme, responsiveFontSizes} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {setProfile} from 'redux/actions';
import './App.css';
import Profile from 'Profile.js';
import Loader from 'components/navigation/loader/Loader';
import MainPage from 'components/navigation/mainpage/MainPage';
import ProtectedRoute from 'components/navigation/protected/ProtectedRoute';
import UnauthRedirectRoute from 'components/navigation/protected/UnauthRedirectRoute';
import Login from 'pages/LoginPage';
import Signup from 'pages/SignUpPage';
import ScreeningStart from 'components/misc/survey/ScreeningStart';
import Dashboard from 'pages/DashboardPage';
import SymptomLog from 'components/activeillness/SymptomLog';
import SurveysPage from 'pages/SurveysPage';
import ActiveAnalysis from 'components/activeillness/activeanalysis/ActiveAnalysis';
import PastIllnessPage from 'pages/PastIllnessPage';
import ActiveIllnessPage from 'pages/ActiveIllnessPage';
import PageNotFound from 'pages/404/404';
import SettingsPage from 'pages/SettingsPage';

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
    overrides: {
        MuiTab: {
            wrapper: {
                flexDirection: 'row',
            },
        },
    },
});
theme = responsiveFontSizes(theme);

const App = (props) => {
    // State to control custom routing.
    const [routes, setRoutes] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const dispatch = useDispatch(); // react-redux dispatch
    useEffect(() => {
        const profile = new Profile();
        dispatch(setProfile(profile));
        profile.getUserInfo((newProfile) => {
            dispatch(setProfile(newProfile));
            setProfileLoading(false);
        });
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
        <ThemeProvider theme={theme}>
            <Loader loading={routes && !profileLoading ? false : true}>
                <Router>
                    <MainPage>
                        <Switch>
                            {redirect}
                            <Redirect exact from='/' to='/dashboard' />
                            <UnauthRedirectRoute path="/login" page={<Login />} />
                            <UnauthRedirectRoute path="/signup" page={<Signup />}/>
                            <Route path="/survey" render={(props) => <ScreeningStart {...props}/>} />
                            <ProtectedRoute path='/dashboard' page={<Dashboard />} />
                            <ProtectedRoute path='/active-illness' page={<ActiveIllnessPage />} />
                            <ProtectedRoute path='/past-illnesses' page={<PastIllnessPage />} />
                            <ProtectedRoute path='/surveys' page={<SurveysPage />} />
                            <Route path='/analysis' render={() => <ActiveAnalysis />}/>
                            <ProtectedRoute path='/settings' page={<SettingsPage />} />
                            <Route path='/test' render={(props) => <div><SymptomLog/></div>}/>
                            <Route path='/404' render={() => <PageNotFound />} />
                            <Redirect to='/404' />
                        </Switch>
                    </MainPage>
                </Router>
            </Loader>
        </ThemeProvider>
    );
};
export default App;
