import React, {/* useState,*/ useEffect} from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles} from '@material-ui/core';
import SymptomLog from 'components/activeillness/SymptomLog';
// import SymptomTile from 'components/activeillness/SymptomTile';
import TopBar from 'components/dashboard/TopBar';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    container: {
        paddingTop: '6rem',
        background: '#EBEFF2',
        height: '100vmin',
    },
    greetingsContainer: {

    },
}));

const DashboardPage = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    /* const [dashData, setDash] = useState([]);
    const [recentIllness, setrecentIllness] = useState([]);
    const [userName, setName] = useState(''); */

    const profile = useSelector(profileSelector);

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
                /* setDash(res);*/
            },
            (error) => {
                console.log(error);
            });

        // const userInfo = profile.userInfo;
        /* setName(userInfo.first_name);*/
    }, [apiLink, profile]);

    console.log(profile.authenticated);
    return (
        !profile.authenticated ? <Redirect to='/login' /> :
            <Fade in timeout={1000}>
                <div className={classes.container}>
                    <Grid container direction='row' spacing={0} justify='center' alignItems='stretch' alignContent='stretch'>
                        <Grid item><TopBar><Button color='primary' variant="contained" style={{textTransform: 'none'}}>New Illness</Button></TopBar></Grid>
                        <Grid item><ResponsiveDrawer/></Grid>

                        <Grid item xs={12} md={9} xl={7}>
                            <Grid container direction='column' spacing={2}>
                                <Grid item>
                                    <div className={classes.greetingsContainer}>
                                        <SymptomLog/>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={4} xl={3}>
                            <Grid container direction='column' spacing={2}>
                                <Grid item style={{height: '60vmin'}} >

                                </Grid>

                                <Grid item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
    );
};
export default DashboardPage;
