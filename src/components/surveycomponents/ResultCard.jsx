import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Button, Card, CardContent, Box, Avatar, Divider, useTheme} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '17rem',
    },
    wrap: {
        wordWrap: 'break-word',
        maxWidth: '400px',
    },
    box: {
        width: 'auto',
        height: '13rem',
        backgroundColor: '#306CDF',
        color: 'white',
        textAlign: 'center',
        padding: '.75rem',
    },
    summTitle: {
        margin: '5px',
        fontWeight: 'bold',
    },
    divider: {
        height: 2,
        backgroundColor: 'white',
        marginBottom: '10px',
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
    const [isLoaded, setIsLoaded] = useState(true);
    const [data, setData] = useState([]);
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    const theme = useTheme();
    const colors = [theme.palette.primary.main, theme.palette.secondary.main,
        theme.palette.info.main, theme.palette.error.main];

    useEffect(() => {
        fetch(`${apiLink}/api/survey/get_response`, {
            method: 'GET',
            credentials: 'include',
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
            <Grid container spacing={2}>
                {data.length !== 0 ? data.map((data, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item>
                                    <CardContent style={{height: '70px'}}>
                                        <div className={classes.wrap}>
                                            <Grid container>
                                                <Avatar alt={data.title} src={apiLink + data.image_url} className={classes.avatarSize}/>
                                                <Typography style={{fontWeight: 'bold', margin: '.55rem'}}>{data.title}</Typography>
                                            </Grid>
                                        </div>
                                    </CardContent>
                                </Grid>
                                <Grid item>
                                    <Box className={classes.box} style={{backgroundColor: `${colors[index]}`}}>
                                        <div style={{height: '80%'}} className={classes.cardContent} >
                                            <Typography className={classes.summTitle} variant='body1'>{data.summary_title}</Typography>
                                            <Divider className={classes.divider} variant='middle'/>
                                            <Typography>{data.description}</Typography>
                                        </div>
                                        <Grid container justify='center'>
                                            <Button style={{color: '#FFFF', borderColor: '#FFFF'}} onClick={() => props.setModal([true, data])} variant='outlined'>
                                                <Grid container>
                                                    <Typography style={{fontWeight: 'bold'}} >
                                                        View Survey
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
                )): <Typography style={{padding: '30px'}}>No Surveys Have Been Completed</Typography>}
            </Grid>
        );
    }
};

export default ActiveSurveys;
