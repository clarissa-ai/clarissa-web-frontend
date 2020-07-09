import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';

const ProtectedRoutes = (props) => {
    const profile = useSelector(profileSelector);
    return (
        profile.authenticated ? <Switch>{props.children}</Switch> : <Redirect to='/login' />
    );
};

export default ProtectedRoutes;
