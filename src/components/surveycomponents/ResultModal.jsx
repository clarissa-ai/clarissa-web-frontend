import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        zIndex: '999',
    },
    formContainer: {
        background: '#fff',
        width: '50%',
        padding: '5%',
        borderRadius: '4px',
    },
    date: {
        background: '#fff',
    },
}));

const ResultModal = (props) => {
    ResultModal.propTypes = {
        closeModalFunction: propTypes.func,
        data: propTypes.object,
        id: propTypes.number,
    };

    const classes = useStyles();

    console.log(props.data);
    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='column' spacing={1}>
                <Grid container justify='flex-end'>
                    <Grid item><Button onClick={props.closeModalFunction}>x Close</Button></Grid>
                </Grid>
                {props.data.answered_questions.map((data, index) => (
                    <Grid item key={index}>
                        <Typography style={{fontWeight: 'bold'}}>{'Question: '}</Typography>
                        <Typography style={{paddingLeft: '20px'}}>{data.title}</Typography>
                        <Typography style={{fontWeight: 'bold'}}>{'Answer/s: '}</Typography>
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
