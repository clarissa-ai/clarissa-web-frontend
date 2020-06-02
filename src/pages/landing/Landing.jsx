import React from 'react';
import {Grid, AppBar, Toolbar, Link, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReactComponent as Logo} from './Logo.svg';

const useStyles = makeStyles((theme) => ({
    appbarLinks: {
        margin: theme.spacing(2),
    },
    appbarButtons: {
        margin: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: 35,
        textTransform: 'none',
    },
}));

const NavLink = (props) => {
    const classes = useStyles();
    return (
        <Link className={classes.appbarLinks} component={RouterLink} underline='none' to={props.to}>{props.children}</Link>
    );
};

NavLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

const NavButton = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.appbarButtons} size='small' variant='outlined' style={{borderRadius: 35}}>{props.children}</Button>
    );
};

NavButton.propTypes = {
    children: PropTypes.node.isRequired,
};

const Landing = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} elevation={0} color='transparent'>
            <Toolbar>
                <Grid container direction='row' justify='space-between' spacing={10}>
                    <Grid item>
                        <Logo/>
                    </Grid>
                    <Grid item>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/features'>Features</NavLink>
                        <NavLink to='/diagnosis'>Diagnosis</NavLink>
                        <NavLink to='/us'>Our Team</NavLink>
                        <NavButton>Register</NavButton>
                        <NavButton>Login</NavButton>
                    </Grid>
                </Grid>
                <div>
                </div>
            </Toolbar>
        </AppBar>
    );
};
export default Landing;
