import React, {useEffect} from 'react';
import {Button, Grid, makeStyles, TextField, ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

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

    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState(props.dateStart);
    const [endDate, setEndDate] = React.useState(props.dateEnd);


    const handleStartDate = (date) => {
        setStartDate(date);
    };

    const handleEndDate = (date) => {
        setEndDate(date);
    }

    const API_LINK = process.env.REACT_APP_ENDPOINT_BASE;

    const history = useHistory();

    const createIllness = () => {
        fetch(`${API_LINK}/api/dashboard/create_illness`, {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                return;
            }
            response.json();
        });

        fetch(`${API_LINK}/api/illness/get_active_illness`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
           const activeIllnessId = data.illness.id;

           const payload = {
            'illness_id': activeIllnessId,
            'new_title': `${title}`
            }

            fetch(`${API_LINK}/api/illness/edit_illness`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(data => {
                const {status} = data;
                if (status === 'success') {
                    history.push('/active-illness');
                }
            })
        })
    };

    const updateIllness = () => {
        const id = props.idNum;
        const payload = {
            'illness_id': id,
            'new_title': `${title}`,
            'start_date': `${startDate}`,
            'end_date': `${endDate}`
            }

            fetch(`${API_LINK}/api/illness/edit_illness`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
            .then(data => {
                const {status} = data;
                if (status === 'success') {
                    history.push('/dashboard');
                }
            })
    }

    const classes = useStyles();

    useEffect(() => {
        console.log(title)
        console.log(startDate)
        console.log(endDate)
        console.log(props.idNum)
    }, [title, startDate, endDate, props.id])

    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={2}>
                <Grid container justify='flex-end' >
                    <Grid item><Button className={classes.close} onClick={() => props.onModalChange()}>Close</Button></Grid>
                </Grid>
                <Grid item>
                    <TextField 
                        id="outlined-basic" 
                        onChange={(e) => setTitle(e.target.value)} 
                        defaultValue={props.newIllness ? '' : props.title} 
                        label="Illness Name" 
                        variant="outlined" 
                        fullWidth/>
                        </Grid>
                <Grid item><ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.date}
                            fullWidth
                            label="Start Date"
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin='none'
                            value={props.newIllness ? new Date() : startDate}
                            onChange={handleStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider></Grid>
                {props.newIllness ? null : 
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
                            value={endDate}
                            onChange={handleEndDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider></Grid>
                }

                <Grid container justify='center'>
                    <Grid item><Button className={classes.button} onClick={props.newIllness? createIllness : updateIllness}>Save</Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default IllnessModal;
