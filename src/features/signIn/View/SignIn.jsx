import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './SignIn.styles';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from './../signInSlice';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

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



export default function SignInSide() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();

    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isLogin = useSelector(state => state.signIn.isLogin);

    let { from } = location.state || {
        from: { pathname: '/Dashboard' },
    };

    React.useEffect(() => {
        // history.push("Dashboard/");
        if (isLogin) {
            setRedirectToReferrer(true);
        }
    }, [isLogin]);

    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }

    const ButtonSignIn_OnClick = () => {
        const user = { username: username, password: password };
        dispatch(signInRequest(user));

        let { from } = location.state || { from: { pathname: "/" } };
        history.replace(from);


    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        CUỘC THI Ý TƯỞNG KHỞI NGHIỆP - SÁNG TẠO 2020
                        </Typography>
                    <Typography component="h1" variant="h5">
                        Trang quản trị
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên đăng nhập"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Ghi nhớ mật khẩu"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={ButtonSignIn_OnClick}
                        >
                            Đăng nhập
            </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}