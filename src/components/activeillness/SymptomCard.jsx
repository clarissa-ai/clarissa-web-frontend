import React from 'react';
import {Box, Card, Typography, Grid, CardContent, makeStyles} from '@material-ui/core';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    symptomCard: {
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

const SymptomCard = (props) => {
    SymptomCard.propTypes = {
        symptom: propTypes.object,
        severity: propTypes.string,
        month: propTypes.string,
        symptomModalFunction: propTypes.func,
    };
    const classes = useStyles();

    const dateEndPos = props.symptom.updated_on.lastIndexOf('-') + 3;
    const date = props.symptom.updated_on.substring(0, dateEndPos);
    const dateArray = date.split('-');
    const displayDate = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];

    return (
        <Card className={classes.symptomCard}>
            <CardContent>
                <Grid container direction="row" justify='space-between'>
                    <Grid item>
                        <Grid container direction='row' spacing={1}>
                            <Grid item><Typography className={classes.heading}><Box fontWeight="fontWeightBold">{props.symptom.title}</Box></Typography></Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item onClick={props.symptomModalFunction}>
                            <Typography variant='subtitle2' className={classes.cardLabel} style={{cursor: 'pointer'}}>
                                <Box fontWeight={500}>Edit</Box>
                            </Typography>
                        </Grid>*/}
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Date Logged: </Typography></Grid>
                    <Grid item><Typography variant='subtitle2' className={classes.content}>{displayDate}</Typography></Grid>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <Grid item><Typography variant='subtitle2' className={classes.cardLabel}>Data: </Typography></Grid>
                    <Grid item><Typography variant='subtitle2' className={classes.content}>{}</Typography></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SymptomCard;
