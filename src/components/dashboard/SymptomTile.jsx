import React from 'react';
import {Card, makeStyles, CardHeader, Divider, CardContent, Link, Grid} from '@material-ui/core';
import SymptomCard from './SymptomCard';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '100%',
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
        height: 3,
    },
    link: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        paddingTop: '1em',
        paddingBottom: '1em',
        bottom: '1rem',
        position: 'absolute',
    },
    cardContent: {
        'overflow': 'scroll',
        'height': '75%',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7064D0',
            borderRadius: '2em',
        },
    },
}));

const SymptomTile = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Symptom History' classes={{title: classes.title}}/>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <CardContent className={classes.cardContent}>
                <SymptomCard />
                <SymptomCard />
                <SymptomCard />
                <SymptomCard />
            </CardContent>
            <Grid container justify='center'><Link variant='subtitle2' href='' className={classes.link}>View More</Link></Grid>
        </Card>
    );
};
export default SymptomTile;
