import React, {useState, useEffect} from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';
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
    illnessContainer: {
        minHeight: '100%',
    },
}));

const DashboardPage = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [dashData, setDash] = useState([]);
    const [userName, setName] = useState('There');
    const [activeSurveys, setActiveSurveys] = useState([]);
    const [completedSurveys, setCompletedSurveys] = useState([]);
    const [recentIllness, setrecentIllness] = useState([]);


    useEffect(()=> {
        fetch(`${apiLink}/api/dashboard/get_dashboard`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },})
        .then(res => res.json())
        .then(res => {
                setDash(res);
                setActiveSurveys(res.active_surveys);
                setCompletedSurveys(res.completed_surveys);
                setrecentIllness(res.recent_illnesses);
        },
        (error) => {
                console.log(error);
        },);
    }, [apiLink])
    

    return <Fade in timeout={1000}>
    <div className={classes.container}>
    <Grid container direction='row' spacing={0} justify='center'>
        <Grid item><TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}}>New Illness</Button></TopBar></Grid>
        <Grid item><ResponsiveDrawer/></Grid>

        <Grid item xs={12} md={6} xl={7} style={{marginLeft: '1rem'}}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <div className={classes.greetingsContainer}>
                        <Typography variant='h6'><Box fontWeight='bold'>Hey {userName}!</Box></Typography>
                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>View and manage your important information here.</Typography>
                    </div>
                </Grid>

                <Grid item>
                    <RecentIllness className={classes.illnessContainer}>
                        {recentIllness.map((illness, index) => {
                            console.log(illness)
                            return <Grid item><InfoCard title='' date={`${illness.created_on} - ${illness.updated_on}`} status={illness.active} symptomcount={illness.symptom_count}/></Grid>
                        })}
                    </RecentIllness>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} md={3} xl={3}style={{marginLeft: '1rem'}}>
            <Grid container direction='column' spacing={2}>
                <Grid item><StatsCard illnesscount={dashData.illness_count} symptomcount={dashData.symptom_count} visitcount={dashData.response_count}/></Grid>
                <Grid item>
                    <CompletedSurveyCard>
                        {completedSurveys.map((completed_surveys, index) => {
                        return <Grid item><InfoCard title={completed_surveys.title}/></Grid>
                    })}
                    </CompletedSurveyCard>
                </Grid>

                <Grid item>
                    <TakeSurveyCard>
                        {activeSurveys.map((active_surveys, index) => {
                            return <Grid item key={active_surveys.id}><InfoCard title={active_surveys.title}/></Grid>
                        })}
                    </TakeSurveyCard>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    </div>
</Fade>
}
export default DashboardPage;