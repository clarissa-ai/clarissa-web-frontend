import React, {useState} from 'react';
import {FormHelperText, Select, MenuItem, Box, Button, Grid, makeStyles, TextField, Typography, Input, createMuiTheme, ThemeProvider, Avatar, Divider} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';

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
        width: '100vw',
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
        margin: '2rem'
    },
    divider: {
        direction: 'row',
        display: 'flex',
        height: '80vh',
    },
    contents: {
        width: '100vw',
        display: 'flex',
        background: '#fff',
        padding: '2rem',
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
    const [changePass, setChangePass] = useState(false);
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({
        name: profile.userInfo.first_name,
        email: profile.userInfo.email,
        password: '',
        showPassword: false,
    });

    const submit = () => {
        const result = {
            'first_name': values.name,
            'email': values.email,
            'birthdate': date,
        };
        if (changePass) {
            result['data']['password'] = password;
        }

        fetch(`${apiLink}/api/user/edit_settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json());
    };

    const handleChange = (prop) => (e) => {
        setValues({...values, [prop]: e.target.value});
        if (e.target.value === 'hello') {
            setChangePass(true);
        } else setChangePass(false);
        // DELETE
        setPassword('');
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
            <ResponsiveDrawer/>
            <div className={classes.contents}>
            {/* Card contents */}
                {/* Column 1 */}
                <Grid item xs={2}>
                    <div className={classes.column}>
                        <Avatar alt={profile.userInfo.first_name} src={profile.userInfo.img} className={classes.avatarSize}/>
                    </div>
                </Grid>
                {/* Column 2 */}
                <Grid item xs={4} className={classes.divider}>
                    <Divider orientation='vertical' flexItem/>
                    <div className={classes.column}>
                        <Typography variant='h6'><Box fontWeight='bold'>User Information</Box></Typography>
                        <TextField className={classes.close} label='First Name' id="standard-basic" onChange={handleChange('name')} defaultValue={values.name}/>
                        <TextField id="standard-basic" label='Email' defaultValue={values.email} onChange={handleChange('email')}/>
                            
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
                    </div>
                </Grid>
                        
                {/* Column 3 */}
                <Grid item xs={4} className={classes.divider}>
                    <Divider orientation='vertical' flexItem/>
                    <div className={classes.column}>
                    {/* Change Password */}
                    <Typography variant='h6'><Box fontWeight='bold'>Change Password </Box></Typography>
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

                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
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

                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Confirm new password</InputLabel>
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
                    <Button variant='outlined' onClick={submit}>Save Changes</Button>
                    </div>
                </Grid>
            </div>
        </Grid>
    </div>
    );
};
export default SettingsPage;
