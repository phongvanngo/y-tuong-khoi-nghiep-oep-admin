import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router, Redirect, Route,
    Switch
} from 'react-router-dom';
import LoadingPage from "./Container/LoadingPage/LoadingPage";
import { checkLoggedInRecently } from './features/signIn/signInSlice';

const SignIn = lazy(() => import('./features/signIn/View/SignIn'));
const Dashboard = lazy(() => import('./Container/Dashboard/Dashboard'))

function PrivateRoute({ children, ...rest }) {
    // const { isLogin } = useSelector(state => state.signIn);
    const isLogin = true;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signIn",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default function Routes() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkLoggedInRecently());
    }, [dispatch]);

    return (
        <Suspense fallback={<LoadingPage />}>
            <Router>
                <Switch>

                    <Route path="/signIn" component={SignIn} />
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/">
                        <Dashboard />
                    </PrivateRoute>
                </Switch>
            </Router>
        </Suspense>
    )
};


