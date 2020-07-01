import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';

const Gate = (props) => {
    const profile = useSelector(profileSelector);
    return (
        profile.isAuthenticated ? props.children : <Redirect to='/login' />
    );
};

export default Gate;
