import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Button, Card, CardContent, Box} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '290px',
        maxWidth: 'auto',
    },
    overall: {
        wordWrap: 'break-word',
        maxWidth: '500px',
        marginTop: '8px',
    },
    box: {
        width: '200px',
        height: '290px',
    },
    imgSize: {
        width: '600px',
        align: 'right',
    },
}));

const MainSurvey = (props) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;

    useEffect(() => {
        fetch(`${apiLink}/api/survey/get_main_survey`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result.survey);
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
            <Card className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item>
                        <div className={classes.overall}>
                            <CardContent style={{height: '190px'}}>
                                <Typography paragraph style={{fontWeight: 'bold'}} variant='h5'>{data.title}</Typography>
                                <Typography >{data.description}</Typography>
                            </CardContent>
                            <CardContent>
                                <Grid container>
                                    <Typography style={{fontWeight: 'bold', width: '380px'}}>{data.question_count + ' '}Questions</Typography>
                                    <Button onClick={() => props.surveyClick([true, data.id])}>
                                        <Grid container>
                                            <Typography style={{fontWeight: 'bold'}}>
                                                Start
                                            </Typography>
                                            <ArrowForwardIosIcon/>
                                        </Grid>
                                    </Button>
                                </Grid>
                            </CardContent>
                        </div>
                    </Grid>
                    <Box className={classes.box}>
                        <img src={apiLink + data.cover_image_url} alt={'Cover'} className={classes.imgSize}/>
                    </Box>
                </Grid>
            </Card>
        );
    }
};

export default MainSurvey;
