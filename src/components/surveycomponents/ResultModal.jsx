import React from 'react';
import {Button, Grid, makeStyles, Typography} from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.4)',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        height: '100%',
        zIndex: '999',
    },
    formContainer: {
        background: '#fff',
        width: '50%',
        padding: '2%',
        borderRadius: '4px',
        height: '70%',
    },
    date: {
        background: '#fff',
    },
    cardContent: {
        'overflow': 'auto',
        'height': '85%',
        'width': '100%',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#C0C0C0',
            borderRadius: '2em',
        },
    },
}));

const ResultModal = (props) => {
    ResultModal.propTypes = {
        closeModalFunction: propTypes.func,
        data: propTypes.object,
        id: propTypes.number,
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.container} justify='center' alignItems='center'>
            <Grid container className={classes.formContainer} direction='row' spacing={1}>
                <Grid container justify='flex-end'>
                    <Grid item><Button onClick={props.closeModalFunction}>x Close</Button></Grid>
                </Grid>
                <div className={classes.cardContent}>
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
                </div>
            </Grid>
        </Grid>
    );
};
export default ResultModal;
