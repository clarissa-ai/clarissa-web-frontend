import React, {useState, useEffect} from 'react';
import {Typography, Grid, makeStyles, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    start: {
        paddingTop: '5rem',
        paddingBottom: '1rem',
    },
    spacing: {
        paddingTop: '3rem',
    },
}));

const ScreeningResult = (props) => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const apiLink = 'http://dev.clarissa.ai:5000';
    const summIndex = props.idx;

    if (data.summaries) {
        // eslint-disable-next-line no-var
        var displayImage = <img src={apiLink + data.summaries[summIndex].image_url}/>;
        // eslint-disable-next-line no-var
        var displayTitle = data.summaries[summIndex].title;
        // eslint-disable-next-line no-var
        var displaySummary = data.summaries[summIndex].info_groups.map((data, index) => {
            return (
                <Grid item xs={6} key={index}>
                    <Grid container>
                        <Grid item>
                            <Typography color="primary" variant="body1">{data.title}</Typography>
                            {data.details.map((data, index) => {
                                return <Typography variant="body1" color="textPrimary" key={index}>- {data}</Typography>;
                            })}
                        </Grid>
                    </Grid>
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
    } else {
        return (
            <Container>
                <Grid container>
                    <Grid container className={classes.start}>
                        {displayImage}
                    </Grid>
                    <Grid container>
                        <Typography variant="body1" paragraph>Recommendation</Typography>
                    </Grid>
                    <Grid container>
                        <Typography variant="h4" color="primary" paragraph>{displayTitle}</Typography>
                    </Grid>
                    <Grid container spacing={6} direction="row">
                        {displaySummary}
                    </Grid>
                </Grid>
            </Container>
        );
    }
};
export default ScreeningResult;
