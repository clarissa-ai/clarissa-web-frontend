import React from 'react';
import {useSelector} from 'react-redux';
import {profileSelector} from 'redux/selectors';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import {makeStyles} from '@material-ui/core';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    main: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
    },
    toolbar: theme.mixins.toolbar,
}));

const MainPage = (props) => {
    const profile = useSelector(profileSelector);
    const classes = useStyles();
    const location = useLocation();
    if (profile.authenticated && location.pathname !== '/404') {
        return (
            <div>
                <ResponsiveDrawer />
                <div className={classes.main}>
                    {props.children}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {props.children}
            </div>
        );
    }
};
export default MainPage;
