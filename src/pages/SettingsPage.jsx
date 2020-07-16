import React, {useState} from 'react';
import {FormHelperText, Select, MenuItem, Box, Button, Grid, makeStyles, TextField, Typography, Input, createMuiTheme, ThemeProvider, Avatar, Divider} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';

import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#F5F6F8',
        width: '100%',
        padding: '2rem',
        height: '100%',
    },
    date: {
        background: '#fff',
        fontFamily: 'Poppins',
    },
    avatarSize: {
        width: '5rem',
        height: '5rem',
        fontWeight: 600,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2rem',
    },
    divider: {
        direction: 'row',
        display: 'flex',
        height: '80vh',
    },
    contents: {
        display: 'flex',
        background: '#fff',
        padding: '2rem',
        borderRadius: '4px',
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    },
}));

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                background: '#fff',
            },
        },
    },
});

const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

const SettingsPage = (props) => {
    const classes = useStyles();
    const profile = useSelector(profileSelector);
    const [date, setDate] = useState(profile.userInfo.birthdate);
    const [confirmNewPass, setConfirmNew] = useState('');
    const [newPassError, setNewPassError] = useState(false);
    const [infoResponse, setInfoResponse] = useState();
    const [passResponse, setPassResponse] = useState();
    const [values, setValues] = useState({
        name: profile.userInfo.first_name,
        email: profile.userInfo.email,
        password: '',
        newPass: '',
        showPassword: false,
        sex: profile.userInfo.sex,
        result: {},
    });

    const submitInfo = () => {
        const result = {};
        if (values.name !== profile.userInfo.first_name) {
            result['first_name'] = values.name;
        }
        if (values.email !== profile.userInfo.email) {
            result['email'] = values.email;
        }
        if (values.sex !== profile.userInfo.sex) {
            result['sex'] = values.sex;
        }
        if (date !== profile.userInfo.birthdate) {
            result['birthdate'] = date;
        }
        console.log(JSON.stringify(result));
        fetch(`${apiLink}/api/user/edit_settings`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json()).then(
            (result) => {
                setInfoResponse(result);
            },
        );
    };

    const submitPass = () => {
        const result = {
            'current_password': values.password,
            'password': values.newPass,
        };
        console.log(result);
        fetch(`${apiLink}/api/user/edit_settings`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json()).then(
            (result) => {
                setPassResponse(result);
            },
        );
    };

    const handlePassChange = (e) => {
        if (e.target.value !== values.newPass) {
            setNewPassError(true);
        } else setNewPassError(false);
        setConfirmNew(e.target.value);
    };

    const handleChange = (prop) => (e) => {
        setValues({...values, [prop]: e.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleSex = (event) => {
        setValues({...values, sex: event.target.value});
    };

    return (
        <div className={classes.container}>
            <Grid container direction='row' wrap='nowrap'>
                <div className={classes.contents}>
                    {/* Card contents */}
                    {/* Column 1 */}
                    <Grid item xs={1}>
                        <Grid container justify='center'>
                            <div className={classes.column}>
                                <Avatar alt={profile.userInfo.first_name} src={profile.userInfo.img} className={classes.avatarSize}/>
                            </div>
                        </Grid>
                    </Grid>
                    {/* Column 2 */}
                    <Grid item xs={4} className={classes.divider}>
                        <Divider orientation='vertical' flexItem/>
                        <div className={classes.column}>
                            <Grid container direction='column' spacing={2} justify='center'>
                                <Grid item>
                                    <Typography variant='h6'><Box fontWeight='bold'>User Information</Box></Typography>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.close} label='First Name' id="standard-basic" onChange={handleChange('name')} defaultValue={values.name}/>
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-basic" label='Email' defaultValue={values.email} onChange={handleChange('email')}/>
                                </Grid>

                                <Grid item>
                                    <ThemeProvider theme={materialTheme}>
                                        <FormControl className={classes.formControl}>
                                            <FormHelperText>Sex</FormHelperText>
                                            <Select
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
                                    </ThemeProvider>
                                </Grid>

                                <Grid item>
                                    <ThemeProvider theme={materialTheme}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                label='Date of Birth'
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                value={date}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                className={classes.date}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item><Button fullWidth variant='outlined' onClick={submitInfo} style={{margin: '2rem 0'}}>Save Changes</Button></Grid>
                                {infoResponse ? <Typography>{infoResponse.message}</Typography> : null}
                                {console.log(infoResponse)}
                            </Grid>
                        </div>
                    </Grid>

                    {/* Column 3 */}
                    <Grid item xs={4} className={classes.divider}>
                        <Divider orientation='vertical' flexItem/>
                        <div className={classes.column}>
                            {/* Change Password */}
                            <Grid container direction='column' spacing={2} justify='center'>
                                <Grid item><Typography variant='h6'><Box fontWeight='bold'>Change Password </Box></Typography></Grid>
                                <Grid item>
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="standard-adornment-password">Current password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}>
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.newPass}
                                            onChange={handleChange('newPass')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}>
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    {newPassError ? <Typography>Passwords Do Not Match</Typography> : null}
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="standard-adornment-password">Confirm new password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={confirmNewPass}
                                            onChange={handlePassChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}>
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button fullWidth variant='outlined' onClick={submitPass} style={{margin: '2rem 0'}} disabled={newPassError}>
                                        Save Changes
                                    </Button>
                                </Grid>
                                {passResponse ? <Typography>{passResponse.message}</Typography> : null}
                            </Grid>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
};
export default SettingsPage;
