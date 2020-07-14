import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '35rem',
        width: '25rem',
        overflow: 'scroll',
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
}));

const PastSymptomCard = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} justify='center' direction='column'> 
            <Grid item>{props.children}</Grid>
        </Grid>
}
export default PastSymptomCard;
