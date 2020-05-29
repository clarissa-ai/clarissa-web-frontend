import React from 'react';
import {Grid, TextField} from '@material-ui/core';

import {ProfileContext} from 'App';

const Login = () => {
    const profile = ProfileContext;
    console.log(profile);

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={6}>
                <TextField label="Email" placeholder="your@email.com" type="email" autoComplete="email" variant="outlined" required margin="dense" fullWidth/> {/* Email */}
            </Grid>
        </Grid>
    );
};
export default Login;
