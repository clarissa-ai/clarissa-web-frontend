import React from 'react';
import {Card, makeStyles, CardHeader, Divider, CardContent} from '@material-ui/core';
import PrescriptionCard from './PrescriptionCard';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '25em',
    },
    cardContent: {
        'overflow': 'scroll',
        'height': '15em',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7064D0',
            borderRadius: '2em',
        },
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

const PrescriptionTile = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Prescriptions' classes={{title: classes.title}}/>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <CardContent classes={{root: classes.cardContent}} >
                <PrescriptionCard/>
                <PrescriptionCard/>
                <PrescriptionCard/>
                <PrescriptionCard/>
                <PrescriptionCard/>
                <PrescriptionCard/>
            </CardContent>
        </Card>
    );
};
export default PrescriptionTile;
