import React from 'react';
import {Grid, Typography, Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        background: '#fff',
    },
    labels: {
        color: '#A6A6A6',
    }
}));


const StatsCard = (props) => {
    const classes = useStyles();
    return <Grid container direction='row' spacing={5} className={classes.container} justify='center' alignContent='center'>
        <Grid item>
            <Grid container direction='column'>
                <Grid item><Typography variant='h5' style={{color: '#306CDF'}}><Box fontWeight='bold'>{props.illnesscount}</Box></Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.labels}>Illnesses</Typography></Grid>
            </Grid>
        </Grid>

        <Grid item>
            <Grid container direction='column'>
                <Grid item><Typography variant='h5' style={{color: '#FEAD18'}}><Box fontWeight='bold'>{props.symptomcount}</Box></Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.labels}>Symptoms</Typography></Grid>
            </Grid>
        </Grid>

        <Grid item>
            <Grid container direction='column'>
                <Grid item><Typography variant='h5' style={{color: '#F46D66'}}><Box fontWeight='bold'>{props.visitcount}</Box></Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.labels}>Doctor Visits</Typography></Grid>
            </Grid>
        </Grid>
    </Grid>
}
export default StatsCard;