import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100vh',
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

const ResultModal = (props) => {
    ResultModal.propTypes = {
        // closeModalFunction: propTypes.func,
        data: propTypes.object,
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={1}>
                <Grid container justify='flex-end'>
                    <Grid item><Button onClick={console.log('clicked')}>x Close</Button></Grid>
                </Grid>
                {/* instead of 0 replace with index taken in from props*/}
                {props.data.surveys[0].answered_questions.map((data, index) => (
                    <Grid item key={index}>
                        <Typography>{'Question: ' + data.title}</Typography>
                        <Typography>{'Answer/s: '}</Typography>
                        {data.choices.map((choices, index) => (
                            <Typography key={index} style={{paddingLeft: '20px'}}>{choices}</Typography>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default ResultModal;
