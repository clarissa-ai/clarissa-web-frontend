import React from 'react';
import {Avatar, makeStyles, Typography, Drawer, Divider, Grid} from '@material-ui/core';
import RenderRoutes from './RenderRoutes';
import {ReactComponent as LogoWithName} from './logoWithName.svg';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '18vw',
        background: '#fff',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        border: 'none',
        overflow: 'hidden',
    },
    name: {
        marginTop: '.25rem',
    },
    logo: {
        marginLeft: '1.25rem',
        marginTop: '.5rem',
        marginBottom: '1rem',
        width: '7.5rem',
        height: '4.375rem',
        flexShrink: 0,
    },
    user: {
        paddingLeft: '1.5rem',
    },
    avatarSize: {
        width: '3rem',
        height: '3rem',
        fontWeight: 600,
    },
    bold: {
        fontWeight: 600,
    },
}));

const routes = [
    {
        title: 'Dashboard',
        icon: <DashboardOutlinedIcon/>,
        link: '/dashboard',
    },
    {
        title: 'Active Illness',
        icon: <ViewAgendaOutlinedIcon/>,
        link: '/active-illness',
    },
    {
        title: 'Past Illnesses',
        icon: <MailOutlineOutlinedIcon/>,
        link: '/past-illnesses',
    },
    {
        title: 'Medical History',
        icon: <PersonOutlineOutlinedIcon/>,
        link: '/medical-history',
    },
    {
        title: 'Doctor Portal',
        icon: <ChatBubbleOutlineOutlinedIcon/>,
        link: '/doctor-portal',
    },
    {
        title: 'Patient Profile',
        icon: <ViewWeekOutlinedIcon/>,
        link: '/patient-profile',
    },
];

const extraRoutes = [
    {
        title: 'Settings',
        icon: <MoreHorizIcon/>,
        link: '/settings',
    },
    {
        title: 'Logout',
        icon: <ExitToAppIcon/>,
        link: '/logout',
    },
];

const SideNavBar = (props) => {
    const classes = useStyles();

    // use input from props later on for user information
    const user = {
        name: 'Teo Nys',
        email: 'teo@nys.name',
        img: 'img.png',
    };

    return (
        <Drawer variant='permanent' anchor='left' classes={{paper: classes.drawer}}>
            <LogoWithName className={classes.logo}/>
            <Grid container spacing={2} className={classes.user}>
                <Grid item>
                    <Avatar alt={user.name} src={user.img} className={classes.avatarSize}/>
                </Grid>
                <Grid item className={classes.name}>
                    <Typography className={classes.bold}>{user.name}</Typography>
                    <Typography paragraph color='textSecondary' variant='caption'>{user.email}</Typography>
                </Grid>
            </Grid>
            <RenderRoutes routes={routes}/>
            <Divider/>
            <RenderRoutes routes={extraRoutes}/>
        </Drawer>
    );
};

export default SideNavBar;
