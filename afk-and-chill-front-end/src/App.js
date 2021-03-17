import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Register from './layouts/RegisterPage';
import Login from './layouts/LoginPage';
import ChatBox from './layouts/ChatBoxPage';
import GuardedRoute from './components/GuardedRoute';
import useLocalStorage from 'react-use-localstorage';
import Header from './layouts/HeaderNavigation';
import Match from './layouts/MatchPage';
import Profile from './layouts/ProfilePage';
import ConfirmEmail from './layouts/ConfirmEmail';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );

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
                    <Login setIsAuthenticated={setIsAuthenticated} />
                </Route>
                <Route
                    component={ConfirmEmail}
                    path="/confirmEmail"
                    //isAuthenticated={isAuthenticated}
                />
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
