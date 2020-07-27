import React from 'react';
import {Grid, AppBar, Toolbar, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#fff',
        boxShadow: 'none',
    },
}));

const TopBar = (props) => {
    const classes = useStyles();
    return <AppBar className={classes.container}>
        <Toolbar>
            <Grid container justify='flex-end' spacing={2}>
            <Grid item>{props.children}</Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}
export default TopBar;