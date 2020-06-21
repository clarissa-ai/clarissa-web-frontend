import React from 'react';
import {makeStyles, Card, Divider, Typography, Link, CardContent, CardActions, Grid, useTheme, Box} from '@material-ui/core';
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
        title: 'Eat nutritious food',
    },
    {
        title: 'Keep hydrated',
    },
    {
        title: 'Stay well rested',
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
            <CardContent>
                <Typography className={classes.title}>Current Illness</Typography>
                <Divider className={classes.divider} variant='middle'/>

                <IllnessChart dataNum={dataNum} diseases={diseases} className={classes.chart}/>

                <Grid container justify='center' style={{paddingBottom: 25}}>
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

                <Typography className={classes.title}>Health Recommendation</Typography>
                <Divider className={classes.divider} variant='middle'/>
                <ul>
                    {healthRecc.map((recc, index) => (
                        <li key={index}>
                            <Typography variant='body2'>{recc.title}</Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Link underline='none' href='/active-illness'>
                    <Typography className={classes.linkFont} variant='body2'>
                        Manage
                    </Typography>
                </Link>
            </CardActions>
        </Card>
    );
};

export default CurrentIllness;
