import React from 'react';
import {Grid, Typography, makeStyles, Box, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: '1rem',
    },
    greenText: {
        color: '#47C594',
    }
}));

const IllnessSummaryCard = (props) => {
    const classes = useStyles();
    const created_on = new Date(props.created_on);
    const updated_on = new Date(props.updated_on);
    return <Grid container className = {classes.container}  direction = 'column'  alignContent = 'stretch'>
            <Grid item><Typography variant = 'h6'className = {classes.greenText}><Box fontWeight = 'bold'> Illness Name: </Box> {props.name}</Typography></Grid>
            <Grid item><Typography variant = 'h8' style = {{PaddingTop: '2rem'}}><Box fontWeight = 'bold'>Created On:</Box> {created_on.toString()}</Typography></Grid>
            <Grid item><Typography variant = 'h8' style = {{PaddingTop: '2rem'}}><Box fontWeight = 'bold'>Updated On:</Box> {updated_on.toString()}</Typography></Grid>
            
        </Grid>
    


}
export default IllnessSummaryCard;