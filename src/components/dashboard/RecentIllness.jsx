import React from 'react';
import {Grid, Typography, makeStyles, Box, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
}));

const RecentIllness = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} justify='center' direction='column' alignItems='stretch' alignContent='stretch'> 
        <Grid item><Typography variant='h6' className={classes.label}><Box fontWeight='bold'>Recent Illness</Box></Typography></Grid>
        <Grid item>{props.children}</Grid>
        <Grid container justify='center'>
            <Grid item><Typography variant='subtitle2' style={{opacity: '.4'}}><Box fontWeight='bold'><Link className={classes.link} href='/past-illnesses'>View More</Link></Box></Typography></Grid>
        </Grid>
    </Grid>
}
export default RecentIllness;
