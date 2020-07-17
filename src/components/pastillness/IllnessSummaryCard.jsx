import React from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    greenText: {
        color: '#47C594',
    }
}));

const parseDate = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth()+1 +'/'+ date.getDate() +'/'+date.getFullYear();
}

const IllnessSummaryCard = (props) => {
    const classes = useStyles();
    return <Grid container justify='center' direction='row' alignContent='stretch' spacing={1} style={{paddingBottom: '1rem',}}>
            {/* <Grid item><Typography variant = 'h6'className = {classes.greenText}><Box fontWeight = 'bold'> Illness Name: </Box> {props.name}</Typography></Grid> */}
            <Grid item><Typography variant='h5' className={classes.greenText}>Illness Summary</Typography></Grid>
            <Grid container direction='row' align alignItems='center' justify='center' spacing={2}>
                <Grid item><Typography variant='h8'><Box fontWeight='bold'>Created: {parseDate(props.created_on)}</Box></Typography></Grid>
                <Grid item><Typography variant='h8'><Box fontWeight='bold'>Updated: {parseDate(props.updated_on)}</Box></Typography></Grid>
            </Grid>  
        </Grid>
}
export default IllnessSummaryCard;