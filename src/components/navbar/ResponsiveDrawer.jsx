import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {useTheme, CssBaseline, Hidden, Avatar, makeStyles, Typography, Divider, Grid, Drawer} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import RenderRoutes from './RenderRoutes';
import {ReactComponent as LogoWithName} from './logoWithName.svg';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';

const drawerWidth = 240;

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
    /* {
        title: 'Doctor Portal',
        icon: <ChatBubbleOutlineOutlinedIcon/>,
        link: '/doctor-portal',
    },*/
    {
        title: 'Health Surveys',
        icon: <ViewWeekOutlinedIcon/>,
        link: '/surveys',
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
        link: '/login',
    },
];

const user = {
    name: 'Teo Nys',
    email: 'teo@nys.name',
    img: 'img.png',
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#fff',
        boxShadow: 'none',
        marginBottom: '3em'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: {
        minHeight: '0', 
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '6px 0px 18px rgba(0, 0, 0, 0.06)',
        border: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    name: {
        marginTop: '.25rem',
    },
    logo: {
        margin: '1rem',
        width: '8rem',
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
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <LogoWithName className={classes.logo}/>
            <Grid container spacing={2} className={classes.user} >
                <Grid item>
                    <Avatar alt={user.name} src={user.img} className={classes.avatarSize}/>
                </Grid>
                <Grid item className={classes.name}>
                    <Typography className={classes.bold}>{user.name}</Typography>
                    <Typography paragraph color='textSecondary' variant='caption'>{user.email}</Typography>
                </Grid>
            </Grid>
            <List>
                <RenderRoutes routes={routes}/>
                <Divider/>
                <RenderRoutes routes={extraRoutes}/>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Hidden mdUp implementation='css'>
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Hidden>
            <nav className={classes.drawer} aria-label="folders">
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css'>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default ResponsiveDrawer;
