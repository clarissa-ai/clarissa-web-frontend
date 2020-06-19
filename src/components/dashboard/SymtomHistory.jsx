import React from 'react';
import {Card, makeStyles, CardHeader} from '@material-ui/core';
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
}));

const SymptomHistory = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Symptom History' classes={{title: classes.title}}>Symptom History</CardHeader>
            <SymptomCard />
            <SymptomCard />
            <SymptomCard />
            <SymptomCard />
            <SymptomCard />
        </Card>
    );
};
export default SymptomHistory;
