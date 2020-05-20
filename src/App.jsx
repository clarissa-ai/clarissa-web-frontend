import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import './App.css';

import Profile from "Profile.js";

const ProfileContext = createContext(null); //Here we create a new context, allowing all nested elements of ProfileContext.Provider to use the profile object.

const App = () => {
  let profile = new Profile(); //We create a new profile object. It should automatically be populated if the user has already logged in.

  return (
    <ProfileContext.Provider value={profile}>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => { <p>This is the landing page!</p> }}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ProfileContext.Provider>
  );
}
export default App;