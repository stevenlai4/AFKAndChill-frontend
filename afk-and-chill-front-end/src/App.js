import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Register from './layouts/RegisterPage';
import Login from './layouts/LoginPage';
import ChatBox from './layouts/ChatBoxPage';
import GuardedRoute from './components/GuardedRoute';
import useLocalStorage from 'react-use-localstorage';
import Header from './layouts/HeaderNavigation';
import Match from './layouts/MatchPage';
import Profile from './layouts/ProfilePage';
import ConfirmEmail from './layouts/ConfirmEmail';
import { Redirect } from 'react-router-dom';
import { refreshAuthToken } from './userAuth';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );

    useEffect(() => {
        (async () => {
            try {
                await refreshAuthToken(setIsAuthenticated);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Router>
            <Header
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
            />
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    {localStorage.getItem('isAuthorized') ? (
                        <Redirect from="/" to="/findChillers" />
                    ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                    )}
                </Route>
                <Route component={ConfirmEmail} path="/confirmEmail" />
                <Route
                    component={ChatBox}
                    path="/chatBox"
                    isAuthenticated={isAuthenticated}
                />
                <GuardedRoute
                    component={Profile}
                    path="/profile"
                    isAuthenticated={isAuthenticated}
                />
                <GuardedRoute
                    component={Match}
                    path="/findChillers"
                    isAuthenticated={isAuthenticated}
                />
                <GuardedRoute
                    component={ChatBox}
                    path="/chillerPost"
                    isAuthenticated={isAuthenticated}
                />
            </Switch>
        </Router>
    );
}
export default App;
