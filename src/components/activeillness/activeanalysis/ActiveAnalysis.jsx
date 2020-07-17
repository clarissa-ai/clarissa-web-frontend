import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid, AppBar, Tabs, Tab, Box, Chip, useTheme, makeStyles, List, ListItem, ListItemText, ListItemIcon, Card, CardContent} from '@material-ui/core';

import OpenBulletIcon from 'components/misc/common/OpenBulletIcon';
import ClosedBulletIcon from 'components/misc/common/ClosedBulletIcon';

const useStyles = makeStyles((theme) => ({
    tab: {
        textTransform: 'none',
        backgroundColor: '#FFFF',
    },
    list: {
        listStyleType: 'circle',
    },
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFFF',
        height: '100%',
    },
    cardContent: {
        'overflow': 'auto',
        'height': '99%',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7064D0',
            borderRadius: '2em',
        },
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
                <Typography><OpenBulletIcon color={props.color}/>{props.children}</Typography>
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
    };
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
        <Grid containers direction='column' style={{height: '34vmin'}} className={classes.cardContent}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='body1'>{props.commonName}</Typography>
                        <Typography variant='subtitle2'>{props.definition}</Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant='body1'>Symptoms Analysis</Typography>
                        <Grid container direction='row'>
                            <Grid item xs={6}>
                                <Typography variant='subtitle2'>Symptoms Matching</Typography>
                                <List dense={true}>
                                    {symptomsMatching}
                                </List>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='subtitle2'>Symptoms Missing</Typography>
                                <List dense={true}>
                                    {symptomsMissing}
                                </List>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
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
    const classes = useStyles();

    ActiveAnalysis.propTypes = {
        analysis: PropTypes.array,
    };

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const tabs = [];
  
    props.analysis.forEach((diagnosis, index) => tabs.push(<IllnessTab commonName={diagnosis.common_name} index={index} />));
    const tabPanels = [];
    props.analysis.forEach((diagnosis, index) => tabPanels.push(
        <TabPanel value={activeTab} index={index}>
            <IllnessTabPanel commonName={diagnosis.common_name} definition={diagnosis.hint} symptomsSupporting={diagnosis.supporting_symptoms} symptomsOpposing={diagnosis.opposing_symptoms}/>
        </TabPanel>,
    ));

    return (
        <Card className={classes.card}>
            <Grid container={true} direction='column' justify='space-evenly'>
                <Grid item={true} xs={12}>
                    <AppBar position="static" color='default' elevation={0}>
                        <Tabs value={activeTab} variant='fullWidth' onChange={handleChange} centered={true} indicatorColor='primary'>
                            {tabs}
                        </Tabs>
                    </AppBar>
                    {tabPanels}
                </Grid>
            </Grid>
        </Card>
    );
};
export default ActiveAnalysis;
