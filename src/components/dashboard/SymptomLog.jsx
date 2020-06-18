import React from 'react';
import {Button, Box, Card, Typography, Grid, CardContent, makeStyles} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '40em',
    },
    textInput: {
        margin: '1em 0',
        color: '#AEAEAE',
    },
    submitBtn: {
        backgroundColor: '#47C594',
        color: '#fff',
        textTransform: 'none',
    },
    heading: {
        fontFamily: 'Poppins',
        color: '#334D6E',
        fontWeight: 'bold',
    }
}));

const SymptomLog = (props) => {
    const classes = useStyles();
    return (<div>
        <Card className={classes.container}>
            <CardContent>
                {/* Heading */}
                <Typography className={classes.heading}>Tell Clarissa how you are feeling.</Typography>
                {/* Symptom Input */}
                <InputBase
                    className={classes.textInput}
                    placeholder="I have a fever, and a cough. I have also been feeling nauseous lately."
                    fullWidth
                    style={{margin: '0.5em 0'}}
                />
                <Grid container justify='flex-end'>
                    <Grid item><Button size='small' className={classes.submitBtn}>Submit</Button></Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>
    );
};
export default SymptomLog;
