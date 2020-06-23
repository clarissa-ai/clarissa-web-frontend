import React from 'react';
import PrescriptionTile from 'components/dashboard/PrescriptionTile';
import AppointmentTile from 'components/dashboard/AppointmentTile';
import CurrentIllness from 'components/dashboard/CurrentIllness';
import SymptomTile from 'components/dashboard/SymptomTile';
import SymptomLog from 'components/dashboard/SymptomLog';
import SideNavBar from 'components/navbar/SideNavBar';
import SymptomPopUp from 'components/dashboard/SymptomPopUp';
import {Grid} from '@material-ui/core';

const Dashboard = (props) => {
    return (
        // Wrapper Grid
        <Grid container direction ='row' spacing={2} style={{margin: 0, width: '100%', height: '100%', backgroundColor: '#F5F6F8'}}>
            {/* Nav Bar Item */}
            <Grid item xs={2} style={{height: '100vh', padding: '0'}}>
                <SideNavBar/>
            </Grid>
            {/* Dashboard Contents */}
            <Grid item xs ={10}>
                {/* Symptom Log and Popup */}
                <Grid container spacing={2} direction='row'>
                    <Grid item xs={8} style={{height: '20vh'}}><SymptomLog/></Grid>
                    <Grid item xs={4} style={{height: '20vh'}}><SymptomPopUp/></Grid>
                </Grid>
                {/* Symptom History, Current Illness, Appointments, Precriptions */}
                <Grid container direction='row' spacing={2}>
                    <Grid item xs={4} style={{height: '80vh'}}><SymptomTile/></Grid>
                    <Grid item xs={4} style={{height: '80vh'}}><CurrentIllness/></Grid>
                    {/* NESTED Appointment and Prescriptions */}
                    <Grid item xs={4}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs={12} style={{height: '40vh'}}><AppointmentTile/></Grid>
                            <Grid item xs={12} style={{height: '40vh'}}><PrescriptionTile/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Dashboard;
