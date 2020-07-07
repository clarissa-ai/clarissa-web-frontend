import React from 'react';
import PropTypes from 'prop-types';
import MainSurvey from 'components/surveycomponents/MainSurvey';
import {Fade, Grid, Typography, Tab, makeStyles, Box, Tabs} from '@material-ui/core';
import SideNavBar from 'components/navbar/SideNavBar';
import ActiveSurveys from 'components/surveycomponents/ActiveSurveys';
import ResultCard from 'components/surveycomponents/ResultCard';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    tabBorder: {
        backgroundColor: 'transparent',
    },
    tabs: {
        fontWeight: 'bold',
    },
    content: {
        width: '80vw',
        marginLeft: '17rem',
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

const handleChange = (event, newValue) => {
    setValue(newValue);
};

return<Fade in timeout={1000}>
    <Grid container direction='row'>
            <Grid item><SideNavBar/></Grid>
                <Grid item className={classes.content}>
                    <Typography variant='h5' style={{padding: '2rem 0'}}><Box fontWeight='bold'>Featured</Box></Typography>
                    <MainSurvey/>
                    <Tabs value={value} onChange={handleChange} classes={{indicator: classes.tabBorder}}>
                        <Tab label={<p className={classes.tabs}>Active Surveys</p>}/>
                        <Tab label={<p className={classes.tabs}>Survey Results</p>} />
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
}

export default SurveysPage;