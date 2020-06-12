import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Grid, makeStyles, Container, Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    start: {
        paddingTop: '4rem',
        paddingBottom: '1rem',
    },
    spacing: {
        paddingTop: '3rem',
    },
    mainDescription: {
        paddingBottom: '3rem',
    },
    underline: {
        textDecoration: 'underline',
    },
}));

const ScreeningResult = (props) => {
    const classes = useStyles();
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const summIndex = props.idx;
    const data = props.data;

    ScreeningResult.propTypes = {
        idx: PropTypes.number,
        data: PropTypes.object,
    };

    const displayImage = <img src={apiLink + data.summaries[summIndex].image_url}/>;
    const displayDescription = data.summaries[summIndex].description;
    const displayTitle = data.summaries[summIndex].title;

    const displaySummary = data.summaries[summIndex].info_groups.map((data, index) => {
        return (
            <Grid item xs={6} key={index}>
                <Grid container>
                    <Grid item>
                        <Link underline="none" href={data.link_URL}>
                            <Typography color="primary" variant="h6">{data.title}</Typography>
                            {data.details.map((data, index) => {
                                return <Typography variant="body1" color="textPrimary" key={index}>- {data}</Typography>;
                            })}
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        );
    });

    return (
        <Container>
            <Grid container>
                <Grid container className={classes.start}>
                    {displayImage}
                </Grid>
                <Grid container>
                    <Typography variant="h4" color="primary">{displayTitle}</Typography>
                </Grid>
                <Grid container>
                    <Typography variant="body1" className={classes.mainDescription}>{displayDescription}</Typography>
                </Grid>
                <Grid container spacing={6} direction="row">
                    {displaySummary}
                </Grid>
            </Grid>
        </Container>
    );
};
export default ScreeningResult;
