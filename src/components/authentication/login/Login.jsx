import React, {useEffect} from 'react';
import {Grid, TextField, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';

import {ProfileContext} from 'App';

const Login = (props) => {
    console.log(useSelector((state) => state));
    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={6}>
                <TextField label="Email" placeholder="your@email.com" type="email" autoComplete="email" variant="outlined" required margin="dense" fullWidth/> {/* Email */}
            </Grid>
            <Typography></Typography>
        </Grid>
    );
};
export default Login;
