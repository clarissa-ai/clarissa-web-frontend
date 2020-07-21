import React from 'react';
import {Button, Grid, makeStyles, TextField, ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme} from '@material-ui/core/styles';
import propTypes from 'prop-types';

// For overriding date picker background, it allows themes only
const theme = createMuiTheme({
    overrides: {
        MuiPickersDay: {
            backgroundColor: '#fff',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    container: {
        zIndex: '9999',
        position: 'absolute',
        // background: 'rgba(0, 0, 0, 0.4)',

    },
    formContainer: {
        background: '#fff',
        width: '30vw',
        padding: '2rem',
        borderRadius: '4px',
    },
    date: {
        background: '#fff',
        fontFamily: 'Poppins',
    },
    button: {
        marginTop: '1rem',
        textTransform: 'none',
        backgroundColor: '#47C594',
        bordeRadius: '4px',
        color: '#fff',
    },
    close: {
        textTransform: 'none',
        width: 'fitContent',
        marginBottom: '1rem',
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
        <Grid container className={classes.container} justify='center' alignItems='center'>
            {/* Form contents */}
            <Grid container className={classes.formContainer} direction='column' spacing={2}>
                <Grid container justify='flex-end' >
                    <Grid item><Button className={classes.close} onClick={props.closeModalFunction}>Close</Button></Grid>
                </Grid>
                <Grid item><TextField id="outlined-basic" label="Symptom" variant="outlined" fullWidth/></Grid>
                <Grid item><ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.date}
                            fullWidth
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin='none'
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider></Grid>
                <Grid item><TextField id="outlined-basic" label="Data" variant="outlined" fullWidth/></Grid>
                <Grid container justify='center'>
                    {/* NOTE TO SELF: POST CHANGES WHEN CONNECTING TO BACKEND */}
                    <Grid item><Button className={classes.button} onClick={props.closeModalFunction}>Save</Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SymptomModal;
