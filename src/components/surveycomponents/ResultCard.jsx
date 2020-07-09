import React /* ,{useState, useEffect}*/ from 'react';
import {Typography, Grid, makeStyles, Link, Card, CardContent, Box, Avatar, Divider, useTheme} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import datas from './results.json';
// import ResultModal from './ResultModal';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#FFF',
        height: '17rem',
        width: '25rem',
    },
    wrap: {
        wordWrap: 'break-word',
        maxWidth: '400px',
    },
    box: {
        width: '25rem',
        height: '13rem',
        backgroundColor: '#306CDF',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
    },
    summTitle: {
        padding: '10px',
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
}));

const ActiveSurveys = (props) => {
    const classes = useStyles();
    /* const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [data, setData] = useState([]);*/
    // const [showModal, setModal] = useState(false);
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const error = false;
    const isLoaded = true;

    const theme = useTheme();
    const colors = [theme.palette.primary.main, theme.palette.secondary.main,
        theme.palette.info.main, theme.palette.error.main];

    /* useEffect(() => {
        fetch(`${apiLink}/api/survey/get_results`, {
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
    }, [apiLink]);*/

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div></div>;
    } else {
        return (
            <Grid container spacing={2}>
                {datas.surveys.map((data, index) => (
                    <Grid item key={index}>
                        <Card className={classes.root}>
                            <Grid container>
                                <Grid item>
                                    <CardContent style={{height: '40px'}}>
                                        <div className={classes.wrap}>
                                            <Grid container>
                                                <Avatar alt={data.title} src={apiLink + data.image_url} className={classes.avatarSize}/>
                                                <Typography style={{fontWeight: 'bold', margin: '.65rem'}}>{data.title}</Typography>
                                            </Grid>
                                        </div>
                                    </CardContent>
                                </Grid>
                                <Grid item>
                                    <Box className={classes.box} style={{backgroundColor: `${colors[index]}`}}>
                                        <div style={{height: '80%'}}>
                                            <Typography className={classes.summTitle} variant='body1'>{data.summary_title}</Typography>
                                            <Divider className={classes.divider} variant='middle'/>
                                            <Typography>{data.description}</Typography>
                                        </div>
                                        <Grid container justify='center' className={classes.start}>
                                            <Link href={'survey/' + data.id} underline='none' style={{color: 'white'}}>
                                                <Grid container>
                                                    <Typography style={{fontWeight: 'bold'}} >
                                                        View Survey
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
                {/* {showModal? <ResultModal data={datas}/> : null} */}
            </Grid>
        );
    }
};

export default ActiveSurveys;
