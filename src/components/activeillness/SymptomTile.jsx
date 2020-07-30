import React from 'react';
import {Card, makeStyles, CardContent} from '@material-ui/core';
import SymptomCard from './SymptomCard';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFFF',
        height: '23rem',
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
        'height': '99%',
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
    SymptomTile.propTypes = {
        setModal: propTypes.func,
        symptoms: propTypes.array,
    };
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                {props.symptoms ? props.symptoms.slice(0).reverse().map((symptom, index) => {
                    return (
                        <SymptomCard key={index} symptom={symptom} setModal={props.setModal}/>
                    );
                }) : null}
            </CardContent>
        </Card>
    );
};
export default SymptomTile;
