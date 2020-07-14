import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';

const ProtectedRoute = (props) => {
    const profile = useSelector(profileSelector);
    return (
        <Route exact={props.exact} path={props.path} render={() => profile.authenticated ? props.page : <Redirect to='login' />} />
    );
};

export default ProtectedRoute;
