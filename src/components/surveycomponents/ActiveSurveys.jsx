import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Link, Card, CardContent, Box, Avatar, useTheme} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
    },
    root: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '12em',
    },
    wrap: {
        wordWrap: 'break-word',
        maxWidth: '400px',
    },
    box: {
        width: '6em',
        height: '12em',
        float: 'right',
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
                    <Grid item key={index}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item>
                                    <CardContent>
                                        <div className={classes.wrap}>
                                            <Grid container style={{marginBottom: '.5rem'}}>
                                                <Avatar alt={data.title} src={apiLink + data.image_url} className={classes.avatarSize}/>
                                                <Typography style={{fontWeight: 'bold', margin: '.65rem'}}>{data.title}</Typography>
                                            </Grid>
                                            <Typography variant='subtitle2'>{data.description}</Typography>
                                        </div>
                                    </CardContent>
                                </Grid>
                                <Grid item>
                                    <Box className={classes.box} style={{backgroundColor: `${colors[index]}`}}>
                                        <div style={{height: '75%'}}>
                                            <Typography className={classes.questions} variant='h6'>{data.question_count}</Typography>
                                            <Typography style={{fontWeight: 'bold'}} variant='body2'>Questions</Typography>
                                        </div>
                                        <Grid container justify='center' className={classes.start}>
                                            <Link href={'survey/' + data.id} underline='none' style={{color: 'white'}}>
                                                <Grid container>
                                                    <Typography style={{fontWeight: 'bold'}}>
                                                        Start
                                                    </Typography>
                                                    <ArrowForwardIosIcon/>
                                                </Grid>
                                            </Link>
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
