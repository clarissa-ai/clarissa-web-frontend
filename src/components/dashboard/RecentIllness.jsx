import React, { Children } from 'react';
import {Grid, Paper, Typography, makeStyles, Box} from '@material-ui/core';
import InfoCard from 'components/dashboard/InfoCard';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
    },
    infoarea: {
        padding: '1rem',
    },
    labels: {
        margin: '1rem',
    }
}));

const RecentIllness = (props) => {
    const classes = useStyles();
    return <Paper className={classes.container} > <Grid item><Typography variant='h6' className={classes.labels}><Box fontWeight='bold'>Recent Illness</Box></Typography></Grid>
        <Grid container direction='column' spacing={4} className={classes.infoarea}>
            {/* {Children} */}
            <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
            <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
            <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
        </Grid>
    </Paper>
}
export default RecentIllness;
