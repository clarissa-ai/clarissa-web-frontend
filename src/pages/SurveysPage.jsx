import React from 'react';
import PropTypes from 'prop-types';
import MainSurvey from 'components/surveycomponents/MainSurvey';
import {Fade, Grid, Typography, Tab, makeStyles, Box, Tabs} from '@material-ui/core';
import ActiveSurveys from 'components/surveycomponents/ActiveSurveys';
import ResultCard from 'components/surveycomponents/ResultCard';
// import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import ResultModal from 'components/surveycomponents/ResultModal';
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
        // width: '100vw',
        // padding: ' 1em 4em',
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
    const [showModal, setModal] = React.useState([false, {}]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.wrapper}>
            {showModal[0] ?
                <div>
                    <ResultModal data={showModal[1]} closeModalFunction={() => setModal([false, 0])}/>
                </div>:
                null}
            <Fade in timeout={1000}>
                <Grid container direction='row' justify='center'>
                    {/* <Grid item><ResponsiveDrawer/></Grid> */}
                    <Grid item className={classes.content} xs={12} md={9} xl={10}>

                        <div>
                            <Typography variant='h5' style={{padding: '2rem 0'}}><Box fontWeight='bold'>Featured</Box></Typography>
                            <MainSurvey/>
                        </div>

                        <Tabs value={value} onChange={handleChange} classes={{indicator: classes.tabBorder}}>
                            <Tab label={<p className={classes.tabs}>Active Surveys</p>}/>
                            <Tab label={<p className={classes.tabs}>Survey Results</p>}/>
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <ActiveSurveys/>
                        </TabPanel>

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
