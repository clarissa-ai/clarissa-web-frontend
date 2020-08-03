import React from 'react';
import {ThemeProvider, createMuiTheme, FormHelperText, FormControl, MenuItem, Select, Grid, Input, InputAdornment, IconButton, Button, Typography, Link, makeStyles, FormControlLabel, Checkbox} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Link as RouterLink} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {useSelector, useDispatch} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import {setProfile} from 'redux/actions';

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                background: '#fff',
            },
        },
    },
});

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
    select: {
        width: '100%',
    },
    pickers: {
        width: '9.5rem',
    },
}));


const Signup = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
        password: '',
        confirmpassword: '',
        firstname: '',
        rememberMe: false,
        sex: '',
        acceptterms: false,
        error: '',
    });
    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

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
        setValues({...values, acceptterms: !values.acceptterms});
    };

    const handleSex = (event) => {
        setValues({...values, sex: event.target.value});
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const verifyForm = () => {
        if (values.password !== values.confirmpassword) setValues({...values, error: <Alert severity="error">Passwords do not match!</Alert>});
        if (values.firstname === '') setValues({...values, error: <Alert severity="error">Must enter a first name</Alert>});
        if (values.email === '') setValues({...values, error: <Alert severity="error">Must enter a valid email</Alert>});
        if (values.acceptterms === false) setValues({...values, error: <Alert severity="error">Must accept Terms of Service and Privacy Policy</Alert>});
        handleSignUp();
    };

    const handleSignUp = () => {
        profile.signup(values.email, values.firstname, values.sex, ('0' + (selectedDate.getMonth() + 1)).slice(-2)+'/'+('0' + selectedDate.getDate()).slice(-2)+'/'+selectedDate.getFullYear(), values.password, (newProfile) => {
            dispatch(setProfile(newProfile));
        });
    };

    return (
        <Grid container direction="column" alignItems="flex-start" justify='center' spacing={5}>
            <Grid item>{values.error}</Grid>
            <Grid item><Typography variant='h4' style={{fontWeight: 'bold', color: '#334D6E'}}>Sign Up</Typography></Grid>
            <Grid item><Input id="standard-basic" required placeholder="Email*" className={classes.field} onChange={handleChange('email')}/></Grid>
            <Grid item><Input id="standard-basic" required placeholder="First Name*" className={classes.field} onChange={handleChange('firstname')}/></Grid>
            <Grid item>
                <Grid container direction='row' alignItems='center' spacing={2}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <FormHelperText>Sex*</FormHelperText>
                            <Select
                                required
                                value={values.sex}
                                onChange={handleSex}
                                displayEmpty
                                className={classes.pickers}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'None'}>Prefer not to say</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <ThemeProvider theme={materialTheme}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    label='Date of Birth'
                                    disableToolbar
                                    required
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    className={classes.pickers}
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Input
                    className={classes.field}
                    placeholder="Password*"
                    required
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
                <Input
                    className={classes.field}
                    placeholder="Confirm Password*"
                    required
                    id="standard-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.confirmpassword}
                    onChange={handleChange('confirmpassword')}
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
                            checked={values.acceptterms}
                            onChange={handleCheckbox}
                            color='inherit'
                            required
                        />
                    }
                    label="I accept our Terms of Service and Privacy Policy"
                />
            </Grid>
            <Grid item>
                <Grid container justify='flex-end' direction='column' spacing={3}>
                    <Grid item><Button className={classes.button} onClick={verifyForm}>Sign Up</Button></Grid>
                    <Grid item><Typography>Already have an account? <Link component={RouterLink} className={classes.link} to='/login'>Sign In</Link></Typography></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Signup;
