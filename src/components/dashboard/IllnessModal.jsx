import React, {useEffect} from 'react';
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
        position: 'fixed',
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
    },
}));

const IllnessModal = (props) => {

    IllnessModal.propTypes = {
        onModalChange: propTypes.func,
    };

    const [selectedDate, setSelectedDate] = React.useState(Date.now());
    const [hasActiveIllness, setHasActiveIllness] = React.useState();
    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState(Date.now());
    const [endDate, setEndDate] = React.useState(Date.now());


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const API_LINK = process.env.API_LINK;

    const populateData = () => {
        fetch(`${API_LINK}/api/illness/get_active_illness`, {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (response.status === 400) setHasActiveIllness(false);
            else setHasActiveIllness(true);
        })

        if (hasActiveIllness) {

        }
    }

    const classes = useStyles();

    useEffect(() => {
        populateData();
        console.log(props.onModalChange)
    })

    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={2}>
                <Grid container justify='flex-end' >
                    <Grid item><Button className={classes.close} onClick={() => props.onModalChange()}>Close</Button></Grid>
                </Grid>
                <Grid item><TextField id="outlined-basic" label="Illness Name" variant="outlined" fullWidth/></Grid>
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
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider></Grid>

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
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider></Grid>

                <Grid container justify='center'>
                    {/* NOTE TO SELF: POST CHANGES WHEN CONNECTING TO BACKEND */}
                    <Grid item><Button className={classes.button}>Save</Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default IllnessModal;
