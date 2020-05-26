import React, {createContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';
import './App.css';

import Profile from 'Profile.js';
import SurveyDAG from 'components/misc/Survey/SurveyDAG'; 

// Here we create a new context, allowing all nested elements of ProfileContext.Provider to use the profile object.
const ProfileContext = createContext(null);

const App = () => {
  // We create a new profile object. It should automatically be populated if the user has already logged in.
  const profile = new Profile();
  const survey = new SurveyDAG();

  return (
    <ProfileContext.Provider value={profile}>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/" render={(props, survey) => <p>This is the landing page!</p> }></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ProfileContext.Provider>
  );
};
export default App;
