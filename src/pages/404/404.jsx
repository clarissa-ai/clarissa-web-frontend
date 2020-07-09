import React from 'react';
import {Grid, Typography, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {ReactComponent as LogoWithName} from 'images/LogoWithName.svg';
import Image from './Image.png';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';

const openLinks = {
    'Login': '/login',
    'Register': '/register',
};

const closedLinks = {
    'Dashboard': '/dashboard',
    'Active Illness': '/active-illness',
    'Past Ilnesses': '/past-illnesses',
    'Medical History': '/medical-history',
    'Health Surveys': '/surveys',
};

const useStyles = makeStyles({
    spacedText: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
});

const PageNotFound = () => {
    const profile = useSelector(profileSelector);
    const activeLinks = profile.authenticated ? closedLinks : openLinks;
    const classes = useStyles();
    return (
        <Grid container={true} direction='column' justify='center' alignContent='center' style={{minWidth: '100vh', minHeight: '100vh'}}>
            <Grid container={true} direction='row' justify='center' alignContent='center'>
                <Grid item={true} xs={6}>
                    <Grid container={true} direction='column' justify='center' alignContent='center'>
                        <Grid container={true} direction='row'>
                            <Grid item={true} xs={3}>
                                <LogoWithName />
                            </Grid>
                        </Grid>
                        <Grid container={true} direction='row' justify='space-evenly' alignContent='center'>
                            <Grid item={true} xs={5}>
                                <Typography className={classes.spacedText} variant='h2' color='textPrimary' style={{fontWeight: 'bold'}}>Oops!</Typography>
                                <Typography variant='h6' color='textSecondary'>{'We can\'t seem to find the page you are looking for.'}</Typography>
                                <Typography className={classes.spacedText} color='textSecondary'>Error code: 404</Typography>
                                <Typography color='textSecondary'>Here are some helpful links instead.</Typography>
                                <Link to='https://clarissa.ai'>Home<br/></Link>
                                {Object.keys(activeLinks).map((key) => <Link key={key} component={RouterLink} to={closedLinks[key]}>{key}<br/></Link>)}
                            </Grid>
                            <Grid item={true} xs={5}>
                                <img src={Image} alt={'Sad boy has a cold.'} style={{width: '100%', height: '100%'}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PageNotFound;
