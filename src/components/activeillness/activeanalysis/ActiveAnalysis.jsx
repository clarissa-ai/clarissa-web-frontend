import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, Typography, Grid, AppBar, Tabs, Tab, Box, Chip, useTheme, makeStyles, Paper, List, ListItem, ListItemText, Avatar, ListItemAvatar} from '@material-ui/core';

import OpenBulletIcon from 'components/misc/common/OpenBulletIcon';

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
        <Typography><OpenBulletIcon color={props.color}/> {props.children} <Chip size='small' label={props.chipText} style={{backgroundColor: props.color, color: 'white', cursor: 'pointer'}}/></Typography>
    );
};
TabLabel.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
    chipText: PropTypes.string,
};

const ActiveAnalysis = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const classes = useStyles();

    return (
        <Paper style={{width: '50%'}}elevation={4}>
            <Grid container={true} direction='column' justify='space-evenly'>
                <Grid item={true} xs={12}>
                    <Box pt={3} pr={3} pb={3}>
                        <Typography variant='h6' color='textPrimary' style={{fontWeight: 'bold'}}>Analysis <Chip size='small' label='Analysis' style={{backgroundColor: theme.palette.success.main, color: theme.palette.text.primary}}/></Typography>
                    </Box>
                </Grid>
                <Grid item={true} xs={12}>
                    <AppBar position="static" color='default' elevation={0}>
                        <Tabs value={activeTab} variant='fullWidth' onChange={handleChange} centered={true} indicatorColor='primary'>
                            <Tab className={classes.tab} disableRipple={true} label={<TabLabel color={theme.palette.error.main} chipText='Most Likely'>Pneumonia</TabLabel>}></Tab>
                            <Tab className={classes.tab} disableRipple={true} label={<TabLabel color={theme.palette.secondary.main} chipText='Likely'>Strep</TabLabel>} />
                            <Tab className={classes.tab} disableRipple={true} label={<TabLabel color={theme.palette.success.main} chipText='Least Likely'>Common Cold</TabLabel>}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={activeTab} index={0}>
                        <Grid container={true} direction='column'>
                            <Grid className={classes.infoBoxes} item={true} xs={12}>
                                <Paper square={true} elevation={4}>
                                    <Box p={3}>
                                        <Typography variant='h6'>Pneumonia</Typography>
                                        <Typography>Pneumonia is an infection in one or both of the lungs. Bacteria, viruses, and fungi cause it. The infection causes inflammation in the air sacs in your lungs, which are called alveoli. The alveoli fill with fluid or pus, making it difficult to breathe.</Typography>
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
                                                <List dense={true} className={classes.list}>
                                                    <ListItem className={classes.list}>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <Typography>Symptoms Missing</Typography>
                                                <List dense={true}>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Cough
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={activeTab} index={2}>
                        Item Three
                    </TabPanel>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default ActiveAnalysis;
