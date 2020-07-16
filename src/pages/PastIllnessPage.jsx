import React, {useEffect, useState} from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles} from '@material-ui/core';
import PastIllnessCard from 'components/pastillness/PastIllnessCard';
import PastSymptomCard from 'components/pastillness/PastSymptomCard';
import TopBar from 'components/navbar/TopBar';
import SymptomItem from 'components/pastillness/SymptomItem';

const PastIllnessPage = (props) => {
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [illnessList, setIllness] = useState([]);
    const [symptomList, setSymptoms] = useState([]);

    useEffect(()=> {
        fetch(`${apiLink}/api/illness/get_illness_history`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },})
        .then(res => res.json())
        .then(res => {
                setIllness(res.illnesses);
                setSymptoms(res.illnesses[0].symptoms);
        },
        (error) => {
                console.log(error);
        },);
    }, [apiLink])

    const handleSymptoms = (index) => {
        setSymptoms(illnessList[index].symptoms);
    }

    const useStyles = makeStyles((theme) => ({
        miniBox: {
            height: '20rem'
        },
        container: {
            width: '100vw',
            background: '#F5F6F8',
            paddingTop: '5rem',
            padding: '2rem',
            
        },
        label: {
            paddingBottom: '1rem',
        },
        link: {
            color: '#000',
        },
    }));
    

    const classes = useStyles();

    return <Fade in timeout={500}>
        <Grid container justify='center' alignItems='center' direction='row' spacing={2} className={classes.container} alignContent='stretch'>
            <Grid item><ResponsiveDrawer/></Grid>
            <Grid item>
                <TopBar>
                    <Button color='primary' variant='contained' href='/active-illness'>View Active Illness</Button>
                </TopBar>
                </Grid>
            <Grid item>
                <PastIllnessCard>
                    {console.log(illnessList)}
                    {illnessList.map((illness, index) => {
                        // console.log(illness.created_on, illness.active, illness.symptoms)
                        return <Grid item onClick={() => handleSymptoms(index)}><SymptomItem title='' status={null} date={illness.created_on} active={illness.active}/></Grid>
                    })}
                </PastIllnessCard>
            </Grid>
            <Grid item>
                <PastSymptomCard>
                    {symptomList.map((symptom, index) => {
                        console.log(symptom)
                        return <Grid item><SymptomItem title={symptom.symptom_json.common_name} status={null}/></Grid>
                    })}
                </PastSymptomCard>
            </Grid>
        </Grid>
    </Fade>
}

export default PastIllnessPage;
