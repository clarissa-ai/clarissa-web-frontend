import React from 'react';
import {Fade, Grid} from '@material-ui/core';
import LoginForm from 'components/authentication/login/Login';

const LoginPage = () => {
    return <Fade in timeout={500}>
        <Grid container justify='center' alignItems='center' style={{width: '100vw', height: '100vh'}}>
            <Grid item><LoginForm/></Grid>
        </Grid>
    </Fade>
}

export default LoginPage;
