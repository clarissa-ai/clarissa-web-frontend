import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
// import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, makeStyles, Typography} from '@material-ui/core';
import SymptomLog from 'components/activeillness/SymptomLog';
import SymptomTile from 'components/activeillness/SymptomTile';
import EndIllnessButton from 'components/activeillness/EndIllnessButton';
import ExportIllnessButton from 'components/activeillness/ExportIllnessButton';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: '3rem',
        background: '#EBEFF2',
        height: '100vmin',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
        margin: 0,
        paddingBottom: '0.5rem',
    },
}));

const DashboardPage = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [symptoms, setSymptoms] = useState([]);
    const [render, setRender] = useState(0);
    /* const [symptomModal, showSymptomModal] = useState(false); */

    /* const symptomModalShow = () => {
        showSymptomModal(true);
        console.log(symptomModal);
    }; */

    /* const symptomModalClose = () => {
        showSymptomModal(false);
        console.log(symptomModal);
    }; */

    const profile = useSelector(profileSelector);

    const incrState = () => {
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
            },
            (error) => {
                console.log(error);
            });
    }, [apiLink, profile]);

    return (
        !profile.authenticated ? <Redirect to='/login' /> :
            <Fade in timeout={1000}>
                <div className={classes.container}>
                    <Grid container direction='row' spacing={0} justify='center' alignItems='stretch' alignContent='stretch'>
                        {/* <Grid item><ResponsiveDrawer/></Grid> */}

                        <Grid item xs={12} md={9} xl={8}>
                            <Grid container direction='column' spacing={2}>
                                <Typography className={classes.title}>
                                    Tell Clarissa how you are feeling.
                                    <Grid container justify='flex-end' direction='row'>
                                        <Grid item style={{marginRight: '1rem'}}>
                                            <ExportIllnessButton/>
                                        </Grid>
                                        <Grid item style={{marginRight: '0.5rem'}}>
                                            <EndIllnessButton incrState={() => incrState()}/>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Grid item className={classes.greetingsContainer}>
                                    <SymptomLog incrState={() => incrState()}/>
                                </Grid>
                                <Grid item style={{height: '0vmin'}}>
                                    <Grid style={{height: '55vmin', width: '50%'}}>
                                        <Typography className={classes.title}>Symptoms</Typography>
                                        <SymptomTile symptoms={symptoms}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
    );
};
export default DashboardPage;
