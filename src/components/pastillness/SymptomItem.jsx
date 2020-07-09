import React, {useState, useEffect} from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';

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
    },
    linkActive: {
        color: '#fff'
    },
    link: {
        color: '#000',
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

    return <Grid container direction='row' alignItems='center' justify='center' className={props.status? classes.activeContainer : classes.container}>
        <Grid item><Typography><Box fontWeight='bold'>{props.title}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold'>{props.date}</Box></Typography></Grid>
        <Grid item><Typography>
            {() => handleStatus()}</Typography>
        </Grid>
        <Grid item><Typography>{() => handleSymptoms()}</Typography></Grid>
        <Grid item>
        </Grid>
    </Grid>
}

export default InfoCard;
