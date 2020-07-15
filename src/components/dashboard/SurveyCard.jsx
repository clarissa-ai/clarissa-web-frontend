import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    labels: {
        color: '#A6A6A6',
    },
    button: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#8D8D8D',
    },
    link: {
        color: '#000',
    }
}));

const SurveyCard = (props) => {
    const classes = useStyles();

    return <Grid container direction='row' alignItems='center' justify='space-evenly' className={classes.container}>
        <Grid item><Typography><Box fontWeight='bold'>{props.title}</Box></Typography></Grid>
        <Grid item>
            <Button variant='outlined' className={classes.button}>
                <Link className={classes.link} href={`${props.link}`}><Typography variant='subtitle2'><Box fontWeight='bold'>View</Box></Typography></Link>
            </Button>
        </Grid>
    </Grid>
}

export default SurveyCard;