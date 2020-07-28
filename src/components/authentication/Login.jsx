import React from 'react';
import {Grid, Input, InputAdornment, IconButton, Button, Typography, Link, makeStyles, FormControlLabel, Checkbox} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Link as RouterLink} from 'react-router-dom';
import {profileSelector} from 'redux/selectors';
import {setProfile} from 'redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import Alert from '@material-ui/lab/Alert';


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
        if (values.password === '') {
            setValues({...values, error: <Alert severity="error">Please enter a password</Alert>});
            return;
        } else if (values.email === '') {
            setValues({...values, error: <Alert severity="error">Please enter a username</Alert>});
            return;
        }

        profile.login(values.email, values.password, (newProfile) => {
            dispatch(setProfile(newProfile));
        });
        if (!profile.authenticated) setValues({...values, error: <Alert severity="error">Incorrect username or password</Alert>});
    };

    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
        password: '',
        email: '',
        rememberMe: false,
        error: '',
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

    return (
        <Grid container direction="column" alignItems="flex-start" justify='center' spacing={5}>
            <Grid item>{values.error}</Grid>
            <Grid item><Typography variant='h4' style={{fontWeight: 'bold', color: '#334D6E'}}>Sign In</Typography></Grid>
            <Grid item><Input required onChange={handleChange('email')} id="standard-basic" placeholder="Email" className={classes.field}/></Grid>
            <Grid item>
                <Input
                    className={classes.field}
                    required
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
                    <Grid item><Button className={classes.button} onClick={login}>Sign In</Button></Grid>
                    <Grid item><Typography><Link component={RouterLink} className={classes.link}>Forgot Password?</Link></Typography></Grid>
                    <Grid item><Typography>Don&apos;t have an account? <Link component={RouterLink} className={classes.link} to='/signup'>Sign Up</Link></Typography></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Login;
