import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewIdea } from '../ideaManagementSlice';
import ReactPlayer from 'react-player/youtube'
import { startLoading, stopLoading } from './../../../app/loadingSlice';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {new Date().getFullYear()}
            {' '}
            {'POWERED BY '}
            <Link color="inherit" target="_blank" href="https://www.facebook.com/webdevstudios.org">
                WEBDEV STUDIOS
      </Link>{'.'}

        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "100%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: theme.spacing(1),
        width: theme.spacing(15),
    },
    avatar: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
}));



export default function Checkout() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ideaDetail, setIdeaDetail] = useState({
        groupName: "",
        ideaContent: "",
        ideaVideo: "",
        ideaType: "",
        linkToManagerSocial: "",
        groupAvatar: "",
    })
    const Button_Clear_Click = () => {
        setIdeaDetail({
            groupName: "",
            ideaContent: "",
            ideaVideo: "",
            ideaType: "",
            linkToManagerSocial: "",
            groupAvatar: "",
        });
    }
    const Button_OnSave_Click = () => {
        dispatch(startLoading());
        dispatch(addNewIdea(ideaDetail)).then(
            () => {
                dispatch(stopLoading());
            }
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Soạn ý tưởng
                </Typography>
                    <div className={classes.grow} />
                    {/* <div className={classes.sectionDesktop}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={Button_Clear_Click}
                        >
                                    Làm mới
                                </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={Button_OnSave_Click}
                        >
                                    Lưu
                                </Button>
                    </div> */}
                    <Button
                        variant="contained"
                        onClick={Button_Clear_Click}
                        className={classes.button}
                    >Làm mới </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={Button_OnSave_Click}
                    >
                        Lưu
                                </Button>
                </Toolbar>

            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>

                    <React.Fragment>

                        <React.Fragment>
                            <React.Fragment>
                                {/* <Typography variant="h6" gutterBottom>
                                    Shipping address
                                </Typography> */}
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={1} alignContent="center" alignItems="center"
                                    // alignContent="flex-end"
                                    >
                                        <Avatar
                                            className={classes.avatar}
                                            src={ideaDetail.groupAvatar} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="Avatar nhóm"
                                            fullWidth
                                            value={ideaDetail.avatar}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, groupAvatar: e.target.value });
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="Tên nhóm"
                                            fullWidth
                                            autoComplete="given-name"
                                            value={ideaDetail.groupName}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, groupName: e.target.value });
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="Link facebook nhóm trưởng"
                                            fullWidth
                                            value={ideaDetail.linkToManagerSocial}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, linkToManagerSocial: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={6} /> */}



                                    <Grid item xs={12}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            label="Thể loại ý tưởng"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="filled"
                                            value={ideaDetail.ideaType}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, ideaType: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address1"
                                            name="address1"
                                            label="Nội dung ý tưởng"
                                            fullWidth
                                            autoComplete="shipping address-line1"
                                            multiline
                                            variant="filled"
                                            value={ideaDetail.ideaContent}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, ideaContent: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="Link Video mô tả"
                                            fullWidth
                                            autoComplete="shipping address-level2"
                                            value={ideaDetail.ideaVideo}
                                            onChange={(e) => {
                                                setIdeaDetail({ ...ideaDetail, ideaVideo: e.target.value });
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <iframe id="inlineFrameExample"
                                            title="Inline Frame Example"
                                            width="300"
                                            height="200"
                                            src={ideaDetail.ideaVideo}>
                                        </iframe>
                                        {/* <ReactPlayer controls="true" url={ideaDetail.ideaVideo} /> */}
                                    </Grid>



                                </Grid>
                            </React.Fragment>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}
