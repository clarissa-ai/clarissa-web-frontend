import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '.5rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '80vh',
        overflow: 'scroll',
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
}));

const PastIllnessCard = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} justify='space-between' direction='column' alignItems='stretch' alignContent='stretch'> 
            <Grid item>{props.children}</Grid>
    </Grid>
}
export default PastIllnessCard;
