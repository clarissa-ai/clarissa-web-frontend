import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';

const Gate = (props) => {
    const profile = useSelector(profileSelector);
    console.log('test');
    return (
        profile.authenticated ? [] : <Redirect to='/login' />
    );
};

export default Gate;
