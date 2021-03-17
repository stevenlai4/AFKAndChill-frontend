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
import { Redirect } from 'react-router-dom';
import { userToken } from './userAuth';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
        'isAuthorized',
        false
    );
    let history = useHistory();

    async function asyncCall() {
        let token = await userToken();
        try {
            const { exp } = jwtDecode(token);
            const expirationTime = exp * 1000 - 60000;
            console.log(expirationTime);
            console.log('now' + Date.now());
            if (Date.now() >= expirationTime) {
                setIsAuthenticated(false);
                localStorage.clear();
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    asyncCall();

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

                <GuardedRoute
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
            {/* Redirect user when user has already logged in */}
            {localStorage.getItem('isAuthorized') ? (
                <Redirect from="/" to="/findChillers" />
            ) : (
                ''
            )}
        </Router>
    );
}
export default App;
