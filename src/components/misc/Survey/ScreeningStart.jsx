import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Link, Button, Container} from '@material-ui/core';
import ScreeningQuestions from './ScreeningQuestions';

const useStyles = makeStyles((theme) => ({
    start: {
        paddingTop: '4rem',
        paddingBottom: '1rem',
    },
    spacing: {
        paddingTop: '1rem',
    },
    wordWrap: {
        wordWrap: 'break-word',
        maxWidth: '40rem',
        textAlign: 'center',
    },
    rootButton: {
        width: '14rem',
    },
    labelButton: {
        textTransform: 'capitalize',
    },
}));

const ScreeningStart = () => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [clicked, setClicked] = useState(false);
    const apiLink = 'http://dev.clarissa.ai:5000';

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(true);
    };

    if (data.links) {
        // eslint-disable-next-line no-var
        var displayLinks = (data.links).map((data, index) => {
            return (
                <Grid item xs={6} key={index}>
                    <Link underline="none" href={data.link}>
                        <Grid container spacing={1} justify="center">
                            <Grid item>
                                <img src={apiLink + data.image_url}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Link underline="always" href={data.link}>
                                    <Typography variant="body1">{data.title}</Typography>
                                </Link>
                                <Typography variant="body1" color="textPrimary">{data.description}</Typography>
                            </Grid>
                        </Grid>
                    </Link>
                </Grid>
            );
        });
    }

    useEffect(() => {
        fetch('http://dev.clarissa.ai:5000/api/survey/get_survey_by_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': 1}),
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
    }, []);

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else if (!clicked) {
        return (
            <Container>
                <Grid container justify="center">
                    <Grid container justify="center" className={classes.start}>
                        <img src={apiLink + data.image_url}/>
                    </Grid>
                    <Grid container justify="center">
                        <Typography variant="h4" color="primary" paragraph>{data.title}</Typography>
                    </Grid>
                    <Grid>
                        <Typography paragraph className={classes.wordWrap}>{data.description}</Typography>
                    </Grid>
                    <Grid container justify="center" className={classes.spacing}>
                        <Button variant="contained" color="primary" size="large" classes={{root: classes.rootButton, label: classes.labelButton}} onClick={handleClick}>
                            <Typography variant="body1">Start Screening</Typography>
                        </Button>
                    </Grid>
                    <Grid container justify="center">
                        <Typography paragraph variant="body2" color="textSecondary">Approximately {data.question_count/2} Minutes</Typography>
                    </Grid>
                    <Grid container spacing={6}>
                        {displayLinks}
                    </Grid>
                </Grid>
            </Container>
        );
    } else {
        return <ScreeningQuestions data={data}/>;
    }
};
export default ScreeningStart;
