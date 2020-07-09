import React from 'react';
import {Grid, Typography, makeStyles, Button, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    activeContainer: {
        borderRadius: '4px',
        background: '#47C594',
        padding: '1rem',
        marginBottom: '.8rem',
        color: '#fff',
    },
    labels: {
        color: '#A6A6A6',
    },
    button: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#8D8D8D',
    },
    activeButton: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#fff',
        color: '#fff',
    }
}));

const InfoCard = (props) => {
    const classes = useStyles();
    return <Grid container direction='row' justify='space-evenly' alignItems='center' className={props.status? classes.activeContainer : classes.container}>
        <Grid item><Typography><Box fontWeight='bold'>{props.title}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.date}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>
            {props.status? 'Active' : 'Closed'}</Box></Typography>
        </Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.symptomcount} Symptoms</Box></Typography></Grid>
        <Grid item>
            <Button onClick={props.link} variant='outlined' className={props.status? classes.activeButton : classes.button}>
                <Typography variant='subtitle2'><Box fontWeight='bold'>View</Box></Typography>
            </Button>
        </Grid>
    </Grid>
}

export default InfoCard;
