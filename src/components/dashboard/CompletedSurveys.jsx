import React from 'react';
import {Grid, Typography, Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        background: '#fff',
    },
    label: {
        paddingBottom: '1rem',
    },
}));

const CompletedSurveys = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} direction='column'>
        <Grid item><Typography variant='h6' className={classes.label}><Box fontWeight='bold'>Completed Surveys</Box></Typography></Grid>
        <Grid item>{props.children}</Grid>
    </Grid>
}
export default CompletedSurveys;
