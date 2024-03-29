import React, {useEffect, useState} from 'react';
import {Grid, Fade, Button, Typography, Box, makeStyles} from '@material-ui/core';
import PastIllnessCard from 'components/pastillness/PastIllnessCard';
import IllnessDataCard from 'components/pastillness/IllnessDataCard';
import TopBar from 'components/navbar/TopBar';
import SymptomItem from 'components/pastillness/SymptomItem';
import IllnessSummaryCard from 'components/pastillness/IllnessSummaryCard';
import DiagnosisItem from 'components/pastillness/DiagnosisItem';
import IllnessItem from 'components/pastillness/IllnessItem';

const PastIllnessPage = (props) => {
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [illnessList, setIllness] = useState([]);
    const [symptomList, setSymptoms] = useState([]);
    const [activeIllness, setActiveIllness] = useState({});
    const [activeDiagnosis, setActiveDiagnosis] = useState([]);
    const [selectedIllness, setSelectedIllness] = useState(0);

    useEffect(()=> {
        fetch(`${apiLink}/api/illness/get_illness_history`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then((res) => {
                setIllness(res.illnesses);
                setSymptoms(res.illnesses[0].symptoms);
                setActiveIllness(res.illnesses[0]);
                setActiveDiagnosis(res.illnesses[0].diagnosis);
            },
            (error) => {
                console.log(error);
            });
    }, [apiLink]);

    const handleCurrent = (index) => {
        setActiveIllness(illnessList[index]);
        setSymptoms(illnessList[index].symptoms);
        setActiveDiagnosis(illnessList[index].diagnosis);
        setSelectedIllness(index);
    };

    const useStyles = makeStyles((theme) => ({
        container: {
            background: '#EBEFF2',
            height: '100vh',
            maxHeight: 'inherit',
        },
        label: {
            paddingBottom: '1rem',
        },
        link: {
            color: '#000',
        },
    }));


    const classes = useStyles();

    return (
        <Fade in timeout={500}>
            <div className={classes.container}>
                <TopBar><Button color = 'primary' variant='contained' style = {{textTransform: 'none', marginLeft: 'auto',}} href = '/active-illness'>View Active Illness</Button></TopBar>
                <div className={classes.toolbar} />
                <Grid container direction = 'row' spacing = {0} justify='center' alignItems='stretch' style={{paddingTop: '1rem'}}>
                    <Grid item xs={12} md={7} l={7} xl={7}>
                        <Grid container direction='column'>
                            <Grid item>
                                <PastIllnessCard>
                                    {illnessList.map((illness, index) => {
                                        return <Grid item key={index} onClick={() => handleCurrent(index)}><IllnessItem index={illnessList.length - index} currIndex = {index} selectedIllness = {selectedIllness} status={false} title={illness.title} created_on={illness.created_on} updated_on={illness.updated_on} symptomCount={illness.symptoms.length}/></Grid>;
                                    })}
                                </PastIllnessCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} l={3} xl={3} style={{marginLeft: '1rem'}} >
                        <Grid container direction='column'>
                            <Grid item>
                                <IllnessDataCard>
                                    {/* <ButtonGroup color="primary" aria-label="outlined primary button group" size='medium'>
                                        <Button>Download Illness PDF</Button>
                                        <Button>Export Illness PDF</Button>
                                    </ButtonGroup> */}
                                    <IllnessSummaryCard name={activeIllness.created_on} created_on={activeIllness.created_on} updated_on={activeIllness.updated_on}></IllnessSummaryCard>
                                    <Typography variant='subtitle1'><Box fontWeight='bold'>Symptoms</Box></Typography>


                                    {symptomList.map((symptom, index) => {
                                        return <Grid item key={index}><SymptomItem title={symptom.symptom_json.common_name} date = {symptom.created_on} status={null}/></Grid>;
                                    })}

                                    <Typography variant='subtitle1'><Box fontWeight='bold'>Diagnosis</Box></Typography>

                                    {activeDiagnosis.map((diagnosis, index) => {
                                        return <Grid item key={index}><DiagnosisItem title={diagnosis.common_name}/></Grid>;
                                    })}

                                </IllnessDataCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Fade>
    );
};

export default PastIllnessPage;
