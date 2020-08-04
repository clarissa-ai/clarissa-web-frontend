import React from 'react';
import {Grid, AppBar, Toolbar, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#fff',
        paddingRight: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

const TopBar = (props) => {
    const classes = useStyles();
    return <AppBar position='relative' style={{boxShadow: 'none'}}>
        <Toolbar className={classes.container}>
               {props.children}
        </Toolbar>
    </AppBar>;
};
export default TopBar;
