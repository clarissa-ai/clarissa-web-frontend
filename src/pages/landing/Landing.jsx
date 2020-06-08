import React, { useState } from 'react';
import {Grid, AppBar, Toolbar, Link, Button, Typography, useTheme, Paper, GridList, GridListTile, Card, CardHeader, CardContent, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {ArrowRightAlt} from '@material-ui/icons';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import svg
import {ReactComponent as Logo} from './Logo.svg';
import {ReactComponent as Illustration1} from './Illustration1.svg';
import {ReactComponent as Illustration2} from './Illustration2.svg';
import {ReactComponent as Illustration3} from './Illustration3.svg';
import {ReactComponent as Laptop} from './Laptop.svg';
import {ReactComponent as Magnify} from './Magnify.svg';
import {ReactComponent as Monitor} from './Monitor.svg';
import {ReactComponent as Book} from './Book.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background,
    },
    surveyBar: {
        backgroundColor: 'red',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
    },
    appbar: {
        paddingTop: theme.spacing(2),
    },
    toolbar: {
        paddingTop: theme.spacing(2),
        ...theme.mixins.toolbar,
    },
    appbarLinks: {
        margin: theme.spacing(2),
    },
    appbarButtons: {
        margin: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: 35,
        textTransform: 'none',
    },
    landingButtons: {
        color: 'white',
        textTransform: 'none',
    },
    landingRows: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
    landingCards: {
        backgroundColor: 'white',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    featuresRow: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    featuresTitle: {
        marginBottom: theme.spacing(4),
    },
}));

const NavLink = (props) => {
    const classes = useStyles();
    return (
        <Link className={classes.appbarLinks} component={RouterLink} underline='none' to={props.to}>{props.children}</Link>
    );
};

NavLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

const NavButton = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.appbarButtons} size='small' variant='outlined' style={{borderRadius: 35, color: props.color, borderColor: props.color}}>{props.children}</Button>
    );
};

NavButton.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
};

const LandingButton = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.landingButtons} disableElevation={true} size='large' variant='contained' style={{borderRadius: 65, backgroundColor: props.color}}>{props.children}</Button>
    );
};

LandingButton.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string.isRequired,
};

const LandingCards = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Card className={classes.landingCards} elevation={8}>
            <CardContent style={{textAlign: 'center'}}>
                <Typography style={{color: props.color, marginTop: theme.spacing(.5), marginBottom: theme.spacing(.5)}} variant='h4'>{props.heading}</Typography>
                <Typography style={{color: 'black'}} variant='h6'>Stay hydrated and well rested. Over the counter products can help alleviate symptoms.</Typography>
                <Grid container={true} direction='row' alignItems='center' alignContent='center' justify='center' style={{marginTop: theme.spacing(2)}}>
                    <Grid item>
                        <Typography style={{color: props.color}} variant='h6'>Learn More</Typography>
                    </Grid>
                    <Grid item>
                        <ArrowRightAlt style={{color: props.color, marginTop: theme.spacing(1)}} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

LandingCards.propTypes = {
    color: PropTypes.string,
    heading: PropTypes.string,
};

const FeatureBadge = (props) => {
    return (
        <svg width="50" height="50" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle opacity="0.15" cx="37.5" cy="37.5" r="37.5" fill={props.color}/>
                <text x="50%" y="72%" fill={props.color} textAnchor="middle" fontFamily="Poppins" fontSize="3em">{props.number}</text>
            </g>
        </svg>
    );
};

FeatureBadge.propTypes = {
    color: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

const Landing = () => {
    const [mainSurvey, setMainSurvey] = useState(true);
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {mainSurvey && <div className={classes.surveyBar}>
                <Link component={RouterLink} to='/covid19' underline='none'>
                    <Typography className={classes.surveyBar}>Covid-19 Screening Tool now available for free. Click here to get started.</Typography>
                </Link>
            </div>}
            <AppBar className={classes.appbar} position='relative' elevation={0} color='transparent'>
                <Toolbar>
                    <Grid container={true} direction='row' alignItems='center' justify='center'>
                        <Grid item={true} xs={10}>
                            <Grid container={true} direction='row' justify='space-between'>
                                <Grid item={true} xs={1}>
                                    <Logo/>
                                </Grid>
                                <Grid item={true}>
                                    <NavLink to='/'>Home</NavLink>
                                    <NavLink to='/features'>Features</NavLink>
                                    <NavLink to='/diagnosis'>Diagnosis</NavLink>
                                    <NavLink to='/us'>Our Team</NavLink>
                                    <NavButton color={theme.palette.error.main}>Register</NavButton>
                                    <NavButton color={theme.palette.primary.main}>Login</NavButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <div className={classes.toolbar}/> */}
            <Grid container={true} direction='column' alignItems='center' justify='space-between'>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <Grid container={true} direction='row' alignItems='center' justify='center' spacing={10}>
                        <Grid item={true} xs={5}>
                            <Typography color='textPrimary' variant='h4'>Clarissa</Typography>
                            <Typography color='textSecondary' variant='h3'>Your Personal Intelligent Medical Companion</Typography>
                            <Typography variant='h6' style={{marginTop: theme.spacing(4), marginBottom: theme.spacing(2)}}>Personalized health tracking powered by AI, with no hidden fees.</Typography>
                            <LandingButton color={theme.palette.success.main}><Typography variant='h6'>Ask Clarissa</Typography></LandingButton>
                        </Grid>
                        <Grid item={true}>
                            <Illustration1 />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <Grid container={true} direction='row' alignItems='center' justify='center' spacing={10}>
                        <Grid item={true}>
                            <Illustration2 />
                        </Grid>
                        <Grid item={true} xs={5}>
                            <Typography color='primary' variant='h5'>Why?</Typography>
                            <Typography color='textPrimary' variant='h3'>Clarissa</Typography>
                            <Typography variant='h6' style={{marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}}>Clarissa is designed to be at your side whenever you need her. She uses natural language processing to find out what you are really feeling, helps track your systems, give recommendations on you diagnosis, and connects you to a doctor near you.</Typography>
                            <LandingButton color={theme.palette.primary.main}><Typography variant='h6'>Learn More</Typography></LandingButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <div style={{textAlign: 'center'}}>
                        <Typography color='error' variant='h4'>Natural Speech</Typography>
                        <Typography color='primary' variant='h3'>Say Goodbye to Forms!</Typography>
                        <Grid container={true} direction='row' alignItems='center' justify='center'>
                            <Grid item={true} xs={5}>
                                <Typography>Just tell Clarissa how you are feeling and get health recommendations, and she will automatically track the symptoms for you.</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container={true} direction='row' alignItems='center' justify='space-between' style={{marginTop: theme.spacing(4)}}>
                        <Grid item={true} xs={9} style={{padding: 0}}>
                            <Paper elevation={6} style={{backgroundColor: 'white', padding: 0}}>
                                <Typography variant='h6' style={{color: 'black', padding: theme.spacing(1)}}>I have a cough, a sore throat, and body aches.</Typography>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={1}>
                            <Button variant='contained' size='large' style={{backgroundColor: theme.palette.success.main}}><Typography variant='h6' className={classes.landingButtons}>Evaluate!</Typography></Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item={true} xs={12} style={{marginBottom: theme.spacing(10)}}>
                    <Grid container={true} direction='row' alignItems='center' justify='center'>
                        <Grid item={true} xs={3}>
                            <LandingCards color={theme.palette.text.primary} heading='Common Cold' />
                        </Grid>
                        <Grid item={true} xs={3}>
                            <LandingCards color={theme.palette.info.main} heading='Seasonal Flu' />
                        </Grid>
                        <Grid item={true} xs={3}>
                            <LandingCards color={theme.palette.error.main} heading='Strep Throat' />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <div style={{textAlign: 'center'}}>
                        <Typography color='error' variant='h4'>Identifying</Typography>
                        <Typography variant='h3' style={{color: 'black'}}>Symptoms</Typography>
                        <Grid container={true} direction='row' alignItems='center' justify='center'>
                            <Grid item={true} xs={7}>
                                <Typography>Clarissa will make sure that you can easily identify the symptoms that are bothering you, and tell you what they mean.</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Illustration3 />
                </Grid>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <div style={{textAlign: 'center'}}>
                        <Typography color='error' variant='h4'>How?</Typography>
                        <Typography variant='h3' style={{color: 'black'}}>What can Clarissa Do?</Typography>
                        <Grid container={true} direction='row' alignItems='center' justify='center'>
                            <Grid item={true} xs={7}>
                                <Typography>You know my name, but you have no idea what I can do!</Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container={true} direction='column' alignItems='center'>
                        <Grid className={classes.featuresRow} container={true} direction='row' alignItems='center' justify='space-evenly'>
                            <Grid item={true} xs={4}>
                                <Grid container={true} direction='row' justify='space-evenly'>
                                    <Grid item>
                                        <FeatureBadge color={theme.palette.info.main} number='01' />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography className={classes.featuresTitle} variant='h4'>Symptom Tracking</Typography>
                                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue dolor at lacus tempor vulputate. Etiam et dui vel augue convallis posuere sit amet nec tellus. Nunc in nunc diam. Aliquam vestibulum, urna ut fermentum elementum, sapien nisi lacinia felis, non imperdiet nisi sapien vitae enim.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item={true}>
                                <Laptop />
                            </Grid>
                        </Grid>
                        <Grid className={classes.featuresRow} container={true} direction='row' alignItems='center' justify='space-evenly'>
                            <Grid item={true}>
                                <Magnify />
                            </Grid>
                            <Grid item={true} xs={4}>
                                <Grid container={true} direction='row' justify='space-evenly'>
                                    <Grid item>
                                        <FeatureBadge color={theme.palette.secondary.main} number='02' />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography className={classes.featuresTitle} variant='h4'>{'Analysis & Diagnosis'}</Typography>
                                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue dolor at lacus tempor vulputate. Etiam et dui vel augue convallis posuere sit amet nec tellus. Nunc in nunc diam. Aliquam vestibulum, urna ut fermentum elementum, sapien nisi lacinia felis, non imperdiet nisi sapien vitae enim.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.featuresRow} container={true} direction='row' alignItems='center' justify='space-evenly'>
                            <Grid item={true} xs={4}>
                                <Grid container={true} direction='row' justify='space-evenly'>
                                    <Grid item>
                                        <FeatureBadge color={theme.palette.error.main} number='03' />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography className={classes.featuresTitle} variant='h4'>Connect You to a Doctor</Typography>
                                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue dolor at lacus tempor vulputate. Etiam et dui vel augue convallis posuere sit amet nec tellus. Nunc in nunc diam. Aliquam vestibulum, urna ut fermentum elementum, sapien nisi lacinia felis, non imperdiet nisi sapien vitae enim.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item={true}>
                                <Monitor />
                            </Grid>
                        </Grid>
                        <Grid className={classes.featuresRow} container={true} direction='row' alignItems='center' justify='space-evenly'>
                            <Grid item={true}>
                                <Book />
                            </Grid>
                            <Grid item={true} xs={4}>
                                <Grid container={true} direction='row' justify='space-evenly'>
                                    <Grid item>
                                        <FeatureBadge color={theme.palette.primary.main} number='04' />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography className={classes.featuresTitle} variant='h4'>Keep Track of Your History</Typography>
                                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue dolor at lacus tempor vulputate. Etiam et dui vel augue convallis posuere sit amet nec tellus. Nunc in nunc diam. Aliquam vestibulum, urna ut fermentum elementum, sapien nisi lacinia felis, non imperdiet nisi sapien vitae enim.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.landingRows} item={true} xs={10}>
                    <Grid container={true} direction='row' alignItems='center' justify='space-evenly'>
                        <Typography>{'2020 © All rights reserved by clarissa.ai'}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
export default Landing;
