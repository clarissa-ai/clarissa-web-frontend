import React from 'react';
import {Grid, AppBar, Toolbar, Link, Button, Typography, useTheme, Paper, GridList, GridListTile, Card, CardHeader, CardContent, Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import svg
import {ReactComponent as Logo} from './Logo.svg';
import {ReactComponent as Illustration1} from './Illustration1.svg';
import {ReactComponent as Illustration2} from './Illustration2.svg';
import {ReactComponent as Illustration3} from './Illustration3.svg';
import {ReactComponent as Illustration4} from './Illustration4.svg';
import {ReactComponent as Laptop} from './Laptop.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background,
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
    buttonLabel: {
        justifyContent: 'start',
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

const Landing = () => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position='absolute' elevation={0} color='transparent'>
                <Toolbar>
                    <Grid container={true} direction='row' justify='center'>
                        <Grid item={true} xs={10}>
                            <Grid container={true} direction='row' justify='space-between'>
                                <Grid item={true}>
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
            <div className={classes.toolbar}/>
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
                    <Grid container={true} direction='column'>
                        <Laptop />
                    </Grid>
                </Grid>
                <Button disableRipple variant='outlined' style={{width: '300px'}} classes={{label: classes.buttonLabel}}>
                    <Checkbox disableRipple></Checkbox>
                    <Typography>This is short</Typography>
                </Button>
            </Grid>
            <Illustration4 />
        </div>
    );
};
export default Landing;
