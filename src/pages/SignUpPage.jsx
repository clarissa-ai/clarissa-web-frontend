import React from 'react';
import {Fade, Grid} from '@material-ui/core';
import SignUpForm from 'components/authentication/login/Signup';

const LoginPage = () => {
    return <Fade in timeout={1000}>
        <Grid container justify='center' alignItems='center' style={{width: '100vw', height: '100vh'}}>
            <Grid item><SignUpForm/></Grid>
        </Grid>
    </Fade>
}

export default LoginPage;
