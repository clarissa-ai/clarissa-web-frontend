import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Typography, makeStyles, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

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
        <Link {...props}/>
    </div>
));

ConstructRoutes.displayName = 'ConstructRoutes';

const RenderRoutes = (props) => {
    const classes = useStyles();
    const routes = props.routes;


    RenderRoutes.propTypes = {
        routes: PropTypes.object,
    };

    return (
        <List>
            {routes.map((route, index) => (
                <ListItem key={index}>
                    <Button activeClassName={classes.active} className={classes.button} component={ConstructRoutes} to={route.link}>
                        <div className={classes.icon}>{route.icon}</div>
                        <Typography variant='body2' className={classes.name}>{route.title}</Typography>
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};

export default RenderRoutes;
