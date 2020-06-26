import React from 'react';
import {Box, Card, Typography, Grid, CardContent, makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '100%',
        marginBottom: '0.5em',
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

const PrescriptionCard = (props) => {
    PrescriptionCard.propTypes = {
        drugName: PropTypes.string.isRequired,
        drugDose: PropTypes.string.isRequired,
        logMonth: PropTypes.string.isRequired,
        logDay: PropTypes.string.isRequired,
        logYear: PropTypes.string.isRequired,
        refillMonth: PropTypes.string,
        refillDay: PropTypes.string,
        refillYear: PropTypes.string,
    };
    const classes = useStyles();
    return <Card className={classes.card}>
        <CardContent>
            <Grid container direction="row" justify='space-between'>
                <Grid item>
                    <Grid container direction='row' spacing={1}>
                        <Grid item><Typography className={classes.heading}><Box fontWeight="fontWeightBold">{props.drugName}Amoxicillin</Box></Typography></Grid>
                        <Grid item><Typography className={classes.heading}><Box fontWeight="fontWeightBold">{props.drugDose}500 Mg</Box></Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item><Typography variant='subtitle2' className={classes.cardLabel}><Box fontWeight={500}>Edit</Box></Typography></Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
                <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Date Prescribed: </Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.content}>{props.logMonth} {props.logDay} {props.logYear} December 23, 2018</Typography></Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
                <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Last Refill: </Typography></Grid>
                <Grid item><Typography variant='subtitle2' className={classes.content}>{props.refillMonth} {props.refillDay} {props.refillYear} December 23, 2018</Typography></Grid>
            </Grid>
        </CardContent>
    </Card>;
};

export default PrescriptionCard;
