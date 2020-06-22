import React from 'react';
import {Box, Card, Typography, Grid, CardContent, makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    symptomCard: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '23em',
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
}));

const SymptomCard = (props) => {
    SymptomCard.propTypes = {
        symptom: PropTypes.string.isRequired,
        severity: PropTypes.string.isRequired,
        month: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
    };
    const classes = useStyles();
    return <Card className={classes.symptomCard}>
        <CardContent>
            <Grid container direction="row" spacing={1}>
                <Grid item xs={1.5}><Typography className={classes.heading}><Box fontWeight="fontWeightBold">{props.symptom}Fever</Box></Typography></Grid>
                <Grid item xs={9}><Typography color='error'><Box fontWeight="fontWeightBold">{props.severity}102.8F</Box></Typography></Grid>
                <Grid item xs={1}><Typography variant='subtitle2' className={classes.cardLabel}><Box fontWeight={500}>Edit</Box></Typography></Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
                <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Date Logged: </Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.content}>{props.month} {props.day} {props.year} December 23, 2018</Typography></Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
                <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Data: {props.data} </Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.content}>102.8F</Typography></Grid>
            </Grid>
        </CardContent>
    </Card>;
};

export default SymptomCard;
