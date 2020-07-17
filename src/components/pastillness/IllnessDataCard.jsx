import React from 'react';
import {makeStyles, Card, CardContent} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#fff',
        padding: '1rem',
        'overflow': 'scroll',
        height: '80vmin',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7064D0',
            borderRadius: '2em',
        },
    },
    label: {
        paddingBottom: '1rem',
    },
    link: {
        color: '#000',
    },
    wrapper: {
        height: '100%',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
}));

const IllnessDataCard = (props) => {

    const classes = useStyles();

    return (
        <Card className={classes.wrapper}>
            <CardContent className={classes.container}>
                {props.children}
            </CardContent> 
        </Card>
    );
}
export default IllnessDataCard;
