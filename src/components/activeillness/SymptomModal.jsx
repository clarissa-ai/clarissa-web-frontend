import React, {useState} from 'react';
import {Button, Grid, makeStyles, /* TextField,*/ ThemeProvider, Typography} from '@material-ui/core';
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
        zIndex: '9999',
    },
});

const useStyles = makeStyles((theme) => ({
    container: {
        zIndex: '999',
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.4)',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        height: '100%',
    },
    formContainer: {
        background: '#fff',
        width: '30vw',
        padding: '1rem',
        borderRadius: '4px',
    },
    date: {
        background: '#fff',
        fontFamily: 'Poppins',
    },
    saveButton: {
        marginTop: '1rem',
        textTransform: 'none',
        backgroundColor: '#47C594',
        bordeRadius: '4px',
        color: '#fff',
    },
    deleteButton: {
        marginTop: '1rem',
        textTransform: 'none',
        backgroundColor: '#F46D66',
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
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    SymptomModal.propTypes = {
        closeModalFunction: propTypes.func,
        data: propTypes.object,
        incrstate: propTypes.func,
    };

    const [selectedDate, setSelectedDate] = useState(props.data.created_on);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onClickDelete = () => {
        props.closeModalFunction();
        const result = {
            'symptom_id': props.data.id,
        };
        console.log(result);
        fetch(`${apiLink}/api/illness/delete_symptoms`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json()).then(() => {
            props.incrstate();
        });
    };

    const onClickSave = () => {
        props.closeModalFunction();
        const result = {
            'symptom_id': props.data.id,
            'new_date': new Date(selectedDate).toISOString(),
        };
        console.log(result);
        fetch(`${apiLink}/api/illness/edit_symptoms`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        }).then((res) => res.json()).then(() => {
            props.incrstate();
        });
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={2}>
                <Grid container justify='flex-end' >
                    <Grid item><Button className={classes.close} onClick={props.closeModalFunction}>Close</Button></Grid>
                </Grid>
                <Grid item><Typography>Symptom: {props.data.title}</Typography></Grid>
                {/* <Grid item><TextField id="outlined-basic" label="Symptom" variant="outlined" fullWidth/></Grid>*/}
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
                {/* <Grid item><TextField id="outlined-basic" label="Data" variant="outlined" fullWidth/></Grid>*/}
                <Grid container justify='space-between'>
                    {/* NOTE TO SELF: POST CHANGES WHEN CONNECTING TO BACKEND */}
                    <Grid item>
                        <Button className={classes.deleteButton} onClick={onClickDelete}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item><Button className={classes.saveButton} onClick={onClickSave}>Save</Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SymptomModal;
