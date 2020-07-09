import React from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade} from '@material-ui/core';
import PastIllnessCard from 'components/pastillness/PastIllnessCard';

const PastIllnessPage = (props) => {
    return <Fade in timeout={1000}>
        <Grid container justify='center' alignItems='center'>
            <Grid item><ResponsiveDrawer/></Grid>
            <Grid item>
                <PastIllnessCard>
                </PastIllnessCard>
            </Grid>
        </Grid>
    </Fade>
}

export default PastIllnessPage;
