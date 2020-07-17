import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid, AppBar, Tabs, Tab, Box, Chip, useTheme, makeStyles, Paper, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {useSelector} from 'react-redux';

import OpenBulletIcon from 'components/misc/common/OpenBulletIcon';
import ClosedBulletIcon from 'components/misc/common/ClosedBulletIcon';
import {profileSelector} from 'redux/selectors';

const useStyles = makeStyles((theme) => ({
    tab: {
        textTransform: 'none',
        backgroundColor: '#FFFFFFFF',
    },
    infoBoxes: {
        margin: '1rem',
    },
    list: {
        listStyleType: 'circle',
    },
}));

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
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

const TabLabel = (props) => {
    return (
        <Grid container={true} direction='row' alignContent='center'>
            <Grid item={true} xs={12}>
                <Typography><OpenBulletIcon color={props.color}/> {props.children}</Typography>
            </Grid>
            <Grid item={true} xs={12}>
                <Chip size='small' label={props.chipText} style={{backgroundColor: props.color, color: 'white', cursor: 'pointer'}}/>
            </Grid>
        </Grid>
    );
};
TabLabel.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
    chipText: PropTypes.string,
};

const IllnessTab = (props) => {
    const theme = useTheme();
    const analysisPalette = [
        theme.palette.error.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
    ];
    const analysisChance = [
        'Most Likely',
        'Likely',
        'Least Likely',
    ];

    const classes = useStyles();
    const {commonName, index, ...other} = props;
    return (
        <Tab {...other} className={classes.tab} disableRipple={true} label={<TabLabel color={analysisPalette[index]} chipText={analysisChance[index]}>{commonName}</TabLabel>}></Tab>
    );
};
IllnessTab.propTypes = {
    index: PropTypes.number.isRequired,
    commonName: PropTypes.string.isRequired,
};

const IllnessTabPanel = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const listPalette = {
        matching: theme.palette.success.main,
        missing: theme.palette.error.main,
    }
    const symptomsMatching = [];
    props.symptomsSupporting.forEach((symptom, index) => {
        symptomsMatching.push(
            <ListItem key={index}>
                <ListItemIcon>
                    <ClosedBulletIcon color={listPalette.matching} />
                </ListItemIcon>
                <ListItemText>
                    {symptom.common_name}
                </ListItemText>
            </ListItem>,
        );
    });
    const symptomsMissing = [];
    props.symptomsOpposing.forEach((symptom, index) => {
        symptomsMissing.push(
            <ListItem key={index}>
                <ListItemIcon>
                    <ClosedBulletIcon color={listPalette.missing} />
                </ListItemIcon>
                <ListItemText>
                    {symptom.common_name}
                </ListItemText>
            </ListItem>,
        );
    });
    return (
        <Grid container={true} direction='column'>
            <Grid className={classes.infoBoxes} item={true} xs={12}>
                <Paper square={true} elevation={4}>
                    <Box p={3}>
                        <Typography variant='h6'>{props.commonName}</Typography>
                        <Typography>{props.definition}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid className={classes.infoBoxes} item={true} xs={12}>
                <Paper square={true} elevation={4}>
                    <Box p={3}>
                        <Typography variant='h6'>Symptoms Analysis</Typography>
                        <Grid container={true} direction='row'>
                            <Grid item={true} xs={6}>
                                <Typography>Symptoms Matching</Typography>
                                <List dense={true}>
                                    {symptomsMatching}
                                </List>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography>Symptoms Missing</Typography>
                                <List dense={true}>
                                    {symptomsMissing}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};
IllnessTabPanel.propTypes = {
    commonName: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    symptomsSupporting: PropTypes.array.isRequired,
    symptomsOpposing: PropTypes.array.isRequired,
};

const ActiveAnalysis = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [analysis, setAnalysis] = useState([]);
    const profile = useSelector(profileSelector);
    const theme = useTheme();


    useEffect(()=> {
        if (!profile.authenticated) return;
        fetch(`${process.env.REACT_APP_ENDPOINT_BASE}/api/illness/get_active_illness`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then((res) => {
                setAnalysis(res.illness.analysis);
            },
            (error) => {
                console.log(error);
            });
    }, [profile]);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const tabs = [];
    analysis.forEach((diagnosis, index) => tabs.push(<IllnessTab key={index} commonName={diagnosis.common_name} index={index} />));
    const tabPanels = [];
    analysis.forEach((diagnosis, index) => tabPanels.push(
        <TabPanel key={index} value={activeTab} index={index}>
            <IllnessTabPanel commonName={diagnosis.common_name} definition={diagnosis.hint} symptomsSupporting={diagnosis.supporting_symptoms} symptomsOpposing={diagnosis.opposing_symptoms}/>
        </TabPanel>,
    ));

    return (
        <Paper style={{width: '50%'}} elevation={4}>
            <Grid container={true} direction='column' justify='space-evenly'>
                <Grid item={true} xs={12}>
                    <Box pt={3} pr={3} pb={3}>
                        <Typography variant='h6' color='textPrimary' style={{fontWeight: 'bold'}}>Analysis <Chip size='small' label='Analysis' style={{backgroundColor: theme.palette.success.main, color: theme.palette.text.primary}}/></Typography>
                    </Box>
                </Grid>
                <Grid item={true} xs={12}>
                    <AppBar position="static" color='default' elevation={0}>
                        <Tabs value={activeTab} variant='fullWidth' onChange={handleChange} centered={true} indicatorColor='primary'>
                            {tabs}
                        </Tabs>
                    </AppBar>
                    {tabPanels}
                </Grid>
            </Grid>
        </Paper>
    );
};
export default ActiveAnalysis;
