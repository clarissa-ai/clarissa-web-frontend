import React from 'react';
import {Card, makeStyles, CardHeader, Divider, CardContent} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '23vw',
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    heading: {
        color: '#334D6E',
    },
    cardLabel: {
        color: '#AEAEAE',
    },
    content: {
        color: '#334D6E',
    },
    divider: {
        height: '0.2em',
    },
    link: {
        margin: '0 auto',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        paddingBottom: '1em',
    },
}));

const SymptomPopUp = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Symptoms Recognized' classes={{title: classes.title}}/>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <CardContent>
                <p>Redesign in progress</p>
            </CardContent>
        </Card>
    );
};
export default SymptomPopUp;
