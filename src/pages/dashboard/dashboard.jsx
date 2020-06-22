import React from 'react';
import PrescriptionTile from 'components/dashboard/PrescriptionTile';
import AppointmentTile from 'components/dashboard/AppointmentTile';
import CurrentIllness from 'components/dashboard/CurrentIllness';
import SymptomTile from 'components/dashboard/SymptomTile';
import SymptomLog from 'components/dashboard/SymptomLog';
import SideNavBar from 'components/navbar/SideNavBar';
import SymptomPopUp from 'components/dashboard/SymptomPopUp';
import {Grid, Box} from '@material-ui/core';

const Dashboard = (props) => {
    return (
        <Box style={{marginLeft: '19vw', width: '79vw', height: '100vh', overflow: 'hidden', marginTop: '5em,'}}>
            <SideNavBar/>
            {/* Symptom Log and Popup */}
            <Grid item>
                <Grid container spacing={2} direction='row'>
                    <Grid item><SymptomLog/></Grid>
                    <Grid item><SymptomPopUp/></Grid>
                </Grid>
            </Grid>
            {/* Symptom History and Current Illness */}
            <Grid item>
                <Grid container direction='row' spacing={2}>
                    <Grid item><SymptomTile/></Grid>
                    <Grid item><CurrentIllness/></Grid>
                    {/* Appointment and Prescriptions */}
                    <Grid item>
                        <Grid container direction='column' spacing={2}>
                            <Grid item><AppointmentTile/></Grid>
                            <Grid item><PrescriptionTile/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Dashboard;
