import React from 'react';
import {Card, makeStyles, CardHeader, Divider, CardContent, Link, Grid} from '@material-ui/core';
import SymptomCard from './SymptomCard';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        width: '25em',
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

const SymptomTile = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Symptom History' classes={{title: classes.title}}/>
            <Divider variant='middle' classes={{middle: classes.divider}}/>
            <CardContent>
                <SymptomCard />
                <SymptomCard />
                <SymptomCard />
                <SymptomCard />
                <SymptomCard />
            </CardContent>
            <Grid container><Link variant='subtitle2' href='' className={classes.link}>View More</Link></Grid>
        </Card>
    );
};
export default SymptomTile;
