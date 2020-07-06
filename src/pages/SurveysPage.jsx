import React from 'react';
import MainSurvey from 'components/surveycomponents/MainSurvey';
import {Fade, Grid} from '@material-ui/core';

const SurveysPage = (props) => {
        return <Grid container>
            <Grid item>
                <MainSurvey/>
            </Grid>
    </Grid>
}

export default SurveysPage;