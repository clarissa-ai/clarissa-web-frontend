import React, {useEffect} from 'react';
import {Grid, Typography, makeStyles, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        background: '#F2F6F9',
        padding: '1rem',
        marginBottom: '.8rem',
        cursor: 'pointer',
    },
    activeContainer: {
        borderRadius: '4px',
        background: '#47C594',
        padding: '1rem',
        marginBottom: '.8rem',
        color: '#fff',
        cursor: 'pointer',
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
        borderColor: '#47C594',
        color: '#fff',
    },
    linkActive: {
        color: '#fff'
    },
    link: {
        color: '#000',
    }
}));

const parseDate = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth()+1 +'/'+ date.getDate() +'/'+date.getFullYear();
}

function changeBackground(e) {
    e.target.style.background = 'red';
}

function changeBackBackground(e) {
    e.target.style.background = '#F2F6F9';
}

const IllnessItem = (props) => {
    const classes = useStyles();
    const [active, setStatus] = React.useState(false);
    const activeI = (props.selectedIllness == props.currIndex);
    console.log(activeI);


    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return <Grid container direction='row' onMouseOver={changeBackground}  onMouseLeave= {changeBackBackground} alignItems='center' justify='space-evenly' className={activeI ? classes.activeContainer : classes.container}>
        <Grid item><Typography><Box fontWeight = 'bold'>{props.title}{props.index}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight = 'bold'>{parseDate(props.created_on)} - {parseDate(props.updated_on)}</Box></Typography></Grid>
        <Grid item><Typography><Box fontWeight = 'bold'>{props.symptomCount} Symptoms</Box></Typography></Grid>
    </Grid>

}

export default IllnessItem;