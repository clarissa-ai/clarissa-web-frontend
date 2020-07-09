import React, {useState} from 'react';
import {Card, CardHeader, Typography, Grid, AppBar, Tabs, Tab} from '@material-ui/core';

const ActiveAnalysis = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Grid container={true} direction='column'>
            <Grid item={true} xs={12}>
                <Typography variant='h6' color='textPrimary' style={{fontWeight: 'bold'}}>Analysis</Typography>
            </Grid>
            <Grid item={true} xs={12}>
                <AppBar position="static" color='default'>
                    <Tabs value={activeTab} onChange={handleChange}>
                        <Tab label="Pneumonia"></Tab>
                        <Tab label="Strep"></Tab>
                        <Tab label="Common Cold"></Tab>
                    </Tabs>
                </AppBar>
                <div>

                </div>
            </Grid>
        </Grid>
    );
};
export default ActiveAnalysis;
