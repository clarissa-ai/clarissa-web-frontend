import React from 'react';
import {Button, Grid, makeStyles, TextField} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100vw',
        height: '100vh',
        zIndex: '999',
    },
    formContainer: {
        background: '#fff',
        width: '40vw',
        padding: '4rem',
        borderRadius: '4px',
    },
    date: {
        background: '#fff',
    },
}));

const SymptomModal = (props) => {
    SymptomModal.propTypes = {
        closeModalFunction: propTypes.func,
    };

    const [selectedDate, setSelectedDate] = React.useState(Date.now());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.container} justify='center' alignItems='center'> {console.log(props.closeModalFunction)}
            <Grid container className={classes.formContainer} direction='column' spacing={1}>
                <Grid container justify='flex-end'>
                    <Grid item><Button onClick={props.closeModalFunction}>x Close</Button></Grid>
                </Grid>
                <Grid item><TextField className={classes.close} id="outlined-basic" label="Symptom" variant="outlined" fullWidth/></Grid>
                <Grid item><TextField id="outlined-basic" label="Data" variant="outlined" fullWidth/></Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date Logged"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Grid container justify='center'>
                    <Grid item><Button onClick={console.log('save data placeholder')}>Save</Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SymptomModal;
