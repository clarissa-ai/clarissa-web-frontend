import React from 'react';
import {Avatar, Box, Card, Typography, Grid, CardContent, makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: 'none',
        backgroundColor: '#FFF',
    },
    heading: {
        color: '#334D6E',
    },
    cardLabel: {
        color: '#AEAEAE',
    },
    content: {
        color: '#334D6E',
        textAlign: 'right',
    },
}));

const DoctorCard = (props) => {
    DoctorCard.propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profilePic: PropTypes.string,
        month: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
    };
    const classes = useStyles();
    return <Card className={classes.card}>
        <CardContent className={classes.card} style={{paddingBottom: '0'}}>
            <Grid container direction='row' justify='space-between'>
                {/* Avatar */}
                <Grid item>
                    <Grid container direction="row" spacing={3} alignContent='center' alignItems='center'>
                        <Grid item><Avatar src={props.profilePic} /></Grid>
                        <Grid item><Typography className={classes.heading}><Box fontWeight="fontWeightBold">Dr. {props.lastName}Beans</Box></Typography></Grid>
                    </Grid>
                </Grid>
                {/* Appt Time */}
                <Grid item>
                    <Grid container direction='column'>
                        <Grid item><Typography variant='subtitle2' className={classes.content}>{props.month}{props.day}{props.year}7/13/2020</Typography></Grid>
                        <Grid item><Typography variant='subtitle2' className={classes.content}>{props.time}3:30PM</Typography></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>;
};

export default DoctorCard;
