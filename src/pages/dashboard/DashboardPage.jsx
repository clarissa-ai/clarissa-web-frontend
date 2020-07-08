import React from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';
import StatsCard from 'components/dashboard/StatsCard';
import RecentIllness from 'components/dashboard/RecentIllness';
import CompletedSurveyCard from 'components/dashboard/CompletedSurveyCard';
import TakeSurveyCard from 'components/dashboard/TakeSurveyCard';
import TopBar from 'components/dashboard/TopBar';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    container: {
        paddingLeft: '17rem',
        height: '100vh',
        background: '#EBEFF2',
        padding: '1rem',
        marginTop: '4rem',
    },
    greetingsContainer: {
        background: '#306CDF',
        padding: '1rem 3rem',
        borderRadius: '4px',
        color: '#fff',
    },
  }));

const DashboardPage = (props) => {
    const classes = useStyles();

    return <Fade in timeout={1000}>
    <Grid container className={classes.container}>
        <Grid item><TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}}>New Illness</Button></TopBar></Grid>
        <Grid item>
            <div className={classes.greetingsContainer}>
                <Typography variant='h5'><Box fontWeight='bold'>Hey Korra!</Box></Typography>
                <Typography variant='subtitle2' style={{opacity: '0.7'}}>View and manage your important information here.</Typography>
            </div>
        </Grid>
        <Grid item>
            <ResponsiveDrawer/>
        </Grid>
        <Grid item><RecentIllness/></Grid>
        <Grid item><StatsCard illnesscount='38' symptomcount='55' visitcount='13'/></Grid>

    </Grid>
</Fade>
}
export default DashboardPage;
