import React from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        padding: '.1rem',
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
    },
    linkActive: {
        color: '#fff'
    },
    link: {
        color: '#000',
    },
    labelGreen: {
        color: '#47C594',
    },
    lowOpacity: {
        opacity: '60%',
        paddingLeft: '1rem',
    },
}));

const InfoCard = (props) => {
    const classes = useStyles();

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.getMonth()+1 +'/'+ date.getDate() +'/'+date.getFullYear();
    }


    return <Grid container direction='row' alignItems='center' className={classes.container}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="3" cy="3" r="2.5" stroke="#47C594"/>
        </svg>
        <Grid item><Typography><Box>{props.title}{props.index}</Box></Typography></Grid>
        <Grid item><Typography><Box className = {classes.lowOpacity}>{parseDate(props.date)}</Box></Typography></Grid>

    </Grid>
}

export default InfoCard;
