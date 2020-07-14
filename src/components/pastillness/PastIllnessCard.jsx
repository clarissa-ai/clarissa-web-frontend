import React from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '35rem',
        width: '25rem',
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
}));

const IllnessHistoryCard = (props) => {
    const classes = useStyles();
    return <Grid container className={classes.container} justify='center' direction='column' alignItems='stretch' alignContent='stretch'> 
            <Grid item><Typography variant='h6' className={classes.label}><Box fontWeight='bold'>Illness History</Box></Typography></Grid>
            <Grid item>{props.children}</Grid>
        </Grid>
}
export default IllnessHistoryCard;
