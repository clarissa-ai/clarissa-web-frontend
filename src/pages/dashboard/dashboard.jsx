import React from 'react';
import PrescriptionTile from 'components/dashboard/PrescriptionTile';
import AppointmentTile from 'components/dashboard/AppointmentTile';
import CurrentIllness from 'components/dashboard/CurrentIllness';
import SymptomTile from 'components/dashboard/SymptomTile';
import SymptomLog from 'components/dashboard/SymptomLog';
import {Grid, Container, makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '23rem',
        height: '36.5rem',
    },
    divider: {
        height: 3,
    },
    title: {
        padding: theme.spacing(2),
        fontWeight: 'bold',
    },
    linkFont: {
        fontWeight: 'bold',
    },
    chart: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const Dashboard = (props) => {
    return (
        <Container>
            <Grid container direction='row' spacing={2}>
                <Grid item>
                    <Grid container>
                        {/* Symptom Log and Popup */}
                        <Grid item><SymptomLog/></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {/* Symptom History and Current Illness */}
                    <Grid container direction='row' spacing={2}>
                        <Grid item><SymptomTile/></Grid>
                        <Grid item><CurrentIllness/></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {/* Appointment and Prescriptions */}
                    <Grid container direction='column' spacing={2}>
                        <Grid item><AppointmentTile/></Grid>
                        <Grid item><PrescriptionTile/></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Dashboard;
