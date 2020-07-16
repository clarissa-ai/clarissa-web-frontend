import React from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '.5rem',
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


const IllnessItem = (props) => {
    const classes = useStyles();
    const created_on = new Date(props.created_on);
    // const updated_on = new Date(props.updated_on);
    return <Grid container direction='row' alignItems='center' justify='space-evenly' className={classes.container}>
        <Grid item><Typography><Box fontWeight = 'bold'>{props.title}{props.index} </Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight = 'bold'> Date Created: {created_on.toString()} </Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight = 'bold'>Symptoms Logged: {props.symptomCount}</Box></Typography></Grid>
    </Grid>

}

export default IllnessItem;