import React from 'react';
import {Grid, Input, InputAdornment, IconButton, Button, Typography, Link, makeStyles, FormControlLabel, Checkbox} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {profileSelector} from 'redux/selectors';
import {setProfile} from 'redux/actions';
import {useSelector, useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    field: {
        width: '20rem',
        fontSize: '.9rem',
    },
    button: {
        backgroundColor: '#47C594',
        color: '#fff',
        padding: '0.5rem',
        width: '20rem',
        boxShadow: '0px 4px 10px rgba(16, 156, 241, 0.24)',
        borderRadius: '4px',
        textTransform: 'none',
    },
    link: {
        color: '#47C594',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    checkbox: {
        color: '#47C594',
        fontSize: '1rem',
    },
    unchecked: {
        color: '#000',
    },
}));

const Login = () => {
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

    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
        password: '',
        email: '',
        rememberMe: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCheckbox = (event) => {
        setValues({...values, rememberMe: !values.rememberMe});
    };

    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    const handleSignIn = () => {

        const data = {
            'email': values.email,
            'password': values.password,
        }

        fetch(`${apiLink}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Login Success:', data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <Grid container direction="column" alignItems="flex-start" justify='center' spacing={5}>
            <Grid item><Typography variant='h4' style={{fontWeight: 'bold', color: '#334D6E'}}>Sign In</Typography></Grid>
            <Grid item><Input onChange={handleChange('email')} id="standard-basic" placeholder="Email" className={classes.field}/></Grid>
            <Grid item>
                <Input
                    className={classes.field}
                    placeholder="Password"
                    id="standard-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end" color='secondary'>
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            classes={{root: classes.checkbox, indeterminate: classes.unchecked}}
                            checked={values.rememberMe}
                            onChange={handleCheckbox}
                            color='inherit'
                        />
                    }
                    label="Keep me logged in"
                />
            </Grid>
            <Grid item>
                <Grid container justify='flex-end' direction='column' spacing={3}>
                    <Grid item><Button className={classes.button} onClick={handleSignIn()}>Sign In</Button></Grid>
                    <Grid item><Typography><Link className={classes.link}>Forgot Password?</Link></Typography></Grid>
                    <Grid item><Typography>Don&apos;t have an account? <Link className={classes.link}>Sign Up</Link></Typography></Grid>
                </Grid>
            </Grid>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>Logout</Button>
            <Typography>{profile.userInfo ? profile.userInfo.user_id : 'nope'}</Typography>
        </Grid>
    );
};
export default Login;
