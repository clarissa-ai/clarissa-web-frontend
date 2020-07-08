import React from 'react';
import {Grid, Typography, makeStyles, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        background: '#F2F6F9',
    },
    labels: {
        color: '#A6A6A6',
    }
}));

const InfoCard = (props) => {
    const classes = useStyles();
    return <Grid container direction='row' spacing={3} className={classes.container}>
        <Grid item><Typography>{props.title}</Typography></Grid>
        <Grid item><Typography>{props.date}</Typography></Grid>
        <Grid item><Typography>{props.status}</Typography></Grid>
        <Grid item><Typography>{props.symptomcount}</Typography></Grid>
        <Grid item><Button onClick={props.link}>View</Button></Grid>
    </Grid>
}

export default InfoCard;
