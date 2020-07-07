import React from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';

import {profileSelector} from 'redux/selectors';
import {setProfile} from 'redux/actions';

const Login = (props) => {
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const login = () => {
        profile.login('korra@dogmail.com', 'Bark2020', (newProfile) => {
            console.log(newProfile);
            dispatch(setProfile(newProfile));
        });
    };
    const logout = () => {
        profile.logout((newProfile) => {
            dispatch(setProfile(newProfile));
            console.log(newProfile);
        });
    };

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={6}>
                <TextField label="Email" placeholder="your@email.com" type="email" autoComplete="email" variant="outlined" required margin="dense" fullWidth/> {/* Email */}
            </Grid>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>Logout</Button>
            <Typography>{profile.userInfo ? profile.userInfo.user_id : 'nope'}</Typography>
        </Grid>
    );
};
export default Login;
