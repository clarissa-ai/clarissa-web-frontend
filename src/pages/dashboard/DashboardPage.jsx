import React from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {Grid, Fade} from '@material-ui/core';

const DashboardPage = (props) => {
    return <Fade in timeout={1000}>
    <Grid container>
        <Grid item>
            <ResponsiveDrawer/>
        </Grid>
    </Grid>
</Fade>
}
export default DashboardPage;
