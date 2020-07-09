import React from 'react';
import {Grid, Typography, Box, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        background: '#fff',
    },
    labels: {
        color: '#A6A6A6',
    },
    stats: {
        padding: '1rem',
    }
}));


const StatsCard = (props) => {
    const classes = useStyles();
    return <Grid container direction='row' className={classes.container} justify='center'>
        <Grid item>
            <div className={classes.stats}>
                <Typography variant='h6' style={{color: '#306CDF'}}><Box fontWeight='bold'>{props.illnesscount}</Box></Typography>
                <Typography variant='subtitle2' className={classes.labels}>Illnesses</Typography>
            </div>
        </Grid>

        <Grid item>
            <div className={classes.stats}>
                <Typography variant='h6' style={{color: '#FEAD18'}}><Box fontWeight='bold'>{props.symptomcount}</Box></Typography>
                <Typography variant='subtitle2' className={classes.labels}>Symptoms</Typography>
            </div>
        </Grid>

        <Grid item>
            <div className={classes.stats}>
                <Typography variant='h6' style={{color: '#F46D66'}}><Box fontWeight='bold'>{props.visitcount}</Box></Typography>
                <Typography variant='subtitle2' className={classes.labels}>Doctor Visits</Typography>
            </div>
        </Grid>
    </Grid>
}
export default StatsCard;