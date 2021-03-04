import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Link, Redirect, Route,
    Switch,
} from 'react-router-dom';

import { logOut } from './../../features/signIn/signInSlice';
import LoadingComponent from "./../LoadingPage/LoadingPage";
import { useStyles } from './Dashboard.style';




const PostList = lazy(() => import('./../../features/postManagement/View/PostList'));
const PostForm = lazy(() => import('./../../features/postManagement/View/PostForm'));
const IdeaStatistics = lazy(() => import('./../../features/ideaStatistics/View/IdeaStatistics'));


export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Button_Logout_Click = () => {
        // history.push("Dashboard/");
        dispatch(logOut());

    }

    return (
        <Suspense fallback={<LoadingComponent />}>
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                CUỘC THI Ý TƯỞNG KHỞI NGHIỆP - SÁNG TẠO OEP 2020
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton aria-label="show 4 new mails" color="inherit" onClick={Button_Logout_Click}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <Link to="/Dashboard/PostList" style={{ textDecoration: "none", color: "black" }}>
                                <ListItem button>
                                    <ListItemIcon><EqualizerIcon /></ListItemIcon>
                                    <ListItemText primary="Danh sách ý tưởng" />
                                </ListItem>
                            </Link>

                            <Link to="/Dashboard/PostForm" style={{ textDecoration: "none", color: "black" }}>
                                <ListItem button>
                                    <ListItemIcon><EditAttributesIcon /></ListItemIcon>
                                    <ListItemText primary="Thêm ý tưởng" />
                                </ListItem>
                            </Link>

                            {/* <Link to="/Dashboard/IdeaStatistics" style={{ textDecoration: "none", color: "black" }}>
                                <ListItem button>
                                    <ListItemIcon><EqualizerIcon /></ListItemIcon>
                                    <ListItemText primary="Thống kê" />
                                </ListItem>
                            </Link> */}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Redirect to="/Dashboard/PostList" />
                        <Switch>
                            <Route path="/Dashboard/PostList" component={PostList} />
                            <Route path="/Dashboard/PostForm" component={PostForm} />
                            <Route path="/Dashboard/IdeaStatistics" component={IdeaStatistics} />
                        </Switch>
                    </main>
                </div>


            </Router>
        </Suspense>

    );
}