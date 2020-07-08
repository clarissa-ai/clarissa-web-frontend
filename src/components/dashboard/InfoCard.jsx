import React from 'react';
import {Grid, Typography, makeStyles, Button, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    labels: {
        color: '#A6A6A6',
    },
    button: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#8D8D8D',
    }
}));

const InfoCard = (props) => {
    const classes = useStyles();
    return <Grid container direction='row' justify='space-evenly' alignItems='center' className={classes.container}>
        <Grid item><Typography><Box fontWeight='bold'>{props.title}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.date}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.status}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.symptomcount}</Box></Typography></Grid>
        <Grid item>
            <Button onClick={props.link} variant='outlined' className={classes.button}>
                <Typography variant='subtitle2'><Box fontWeight='bold'>View</Box></Typography>
            </Button>
        </Grid>
    </Grid>
}

export default InfoCard;
