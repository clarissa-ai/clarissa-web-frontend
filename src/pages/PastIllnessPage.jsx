import React, {useEffect, useState} from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, makeStyles} from '@material-ui/core';
import PastIllnessCard from 'components/pastillness/PastIllnessCard';
import PastSymptomCard from 'components/pastillness/PastSymptomCard';
import TopBar from 'components/navbar/TopBar';
import InfoCard from 'components/dashboard/InfoCard';

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
        symptoms: {
            background: '#fff',
            height: '20rem'
        },
        container: {
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

    return <Fade in timeout={1000}>
        <Grid container justify='center' alignItems='center' direction='row' className={classes.container}>
            <Grid item><ResponsiveDrawer/></Grid>
            <Grid item>
                <TopBar>
                    <Button variant='filled'>View Active Illness</Button>
                </TopBar>
                </Grid>
            <Grid item xs={6}>
                <PastIllnessCard>
                    {console.log(illnessList)}
                    {illnessList.map((illness, index) => {
                        // console.log(illness.created_on, illness.active, illness.symptoms)
                        return <Grid item><InfoCard title='' status={null} date={illness.created_on} active={illness.active} onClick={() => handleSymptoms(index)}/></Grid>
                    })}
                </PastIllnessCard>
            </Grid>
            <Grid item xs={4}>
                <PastSymptomCard className={classes.symptoms}>
                    {symptomList.map((symptom, index) => {
                        console.log(symptom)
                        return <Grid item><InfoCard title={symptom.symptom_json.common_name} status={null}/></Grid>
                    })}
                </PastSymptomCard>
            </Grid>
        </Grid>
    </Fade>
}

export default PastIllnessPage;
