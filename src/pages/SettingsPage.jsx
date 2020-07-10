import React, {useState} from 'react';
import {FormHelperText, Select, MenuItem, Box, Button, Grid, makeStyles, TextField, Card, Typography, CardContent, Input, createMuiTheme, ThemeProvider, Avatar} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SideNavBar from 'components/navbar/SideNavBar';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';

import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';

const useStyles = makeStyles((theme) => ({
    container: {
        background: 'white',
        width: '161vh',
        height: '98vh',
        margin: '10px',
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
        <Grid container direction ='row' spacing={8} style={{margin: 0, width: '100%', height: '100%', backgroundColor: '#F5F6F8'}}>
            <Grid item xs={2} style={{height: '100vh', padding: '0'}}>
                <SideNavBar/>
            </Grid>
            <Grid item style={{height: '100vh', padding: '0'}}>
                <Card className={classes.container}>
                    <CardContent>
                    <Typography variant='h6'><Box fontWeight='bold'>User Information</Box></Typography>

                        <Grid item>
                            <Avatar alt={profile.userInfo.first_name} src={profile.userInfo.img} className={classes.avatarSize}/>
                        </Grid>
                        <Grid container direction='column' spacing={1}>
                            <Grid item><TextField className={classes.close} label='First Name' id="standard-basic" onChange={handleChange('name')} defaultValue={values.name}/></Grid>
                            <Grid item><TextField id="standard-basic" label='Email' defaultValue={values.email} onChange={handleChange('email')}/></Grid>
                            
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

                            
                            {/* Change Password */}
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
                            <Grid item>
                                <Button onClick={submit}>
                            Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
export default SettingsPage;
