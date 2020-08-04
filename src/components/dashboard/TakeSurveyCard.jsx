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

const TakeSurveyCard = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} direction='column'>
        <Grid item><Typography variant='h6'><Box fontWeight='bold' className={classes.label}>Take a Survey</Box></Typography></Grid>
        <Grid item>{props.children}</Grid>
    </Grid>;
};
export default TakeSurveyCard;
