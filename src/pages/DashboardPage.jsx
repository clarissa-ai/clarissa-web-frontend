import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import {Grid, Fade, Button, makeStyles, Typography, Box} from '@material-ui/core';
import StatsCard from 'components/dashboard/StatsCard';
import RecentIllness from 'components/dashboard/RecentIllness';
import CompletedSurveys from 'components/dashboard/CompletedSurveys';
import TakeSurveyCard from 'components/dashboard/TakeSurveyCard';
import TopBar from 'components/navbar/TopBar';
import IllnessCard from 'components/dashboard/IllnessCard';
import SurveyCard from 'components/dashboard/SurveyCard';
import IllnessModal from 'components/dashboard/IllnessModal';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    container: {
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
    toolbar: theme.mixins.toolbar,
}));

const DashboardPage = (props) => {
    // Functions here declared at the top in order to be used for modal state
    const handleModal = () => {
        setModal((showModal) => !showModal);
    };

    const setExistingIllness = (title, startDate, endDate) => {
        setModalTitle(title);
        setModalStartDate(startDate);
        setModalEndDate(endDate);
    };

    const decideModalType = () => {
        if (isModalForNewIllness) {
            return <IllnessModal
            title={modalTitle} 
            dateStart={modalStartDate} 
            dateEnd={modalEndDate}
            newIllness={true} 
            onModalChange={handleModal}
            setModalInfo={setExistingIllness}
            idNum={modalIllnessID}
            rerenderPastIllness={rerenderPastIllness}/>
        } else {
            return <IllnessModal
            title={modalTitle} 
            dateStart={modalStartDate} 
            dateEnd={modalEndDate}
            newIllness={false} 
            onModalChange={handleModal}
            setModalInfo={setExistingIllness}
            idNum={modalIllnessID}
            rerenderPastIllness={rerenderPastIllness}/>
        }
    };

    // Modal Fields for Existing Info
    const [modalTitle, setModalTitle] = useState();
    const [modalStartDate, setModalStartDate] = useState();
    const [modalEndDate, setModalEndDate] = useState();
    const [modalIllnessID, setModalIllnessID] = useState();

    // Modal State
    const [showModal, setModal] = useState(false);
    const [isModalForNewIllness, setModalType] = useState(true);

    // Info State
    const [dashData, setDash] = useState([]);
    const [activeSurveys, setActiveSurveys] = useState([]);
    const [completedSurveys, setCompletedSurveys] = useState([]);
    const [recentIllness, setrecentIllness] = useState([]);
    const [userName, setName] = useState('');

    // Update Past Illness
    const [pastIllnessRender, setPastIllnessRender] = useState(1);

    const rerenderPastIllness = () => {
        setPastIllnessRender(pastIllnessRender + 1);
    }

    //Calculate Bar Height
    const [barHeight, setBarHeight] = useState();

    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const profile = useSelector(profileSelector);
    const classes = useStyles();

    useEffect(()=> {
        if (!profile.authenticated) return;
        fetch(`${apiLink}/api/dashboard/get_dashboard`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then((res) => {
                setDash(res);
                setActiveSurveys(res.active_surveys);
                setCompletedSurveys(res.completed_surveys);
                setrecentIllness(res.recent_illnesses);
            },
            (error) => {
                console.log(error);
            });

        const userInfo = profile.userInfo;
        setName(userInfo.first_name);
    }, [apiLink, profile, modalTitle, pastIllnessRender]);

    const newIllnessModal = (condition) => {
        if (!condition) { // Existing Illness Modal
            setModalType(false);
        } else { // Create new Illness Modal
            setModalType(true);
        }
    };

    const handleModalIllnessID = (num) => {
        setModalIllnessID(num);
    };

    const calcBarHeight = (node) => {
        setBarHeight(node.offsetHeight);
    }

    return (
        <Fade in timeout={500}>
            <div className={classes.container}>
                <TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}} onClick={() => {
                    newIllnessModal(true); setModal(true);
                }}>New Illness</Button></TopBar>
                <div className={classes.toolbar} />
                {showModal ? decideModalType() : null }

                <Grid container direction='row' spacing={0} justify='center' alignItems='stretch' alignContent='stretch' style={{marginTop: barHeight}}>
                    <Grid item>
                        <TopBar ref={(node) => calcBarHeight(node)}>
                            <Button color='primary' variant="contained" style={{textTransform: 'none'}} onClick={() => {
                                newIllnessModal(true); 
                                setModal(true);
                                }}>New Illness</Button>
                        </TopBar>
                    </Grid>

                    <Grid item xs={12} md={6} lg={7} xl={7} style={{marginLeft: '1rem', marginTop: '1rem', height: '80vmin'}}>
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
                                        return <Grid item key={index}>
                                            <IllnessCard
                                                idNum={illness.id}
                                                handleModalIllnessID={handleModalIllnessID}
                                                newIllnessFunction={newIllnessModal}
                                                modalFunction={handleModal}
                                                setModalInfo={setExistingIllness}
                                                key={index}
                                                title={illness.title}
                                                dateStart={illness.created_on}
                                                dateEndOrUpdated={illness.updated_on}
                                                status={illness.active}
                                                symptomcount={illness.symptom_count}
                                            /></Grid>;
                                    })}
                                </RecentIllness>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4} xl={4} style={{marginLeft: '1rem', height: '70vh', marginTop: '2rem'}}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item><StatsCard illnesscount={dashData.illness_count} symptomcount={dashData.symptom_count} visitcount={dashData.response_count}/></Grid>
                            <Grid item>
                                <CompletedSurveys>
                                    {completedSurveys.map((completed_surveys, index) => {
                                        return <Grid item key={index}><SurveyCard key={index} title={completed_surveys.title} status={null} link={`/survey/${completed_surveys.id}`}/></Grid>;
                                    })}
                                </CompletedSurveys>
                            </Grid>

                            <Grid item>
                                <TakeSurveyCard>
                                    {activeSurveys.map((active_surveys, index) => {
                                        return <Grid item key={index}><SurveyCard title={active_surveys.title} link={`/survey/${active_surveys.id}`}/></Grid>;
                                    })}
                                </TakeSurveyCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    );
};
export default DashboardPage;
