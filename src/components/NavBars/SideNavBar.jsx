import React from 'react';
import {Avatar, makeStyles, Typography, Drawer, Divider, Grid, createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
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

const contrastText = '#2C3C56';
let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#306DDF',
            contrastText: '#ffff',
        },
        secondary: {
            main: '#FEAD18',
            contrastText: contrastText,
        },
        error: {
            main: '#F46D66',
            contrastText: contrastText,
        },
        info: {
            main: '#7064D0',
            contrastText: contrastText,
        },
        success: {
            main: '#47C594',
            contrastText: contrastText,
        },
        background: '#F5F8FF',
        text: {
            primary: '#2C3C56',
            secondary: '#90A0B7',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 256,
        flexShrink: 0,
    },
    name: {
        marginTop: theme.spacing(1),
    },
    logo: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
        flexShrink: 0,
    },
    user: {
        paddingLeft: theme.spacing(3),
    },
    avatarSize: {
        width: theme.spacing(6),
        height: theme.spacing(6),
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
        link: '/dasboard',
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

    const user = {
        name: 'Teo Nys',
        email: 'teo@nys.name',
        img: 'img.png',
    };

    return (
        <ThemeProvider theme={theme}>
            <Drawer variant='permanent' anchor='left' classes={{paper: classes.drawer}}>
                <LogoWithName className={classes.logo}/>
                <Grid container spacing={2} className={classes.user}>
                    <Grid item>
                        <Avatar alt={user.name} src={user.img} className={classes.avatarSize}/>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.bold}>{user.name}</Typography>
                        <Typography paragraph color='textSecondary' variant='caption'>{user.email}</Typography>
                    </Grid>
                </Grid>
                <RenderRoutes routes={routes}/>
                <Divider/>
                <RenderRoutes routes={extraRoutes}/>
            </Drawer>
        </ThemeProvider>
    );
};

export default SideNavBar;