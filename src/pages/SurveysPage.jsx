import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import MainSurvey from 'components/surveycomponents/MainSurvey';
import {Fade, Grid, Typography, Tab, makeStyles, Box, Tabs, Button} from '@material-ui/core';
import ActiveSurveys from 'components/surveycomponents/ActiveSurveys';
import ResultCard from 'components/surveycomponents/ResultCard';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import ScreeningStart from 'components/misc/survey/ScreeningStart';
import ResultModal from 'components/surveycomponents/ResultModal';
import TopBar from 'components/navbar/TopBar';
const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
    },
    tabBorder: {
        backgroundColor: 'transparent',
    },
    tabs: {
        fontWeight: 'bold',
    },
    content: {
        width: '80vw',
        padding: ' 1em 4em',
    },
}));


const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const SurveysPage = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [showMain, setMain] = React.useState(true);
    const [showSurvey, setShowSurvey] = React.useState([false, 0]);
    const [showModal, setModal] = React.useState([false, {}]);

    const profile = useSelector(profileSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.wrapper}>
            <Fade in timeout={1000}>
                <Grid container direction='row' justify='center'>
                    {showModal[0] ?
                        <div>
                            <ResultModal data={showModal[1]} closeModalFunction={() => setModal([false, 0])}/>
                        </div>:
                        null}
                    <Grid item><ResponsiveDrawer/></Grid>
                    <Grid item className={classes.content}>
                        {showSurvey ? (showSurvey[0] ?
                            <div>
                                <Grid item>
                                    <TopBar>
                                        <Button color='primary' variant="contained" style={{textTransform: 'none'}} onClick={() => setShowSurvey([false, 0])}>
                                        Close
                                        </Button>
                                    </TopBar>
                                    <ScreeningStart id={showSurvey[1]} email={profile.userInfo.email}/>
                                </Grid>
                            </div>:
                            null) : null}
                        {showMain && (!showSurvey[0]) ?
                            <div>
                                <Typography variant='h5' style={{padding: '2rem 0'}}><Box fontWeight='bold'>Featured</Box></Typography>
                                <MainSurvey surveyClick={setShowSurvey}/>
                            </div> : null}
                        { (!showSurvey[0]) ?
                            <Tabs value={value} onChange={handleChange} classes={{indicator: classes.tabBorder}}>
                                <Tab label={<p className={classes.tabs}>Active Surveys</p>} onClick={() => setMain(true)}/>
                                <Tab label={<p className={classes.tabs}>Survey Results</p>} onClick={() => setMain(false)}/>
                            </Tabs> : null }
                        { (!showSurvey[0]) ?
                            <TabPanel value={value} index={0}>
                                <ActiveSurveys surveyClick={setShowSurvey}/>
                            </TabPanel> : null }

                        <TabPanel value={value} index={1}>
                            <ResultCard setModal={setModal}/>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Fade>
        </div>
    );
};

export default SurveysPage;
