import React, {useState, useEffect} from 'react';
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
    }
}));

const InfoCard = (props) => {
    const classes = useStyles();
    const [status, setStatus] = useState(null);
    const [symptoms, setSymptoms] = useState(null);

    const handleStatus = () => {
        if (status == null) {
            return null;
        } else if (status === true) {
            return <p style={{fontWeight: 'bold'}}>Active</p>;
        } else {
            return <p style={{fontWeight: 'bold'}}>Closed</p>;
        }
    }

    const handleSymptoms = () => {
        if (symptoms == null) {
            return null;
        } else {
            return <p style={{fontWeight: 'bold'}}>{symptoms} Symptoms</p>;
        }
    }

    useEffect(()=> {
        setStatus(props.status);
        setSymptoms(props.symptomcount);
    }, [props.link, props.status, props.symptomcount]);

    return <Grid container direction='row' alignItems='center' className={props.status? classes.activeContainer : classes.container}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="3" cy="3" r="2.5" stroke="#47C594"/>
        </svg>
        <Grid item><Typography><Box >{props.title}{props.index}</Box></Typography></Grid>
        <Grid item><Typography><Box   className = {classes.labelGreen}>  {props.data}</Box></Typography></Grid>
        <Grid item><Typography><Box  > {(props.symptomNum > 0) && "Date Created" }{props.date}</Box></Typography></Grid>
        <Grid item><Typography><Box > {(props.symptomNum > 0) && "Number of Symptoms Logged:" } {props.symptomNum}</Box></Typography></Grid>
        <Grid item><Typography>
            {() => handleStatus()}</Typography>
        </Grid>
        <Grid item><Typography>{() => handleSymptoms()}</Typography></Grid>
        <Grid item>
        </Grid>
    </Grid>
}

export default InfoCard;
