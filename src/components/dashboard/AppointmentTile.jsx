import React from 'react';
import {CardHeader, Divider, Card, Grid, makeStyles} from '@material-ui/core';
import DoctorCard from './DoctorCard';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '23vw',
        height: '34vh',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    heading: {
        color: '#334D6E',
    },
    cardLabel: {
        color: '#AEAEAE',
    },
    content: {
        color: '#334D6E',
    },
    divider: {
        height: '0.2em',
    },
    link: {
        margin: '0 auto',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        paddingBottom: '1em',
    },
}));

const AppointmentTile = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Grid container direction='row' justify='space-between' alignItem='center' alignContent='center'>
                <Grid item><CardHeader title='Upcoming Appointment' classes={{title: classes.title}}/></Grid>
                <Grid item><CardHeader title='View More' className={classes.cardLabel} titleTypographyProps={{variant: 'subtitle2'}}/></Grid>
            </Grid>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <DoctorCard/>
            <CardHeader title='Previous Appointment' classes={{title: classes.title}}/>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <DoctorCard/>
        </Card>
    );
};
export default AppointmentTile;
