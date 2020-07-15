import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';
import StatsCard from 'components/dashboard/StatsCard';
import RecentIllness from 'components/dashboard/RecentIllness';
import CompletedSurveyCard from 'components/dashboard/CompletedSurveyCard';
import TakeSurveyCard from 'components/dashboard/TakeSurveyCard';
import TopBar from 'components/navbar/TopBar';
import InfoCard from 'components/dashboard/InfoCard';
import { useHistory, Redirect } from 'react-router-dom';

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
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        background: '#306CDF',
        padding: '1rem 3rem',
        borderRadius: '4px',
        color: '#fff',
    },
}));

const DashboardPage = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [dashData, setDash] = useState([]);
    const [activeSurveys, setActiveSurveys] = useState([]);
    const [completedSurveys, setCompletedSurveys] = useState([]);
    const [recentIllness, setrecentIllness] = useState([]);
    const [userName, setName] = useState('');
    const history = useHistory();

    const profile = useSelector(profileSelector);

    useEffect(()=> {
        if (!profile.authenticated) return;
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

            const userInfo = profile.userInfo;
            setName(userInfo.first_name);
    }, [apiLink, profile])

    const createNewIllness = (event) => {
        fetch(`${apiLink}/api/dashboard/create_illness`, {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                console.log('Internal Error. Please contact support.');
                return;
            }
            response.json().then((data) => {
                const {status} = data;
                if (status === 'success') {
                    history.push('/active-illness');
                }
            });
        });
    };

    return (
        !profile.authenticated ? <Redirect to='/login' /> :
            <Fade in timeout={1000}>
                <div className={classes.container}>
                    <Grid container direction='row' spacing={0} justify='center' alignItems='stretch' alignContent='stretch'>
                        <Grid item><TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}} onClick={createNewIllness}>New Illness</Button></TopBar></Grid>
                        {/* <Grid item><ResponsiveDrawer/></Grid> */}

                        <Grid item xs={12} md={6} xl={7} style={{marginLeft: '1rem'}}>
                            <Grid container direction='column' spacing={2}>
                                <Grid item>
                                    <div className={classes.greetingsContainer}>
                                        <Typography variant='h6'><Box fontWeight='bold'>Hey {userName}!</Box></Typography>
                                        <Typography variant='subtitle2' style={{opacity: '0.7'}}>View and manage your important information here.</Typography>
                                    </div>
                                </Grid>

                                <Grid item>
                                    <RecentIllness >
                                        {recentIllness.map((illness, index) => {
                                            return <Grid item><InfoCard key={index} title='' date={`${illness.created_on} - ${illness.updated_on}`} status={illness.active} symptomcount={illness.symptom_count} link={illness.active ? '/active-illness' : '/past-illnesses'} /></Grid>
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
                                        return <Grid item><InfoCard key={index} title={completed_surveys.title} status={null} link={`/survey/${completed_surveys.id}`}/></Grid>
                                    })}
                                    </CompletedSurveyCard>
                                </Grid>

                                <Grid item>
                                    <TakeSurveyCard>
                                        {activeSurveys.map((active_surveys, index) => {
                                            return <Grid item key={index}><InfoCard title={active_surveys.title} link={`/survey/${active_surveys.id}`}/></Grid>
                                        })}
                                    </TakeSurveyCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
    );
}
export default DashboardPage;
