import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Register from "./layouts/RegisterPage";
import Login from "./layouts/LoginPage";
import ChatBox from "./layouts/ChatBoxPage";
import GuardedRoute from "./components/GuardedRoute";
import useLocalStorage from "react-use-localstorage";
import Header from "./layouts/HeaderNavigation";
import Match from "./layouts/MatchPage";
import Profile from "./layouts/ProfilePage";

function App() {
    const [isAuthenticated, setisAuthenticated] = useLocalStorage(
        "isAuthorized",
        false
    );

    //clear localstorage when close brower
    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.clear();
        };
    });

    return (
        <Router>
            <Header
                setisAuthenticated={setisAuthenticated}
                isAuthenticated={isAuthenticated}
            />
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Login setisAuthenticated={setisAuthenticated} />
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
        </Router>
    );
}
export default App;
