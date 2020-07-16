import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Button, Card, CardContent, Box, Avatar, useTheme} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 'auto',
    },
    root: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '12em',
    },
    wrap: {
        wordWrap: 'break-word',
        maxWidth: '76%',
        height: '12em',
    },
    box: {
        height: '12em',
        color: 'white',
        textAlign: 'center',
    },
    questions: {
        paddingTop: '25px',
        fontWeight: 'bold',
        alignSelf: 'end',
    },
    start: {
        display: 'flex',
    },
    avatarSize: {
        width: '3rem',
        height: '3rem',
        fontWeight: 600,
    },
    cardContent: {
        'overflow': 'auto',
        'height': '99%',
        '&::-webkit-scrollbar': {
            width: '0.3em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#C0C0C0',
            borderRadius: '2em',
        },
    },
}));

const ActiveSurveys = (props) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    const theme = useTheme();
    const colors = [theme.palette.primary.main, theme.palette.secondary.main,
        theme.palette.info.main, theme.palette.error.main];

    useEffect(() => {
        fetch(`${apiLink}/api/survey/get_active_surveys`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result.surveys);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [apiLink]);

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <Grid container spacing={2} className={classes.container}>
                {data.map((data, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item className={classes.wrap}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container style={{marginBottom: '.5rem'}}>
                                            <Avatar alt={data.title} src={apiLink + data.image_url} className={classes.avatarSize}/>
                                            <Typography style={{fontWeight: 'bold', margin: '.65rem'}}>{data.title}</Typography>
                                        </Grid>
                                        <Typography variant='subtitle2'>{data.description}</Typography>
                                    </CardContent>
                                </Grid>
                                <Grid item style={{width: '24%'}}>
                                    <Box className={classes.box} style={{backgroundColor: `${colors[index]}`}}>
                                        <div style={{height: '75%'}}>
                                            <Typography className={classes.questions} variant='h6'>{data.question_count}</Typography>
                                            <Typography style={{fontWeight: 'bold'}} variant='body2'>Questions</Typography>
                                        </div>
                                        <Grid container justify='center' className={classes.start}>
                                            <Button onClick={() => props.surveyClick([true, data.id])} style={{color: '#FFFF'}}>
                                                <Grid container>
                                                    <Typography style={{fontWeight: 'bold'}}>
                                                        Start
                                                    </Typography>
                                                    <ArrowForwardIosIcon/>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
};

export default ActiveSurveys;
