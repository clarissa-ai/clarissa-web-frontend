import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '.5rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '71vh',
        overflow: 'scroll',
    },
    greenText: {
        color: '#47C594',
        padding: '.5rem',
    }
}));

const PastIllnessCard = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} justify='space-between' direction='column'>
            <Grid item>
                {/* <Typography variant='h5' className={classes.greenText}>Past Illnesses</Typography> */}
                {props.children}
            </Grid>
    </Grid>
}
export default PastIllnessCard;
