import React from 'react';
import {makeStyles, Card, Divider, Typography, Link, CardContent, Grid, useTheme, Box, CardHeader} from '@material-ui/core';
import IllnessChart from './IllnessChart';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '23.5vw',
        height: '70vh',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
    },
    divider: {
        height: 3,
    },
    title: {
        color: '#334D6E',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    linkFont: {
        fontWeight: 'bold',
    },
    chart: {
        paddingTop: theme.spacing(2),
    },
    link: {
        margin: '0 auto',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
}));

const healthRecc = [
    {
        title: 'Wash hands with soap and water',
    },
    {
        title: 'Eat nutritious food',
    },
    {
        title: 'Keep hydrated',
    },
];

const dataNum = [60, 15, 25];
const diseases = ['Common Cold', 'Strep', 'Pneumonia'];
const displayDiseases = [
    {
        title: 'Common Cold',
        percent: 60,
    },
    {
        title: 'Strep',
        percent: 15,
    },
    {
        title: 'Pneumonia',
        percent: 25,
    },
];

const CurrentIllness = (props) => {
    const theme = useTheme();
    const classes = useStyles();

    const colors = [
        theme.palette.success.main,
        theme.palette.error.main,
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.secondary.main,
    ];

    return (
        <Card className={classes.root}>
            <CardHeader title='Current Illness' classes={{title: classes.title}}/>
            <Divider className={classes.divider} variant='middle'/>
            <IllnessChart dataNum={dataNum} diseases={diseases} className={classes.chart}/>
            <CardContent>
                <Grid container justify='center'>
                    {displayDiseases.map((disease, index) => (
                        <div key={index}>
                            <Grid item>
                                <Grid container>
                                    <Box style={{color: `${colors[index]}`, borderWidth: 3, marginTop: 4}} border={1} borderRadius={10} width={4} height={4}/>
                                    <Box width={9} height={4}/>
                                    <Typography color='textPrimary' variant='caption'>{disease.title}</Typography>
                                    <Box width={22} height={4}/>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </CardContent>

            <CardHeader title='Health Recommendation' classes={{title: classes.title}}/>
            <Divider className={classes.divider} variant='middle'/>
            <CardContent>
                <ul style={{margin: '0'}}>
                    {healthRecc.map((recc, index) => (
                        <li key={index}>
                            <Typography variant='body2'>{recc.title}</Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <Grid container><Link variant='subtitle2' href='' className={classes.link}>Manage</Link></Grid>
        </Card>
    );
};

export default CurrentIllness;
