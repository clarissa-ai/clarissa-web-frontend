import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Typography, makeStyles, Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {setProfile} from 'redux/actions';
import {profileSelector} from 'redux/selectors';

const useStyles = makeStyles((theme) => ({
    name: {
        marginLeft: theme.spacing(2),
        fontWeight: 600,
    },
    icon: {
        color: theme.palette.text.secondary,
        alignItems: 'center',
        display: 'flex',
    },
    active: {
        'color': theme.palette.primary.main,
        '& $icon': {
            color: theme.palette.primary.main,
        },
    },
    button: {
        justifyContent: 'start',
        textTransform: 'none',
        width: '100%',
        paddingLeft: theme.spacing(1),
    },
}));

const ConstructRoutes = forwardRef((props, ref) => (
    <div ref={ref} style={{flexGrow: 1}}>
        <NavLink {...props}/>
    </div>
));

ConstructRoutes.displayName = 'ConstructRoutes';

const RenderRoutes = (props) => {
    const classes = useStyles();
    const routes = props.routes;

    RenderRoutes.propTypes = {
        routes: PropTypes.object,
    };

    const profile = useSelector(profileSelector);
    const dispatch = useDispatch();

    const logout = (link) => {
        profile.logout((newProfile) => {
            dispatch(setProfile(newProfile));
            console.log(newProfile);
        });
    };

    const displayLinks = (route) => {
        if (route.link !== '/login') {
            return (
                <Button activeClassName={classes.active} className={classes.button} component={ConstructRoutes} to={route.link}>
                    <div className={classes.icon}>{route.icon}</div>
                    <Typography variant='body2' className={classes.name}>{route.title}</Typography>
                </Button>
            );
        } else {
            return (
                <Button activeClassName={classes.active} className={classes.button} component={ConstructRoutes} to={route.link} onClick={() => logout(route.link)}>
                    <div className={classes.icon}>{route.icon}</div>
                    <Typography variant='body2' className={classes.name}>{route.title}</Typography>
                </Button>
            );
        }
    };

    return (
        <List>
            {routes.map((route, index) => (
                <ListItem key={index}>
                    {displayLinks(route)}
                </ListItem>
            ))}
        </List>
    );
};

export default RenderRoutes;
