import React, {useEffect, useState} from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade, Button, Typography, Box,  makeStyles, ButtonGroup} from '@material-ui/core';
import PastIllnessCard from 'components/pastillness/PastIllnessCard';
import IllnessDataCard from 'components/pastillness/IllnessDataCard';
import TopBar from 'components/navbar/TopBar';
import SymptomItem from 'components/pastillness/SymptomItem';
import IllnessSummaryCard from 'components/pastillness/IllnessSummaryCard';
import DiagnosisItem from 'components/pastillness/SymptomItem';
import IllnessItem from 'components/pastillness/IllnessItem';

const PastIllnessPage = (props) => {
    const apiLink = process.env.REACT_APP_ENDPOINT_BASE;
    const [illnessList, setIllness] = useState([]);
    const [symptomList, setSymptoms] = useState([]);
    const [activeIllness, setActiveIllness] = useState({});
    const [activeDiagnosis, setActiveDiagnosis] = useState([]);
 
    useEffect(()=> {
        fetch(`${apiLink}/api/illness/get_illness_history`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },})
        .then(res => res.json())
        .then(res => {
                console.log(res);
                setIllness(res.illnesses);
                setSymptoms(res.illnesses[0].symptoms);
                setActiveIllness(res.illnesses[0]);
                setActiveDiagnosis(res.illnesses[0].diagnosis);
        },
        (error) => {
                console.log(error);
        },);
    }, [apiLink])
    
    const handleCurrent = (index) => {
        setActiveIllness(illnessList[index]);   
        setSymptoms(illnessList[index].symptoms);
        setActiveDiagnosis(illnessList[index].diagnosis);
    }

    const useStyles = makeStyles((theme) => ({
        miniBox: {
            height: '20rem'
        },
        container: {
            paddingTop: '6rem',
            background: '#EBEFF2',
            height: '100vh',
            
        },
        topContainer: {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            background: '#2C3C56',
            padding: '1rem 3rem',
            borderRadius: '4px',
            color: '#fff',

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
        <div className = {classes.container}> 
            <Grid container direction = 'row' spacing = {0} justify = 'center' alignitems = 'stretch' alignContent = 'stretch'>
                <Grid item><TopBar><Button color = 'primary' variant = "contained" style = {{textTransform: 'none'}} href = '/active-illness'>View Active Illness</Button></TopBar></Grid>
                <Grid Item><ResponsiveDrawer/></Grid>
            <Grid item xs = {12} md = {6} xl = {7} style = {{marginLeft: '1rem'}}>
                <Grid container direction = 'column' spacing = {2}>
                    <Grid item>
                        <div className = {classes.topContainer}> 
                            <Typography variant = 'h6'><Box fontWeight = 'bold'> Past Illlnesses Page </Box></Typography>
                            <Typography variant = 'subtitle2' style = {{opacity: '.7'}}> Here you can see past looged illnesses aswell as export them</Typography>
                        </div>
                    </Grid> 
                    <Grid item> 
                        <PastIllnessCard>
                            {illnessList.map((illness, index) => {
                                return <Grid item onClick={() => handleCurrent(index)}><IllnessItem index = {illnessList.length - index} title = 'Illness #' created_on = {illness.created_on} updated_on = {illness.updated_on} date ={`${illness.created_on} - ${illness.updated_on}`} symptomCount = {illness.symptoms.length} /> </Grid>
                            })}
                        </PastIllnessCard>

                    </Grid>
                </Grid>
            </Grid>
            
             <Grid item xs = {12} md = {3} xl = {3} style = {{marginLeft: '1rem'}}> 
                <Grid container direction = 'column' spacing = {2}>
                    <Grid item> 
                        <IllnessDataCard>
                            <ButtonGroup color="primary" style = {{paddingBottom: '5rem'}} aria-label="outlined primary button group">
                                <Button>Download Illness PDF</Button>
                                <Button>Export Illness PDF</Button>
                            </ButtonGroup>
                            <IllnessSummaryCard name = {activeIllness.created_on} created_on = {activeIllness.created_on} updated_on = {activeIllness.updated_on}>
                            </IllnessSummaryCard>
                            <Grid item><Typography vairant = 'h5'><Box fontWeight = 'bold' style = {{paddingBottom: '1rem'}}>Symptoms</Box></Typography></Grid>
    
                            
                            {symptomList.map((symptom, index) => {
                                console.log(symptom)
                                return <Grid item><SymptomItem title={symptom.symptom_json.common_name} status={null}/></Grid>
                            })}

                            <Grid item><Typography vairant = 'h5'><Box fontWeight = 'bold' style = {{paddingBottom: '1rem'}}>  Diagnoses </Box></Typography></Grid>

                            {activeDiagnosis.map((diagnosis, index) => {
                                return <Grid item><DiagnosisItem title = {diagnosis.common_name}/></Grid>
                            })}
                            
                        </IllnessDataCard>


                    </Grid>

                </Grid> 
            </Grid>
            

            </Grid>
        </div>
    </Fade>
}

export default PastIllnessPage;
