import React from 'react';
import PropTypes from 'prop-types';
import MainSurvey from 'components/surveycomponents/MainSurvey';
import {Fade, Grid, Typography, Tab, makeStyles, Box, Tabs} from '@material-ui/core';
import ActiveSurveys from 'components/surveycomponents/ActiveSurveys';
import ResultCard from 'components/surveycomponents/ResultCard';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
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
        padding: ' 1em 4em'
    },
}));


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
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
  }

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

const SurveysPage = (props) => {  
const classes = useStyles();
const [value, setValue] = React.useState(0);
const [showMain, setMain] = React.useState(true);

const handleChange = (event, newValue) => {
    setValue(newValue);
};

return <div className={classes.wrapper}>
    <Fade in timeout={500}>
        <Grid container direction='row' justify='center'>
                {/* <Grid item><SideNavBar/></Grid> */}
                <Grid item><ResponsiveDrawer/></Grid>
                    <Grid item className={classes.content}>
                        {showMain ? 
                        <div>
                            <Typography variant='h5' style={{padding: '2rem 0'}}><Box fontWeight='bold'>Featured</Box></Typography>
                            <MainSurvey/> 
                        </div> : null}
                        
                        <Tabs value={value} onChange={handleChange} classes={{indicator: classes.tabBorder}}>
                            <Tab label={<p className={classes.tabs}>Active Surveys</p>} onClick={() => setMain(true)}/>
                            <Tab label={<p className={classes.tabs}>Survey Results</p>} onClick={() => setMain(false)}/>
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <ActiveSurveys/>
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <ResultCard/>
                        </TabPanel>
                    </Grid>
        </Grid>
    </Fade>
</div>
}

export default SurveysPage;