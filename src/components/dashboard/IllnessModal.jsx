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
        zIndex: '1000',
        position: 'fixed',
        background: 'rgb(0, 0, 0, 0.2)',
        width: '100%',
        height: '100%',
    },
    formContainer: {
        background: '#fff',
        width: '30vw',
        padding: '2rem',
        borderRadius: '4px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: '2rem',

    },
    date: {
        background: '#fff',
        fontFamily: 'Poppins',
        zIndex: '9999',
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
        backgroundColor: 'rgb(244, 109, 102)',
        color: '#fff',
        margin: '8px',
    },
}));

const IllnessModal = (props) => {
    const [title, setTitle] = React.useState(props.title);
    const [startDate, setStartDate] = React.useState(props.dateStart);
    const [endDate, setEndDate] = React.useState(props.dateEnd);


    const handleStartDate = (date) => {
        setStartDate(date.toISOString());
    };

    const handleEndDate = (date) => {
        setEndDate(date.toISOString());
    };

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
        }).then(
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
               let validStartDate = startDate;
                if (!startDate) {
                    validStartDate = new Date();
                }
                let validTitle = title;
                if(!title) {
                    validTitle = 'Untitled Illness'
                }
               const payload = {
                'illness_id': activeIllnessId,
                'new_title': validTitle,
                'startDate': new Date(validStartDate).toISOString()
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
        )
    };

    const updateIllness = () => {
        const id = props.idNum;
        const payload = {
            'illness_id': id,
            'new_title': `${title}`,
            'start_date': new Date(startDate).toISOString(),
            'end_date': new Date(endDate).toISOString()
            }

        fetch(`${API_LINK}/api/illness/edit_illness`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                const {status} = data;
                if (status === 'success') {
                    props.rerenderPastIllness(); //Rerender Recent Illness Component
                    props.onModalChange(); //Close Modal
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const classes = useStyles();

    useEffect(() => {
        console.log(title);
        console.log(startDate);
        console.log(endDate);
        console.log(props.idNum);
    }, [title, startDate, endDate, props.id, props.idNum]);

    return (
        <Grid container className={classes.container} justify='center' alignItems='center' alignContent='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={2}>
                <Grid container justify='flex-end' >
                    <Grid item><Button variant='contained' className={classes.close} onClick={() => props.onModalChange()}>Close</Button></Grid>
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
