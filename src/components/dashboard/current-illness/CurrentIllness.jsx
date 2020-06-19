import React from 'react';
import {makeStyles, Card, Divider, Typography, Link, BottomNavigation} from '@material-ui/core';
import IllnessChart from './IllnessChart';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '23rem',
        height: '36.5rem',
    },
    divider: {
        height: 3,
    },
    title: {
        padding: theme.spacing(2),
        fontWeight: 'bold',
    },
    linkFont: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chart: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const healthRecc = [
    {
        title: 'Wash hands with soap and water',
    },
    {
        title: 'Eat nutriotious food',
    },
    {
        title: 'Keep hydrated',
    },
    {
        title: 'Stay well rested',
    },
];

const CurrentIllness = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography className={classes.title}>Current Illness</Typography>
            <Divider className={classes.divider} variant='middle'/>

            <IllnessChart className={classes.chart}/>

            <Typography className={classes.title}>Health Recommendation</Typography>
            <Divider className={classes.divider} variant='middle'/>
            <ul>
                {healthRecc.map((recc, index) => (
                    <li key={index}>
                        <Typography variant='body2'>{recc.title}</Typography>
                    </li>
                ))}
            </ul>
            <BottomNavigation>
                <Link underline='none' href='/active-illness'>
                    <Typography className={classes.linkFont} variant='body2'>
                        Manage
                    </Typography>
                </Link>
            </BottomNavigation>
        </Card>
    );
};

export default CurrentIllness;
