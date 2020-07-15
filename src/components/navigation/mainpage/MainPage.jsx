import React from 'react';
import {useSelector} from 'react-redux';

import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    main: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
    },
}));

const MainPage = (props) => {
    const profile = useSelector(profileSelector);
    const classes = useStyles();
    return (
        profile.authenticated ? <div>
            <ResponsiveDrawer />
            <div className={classes.main}>
                {props.children}
            </div>
        </div> :
            <div className={classes.main}>
                {props.children}
            </div>
    );
};
export default MainPage;
