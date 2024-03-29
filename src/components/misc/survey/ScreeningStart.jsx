import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Link, Button, Container} from '@material-ui/core';
import ScreeningQuestions from './ScreeningQuestions';
import TopBar from 'components/navbar/TopBar';
import {Link as RouterLink} from 'react-router-dom';

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
    underline: {
        textDecoration: 'underline',
    },
    belowMinutes: {
        paddingBottom: '1rem',
    },
    img: {
        width: '100px',
        height: '100px',
    },
}));

const ScreeningStart = (props) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [clicked, setClicked] = useState(false);
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    let idNum;
    if (props.id) {
        idNum = props.id;
    } else {
        idNum = parseInt(props.location.pathname.replace(props.match.path, '').substring(1));
    }

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
                                <img alt='linkImage' src={apiLink + data.image_url} className={classes.img}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" className={classes.underline}>{data.title}</Typography>
                                <Typography variant="body1" color="textPrimary">{data.description}</Typography>
                            </Grid>
                        </Grid>
                    </Link>
                </Grid>
            );
        });
    }

    useEffect(() => {
        fetch(`${apiLink}/api/survey/get_survey_by_id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': idNum}),
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
    }, [apiLink, idNum]);

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <div>
                <TopBar>
                    <Link to={'/surveys'} component={RouterLink}>
                        <Button color='primary' variant="contained" style={{textTransform: 'none'}}>
                            Close
                        </Button>
                    </Link>
                </TopBar>
                {clicked ? <ScreeningQuestions data={data} idNum={idNum} email={props.email}/> :
                    <Container>
                        <Grid container justify="center">
                            <Grid container justify="center" className={classes.start}>
                                <img alt='centerImage' src={apiLink + data.image_url} style={{width: '175px', height: '175px'}}/>
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
                                <Typography paragraph variant="body2" color="textSecondary" className={classes.belowMinutes}>
                                        Approximately {data.question_count/2} Minutes
                                </Typography>
                            </Grid>
                            <Grid container spacing={6}>
                                {displayLinks}
                            </Grid>
                        </Grid>
                    </Container>
                }
            </div>
        );
    }
};
export default ScreeningStart;
