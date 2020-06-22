import React from 'react';
import {Button, Card, CardHeader, Grid, CardContent, makeStyles} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '47.5vw',
    },
    textInput: {
        color: '#AEAEAE',
    },
    submitBtn: {
        backgroundColor: '#47C594',
        color: '#fff',
        textTransform: 'none',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
        margin: 0,
        paddingBottom: '0',
    },
}));

const SymptomLog = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.container}>
            {/* Heading */}
            <CardHeader title='Tell Clarissa how you are feeling.' classes={{root: classes.title, title: classes.title}}/>
            <CardContent className={classes.content}>
                {/* Symptom Input */}
                <InputBase
                    className={classes.textInput}
                    placeholder="I have a fever, and a cough. I have also been feeling nauseous lately."
                    fullWidth
                    margin='none'
                />
                <Grid container justify='flex-end'>
                    <Grid item><Button size='small' className={classes.submitBtn}>Submit</Button></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
export default SymptomLog;
