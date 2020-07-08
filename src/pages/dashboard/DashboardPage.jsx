import React from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles, Typography, Box, Hidden} from '@material-ui/core';
import StatsCard from 'components/dashboard/StatsCard';
import RecentIllness from 'components/dashboard/RecentIllness';
import CompletedSurveyCard from 'components/dashboard/CompletedSurveyCard';
import TakeSurveyCard from 'components/dashboard/TakeSurveyCard';
import TopBar from 'components/dashboard/TopBar';
import InfoCard from 'components/dashboard/InfoCard';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    container: {
        paddingTop: '6rem',
        background: '#EBEFF2',
        height: '100vh',
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
    <div className={classes.container}>
    <Grid container direction='row' spacing={0} justify='center'>
        <Grid item><TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}}>New Illness</Button></TopBar></Grid>
        <Grid item><ResponsiveDrawer/></Grid>

        <Grid item xs={12} md={6} style={{marginLeft: '1rem'}}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <div className={classes.greetingsContainer}>
                        <Typography variant='h6'><Box fontWeight='bold'>Hey Korra!</Box></Typography>
                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>View and manage your important information here.</Typography>
                    </div>
                </Grid>

                <Grid item>
                    <RecentIllness>
                        <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
                        <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
                        <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
                        <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
                        <Grid item><InfoCard title='Test' date='1/20/20 - 2/01/20' status='Active' symptomcount='36'/></Grid>
                    </RecentIllness>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} md={3} style={{marginLeft: '1rem'}}>
            <Grid container direction='column' spacing={2}>
                <Grid item><StatsCard illnesscount='38' symptomcount='55' visitcount='13'/></Grid>
                <Grid item>
                    <CompletedSurveyCard>
                        <Grid item><InfoCard title='COVID-19 Screening'/></Grid>
                        <Grid item><InfoCard title='COVID-19 Screening'/></Grid>
                    </CompletedSurveyCard>
                </Grid>

                <Grid item>
                    <TakeSurveyCard>
                        <Grid item><InfoCard title='COVID-19 Screening'/></Grid>
                        <Grid item><InfoCard title='COVID-19 Screening'/></Grid>
                    </TakeSurveyCard>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </div>
</Fade>
}
export default DashboardPage;
