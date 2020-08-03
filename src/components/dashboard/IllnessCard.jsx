import React from 'react';
import {Grid, Typography, makeStyles, Button, Box, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
    },
    activeContainer: {
        borderRadius: '4px',
        background: '#47C594',
        padding: '1rem',
        marginBottom: '.8rem',
        color: '#fff',
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
    activeButton: {
        borderRadius: '15px',
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: '#fff',
        color: '#fff',
    },
    linkActive: {
        color: '#fff',
    },
    link: {
        color: '#000',
    },
    title: {
        width: '8rem',
    },
    date: {
        width: '11rem',
    },
    active: {
        width: '4rem',
    },
    symptoms: {
        width: '8rem',
    },
}));

const IllnessCard = (props) => {
    const classes = useStyles();

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.getMonth()+1 +'/'+ date.getDate() +'/'+date.getFullYear();
    };

    return <Grid container direction='row' alignItems='center' justify='space-around' className={props.status ? classes.activeContainer : classes.container}>
        <Grid item><Typography><Box fontWeight='bold' textOverflow="ellipsis" className={classes.title}>{props.title}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight='bold' className={classes.date}>{parseDate(props.dateStart)} - {parseDate(props.dateEndOrUpdated)}</Box></Typography></Grid>
        <Grid item>
            <Typography><Box fontWeight='bold' className={classes.active}>{props.status === true ? 'Active' : 'Closed'}</Box></Typography>
        </Grid>
        <Grid item><Typography><Box fontWeight='bold' className={classes.symptoms}>{props.symptomcount} Symptoms</Box></Typography></Grid>
        <Grid item>
            <Button
                variant='outlined'
                className={props.status? classes.activeButton : classes.button}
                href={props.status? '/active-illness' : '/past-illnesses'}>
                View
            </Button>
        </Grid>
        <Grid item>
            <Link className={props.status? classes.linkActive : classes.link}
                onClick={() => {
                    props.newIllnessFunction(false);
                    props.modalFunction();
                    props.setModalInfo(props.title, props.dateStart, props.dateEndOrUpdated);
                    props.handleModalIllnessID(props.idNum);
                }}>Edit</Link>
        </Grid>
    </Grid>;
};

export default IllnessCard;
