import React, { Children } from 'react';
import {Grid, Paper, Typography, makeStyles, Box} from '@material-ui/core';
import InfoCard from 'components/dashboard/InfoCard';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        background: '#fff',
    },
    labels: {
        margin: '1rem',
    }
}));

const RecentIllness = (props) => {
    const classes = useStyles();
    return <Paper className={classes.container} > <Grid item><Typography variant='h6' className={classes.labels}><Box fontWeight='bold'>Recent Illness</Box></Typography></Grid>
        <Grid container direction='column' spacing={3}>
            {/* {Children} */}
            <Grid item>
           <InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/>
            <InfoCard title='Test' date='1/20' status='Active' symptomcount='36'/>
            <InfoCard title='Test' date='1/20' status='Active' symptomcount='36'/>
            </Grid>
        </Grid>
    </Paper>
}
export default RecentIllness;
