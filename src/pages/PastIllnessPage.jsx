import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';

const PastIllness = (props) => {
    return <Fade in timeout={1000}>
        <ResponsiveDrawer/>
    </Fade>
}

export default PastIllness;
