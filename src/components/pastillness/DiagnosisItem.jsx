import React, {useState, useEffect} from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    activeContainer: {
        borderRadius: '4px',
        background: '#47C594',
        padding: '1rem',
        marginBottom: '.8rem',
        color: '#fff',
    },
    labels: {
        color: '#A6A6A6',
    },
    button: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#8D8D8D',
    },
    activeButton: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#fff',
        color: '#fff',
    },
    linkActive: {
        color: '#fff'
    },
    link: {
        color: '#000',
    },
    labelGreen: {
        color: '#47C594',
    }
}));

const  DiagnosisItem = (props) => {

    return <Grid container direction='row' alignItems='center' justify="space-between" className={classes.container}>
        <Grid item><Typography><Box fontWeight='bold'>{props.title}</Box></Typography></Grid>
    </Grid>
}

export default DiagnosisItem;