import React from 'react';
import {Grid, Typography, makeStyles, Box, useTheme} from '@material-ui/core';

import OpenBulletIconSmall from 'components/misc/common/OpenBulletIconSmall';

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '4px',
        padding: '.1rem',
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
        color: '#fff'
    },
    link: {
        color: '#000',
    },
    labelGreen: {
        color: '#47C594',
    },
    lowOpacity: {
        opacity: '60%',
        paddingLeft: '1rem',
    },
}));

const InfoCard = (props) => {
    const classes = useStyles();
    console.log(props.date);
    const theme = useTheme();

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.getMonth()+1 +'/'+ date.getDate() +'/'+date.getFullYear();
    }


    return <Grid container direction='row' alignItems='center' className={classes.container}>
        <Grid item>
            <OpenBulletIconSmall color={theme.palette.success.main} />
        </Grid>
        <Grid item><Typography><Box>{props.title}{props.index}</Box></Typography></Grid>
        <Grid item><Typography><Box className = {classes.lowOpacity}>{parseDate(props.date)}</Box></Typography></Grid>

    </Grid>
}

export default InfoCard;
