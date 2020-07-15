import React from 'react';
import {Grid, Typography, makeStyles, Box, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '.5rem',
        paddingTop: '15rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '45rem',
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
    return <Grid container className={classes.container} justify='center' direction='column' alignItems='stretch' alignContent='stretch'> 
            <Grid item>{props.children}</Grid>
    </Grid>
}
export default PastIllnessCard;
