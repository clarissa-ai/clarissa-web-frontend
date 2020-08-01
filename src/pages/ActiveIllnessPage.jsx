import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import {Grid, Fade, makeStyles, Typography} from '@material-ui/core';
import SymptomLog from 'components/activeillness/SymptomLog';
import SymptomTile from 'components/activeillness/SymptomTile';
import EndIllnessButton from 'components/activeillness/EndIllnessButton';
import ExportIllnessButton from 'components/activeillness/ExportIllnessButton';
import {Redirect} from 'react-router-dom';
import ActiveAnalysis from 'components/activeillness/activeanalysis/ActiveAnalysis';
import SymptomModal from 'components/activeillness/SymptomModal';
import TopBar from 'components/navbar/TopBar';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
    },
    container: {
        paddingTop: '0.5rem',
        background: '#EBEFF2',
        minHeight: '100vh',
        height: '100%',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        marginRight: 'auto',
        paddingBottom: '0.5rem',
    },
    toolbar: theme.mixins.toolbar,
}));

const DashboardPage = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [symptoms, setSymptoms] = useState([]);
    const [analysis, setAnalysis] = useState(undefined);
    const [render, setRender] = useState(0);
    const [showModal, setModal] = useState([false, {}]);

    const profile = useSelector(profileSelector);

    const incrstate = () => {
        setRender(render + 1);
        fetch(`${apiLink}/api/illness/get_active_illness`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then((res) => {
                setSymptoms(res.illness.symptoms);
                setAnalysis(res.illness.analysis);
            },
            (error) => {
                console.log(error);
            });
    };

    useEffect(()=> {
        if (!profile.authenticated) return;
        fetch(`${apiLink}/api/illness/get_active_illness`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then((res) => {
                setSymptoms(res.illness.symptoms);
                setAnalysis(res.illness.analysis);
            },
            (error) => {
                console.log(error);
            });
    }, [apiLink, profile]);

    return (
        !profile.authenticated ? <Redirect to='/login' /> :
            <div className={classes.wrapper}>
                {showModal[0] ?
                    <div>
                        <SymptomModal data={showModal[1]} closeModalFunction={() => setModal([false, 0])} incrstate={() => incrstate()}/>
                    </div>:
                    null}
                <Fade in timeout={500}>
                    <div className={classes.container}>
                        <TopBar>
                            <ExportIllnessButton/>
                            <EndIllnessButton incrstate={() => incrstate()}/>
                        </TopBar>
                        <div className={classes.toolbar} />
                        <Grid container direction='row' spacing={0} justify='center' alignItems='stretch' alignContent='stretch'>
                            <Grid item xs={12} md={9} xl={8}>
                                <Grid container direction='column' spacing={2} justify='center' alignItems='stretch' alignContent='stretch's>
                                    <Grid item className={classes.greetingsContainer}>
                                        <SymptomLog incrstate={() => incrstate()}/>
                                    </Grid>
                                    <Grid item style={{height: '0vmin'}}>
                                        <Grid container direction='row' spacing={2} justify='center' alignItems='stretch' alignContent='stretch'>
                                            <Grid item style={{width: '50%'}}>
                                                <Typography className={classes.title}>Symptoms</Typography>
                                                <SymptomTile symptoms={symptoms} setModal={setModal}/>
                                            </Grid>
                                            <Grid item style={{width: '50%'}}>
                                                <Typography className={classes.title}>Analysis</Typography>
                                                <ActiveAnalysis analysis={analysis}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </div>
    );
};
export default DashboardPage;
