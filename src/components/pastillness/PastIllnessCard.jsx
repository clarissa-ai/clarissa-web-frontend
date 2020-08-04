import React from 'react';
import {makeStyles, Grid, Card, CardContent, Typography, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        'height': '80vmin',
        'overflow': 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7064D0',
            borderRadius: '2em',
        },
    },
    greenText: {
        color: '#47C594',
        padding: '.5rem',
    },
    wrapper: {
        height: '100%',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    topContainer: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        background: '#2C3C56',
        padding: '1rem 3rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        color: '#fff',
    },
}));

const PastIllnessCard = (props) => {
    const classes = useStyles();
    return <Card className={classes.wrapper}>
        <CardContent className={classes.container}>
            <div className = {classes.topContainer}>
                <Typography variant='h6'><Box fontWeight='bold'> Past Illlnesses</Box></Typography>
                <Typography variant='subtitle2' style = {{opacity: '.7'}}>View your logged illnesses</Typography>
            </div>
            {/* <Typography variant='h5' className={classes.greenText}>Past Illnesses</Typography> */}
            <Grid container direction='column'>
                {props.children}
            </Grid>
        </CardContent>
    </Card>;
};
export default PastIllnessCard;
