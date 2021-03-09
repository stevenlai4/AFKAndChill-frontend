import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from "./layouts/RegisterPage";
import Login from "./layouts/LoginPage";

function App() {
    const [isAuthenticated, setisAuthenticated] = useState(false);

    // const authenticateUser = (authState) => {
    //   setisAuthenticated(authState);
    // }

    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);

    return (
        <Router>
            {/* returns <Login setisAuthenticated={setisAuthenticated} />; */}
            {/* <Login setisAuthenticated={setisAuthenticated} /> */}
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Login setisAuthenticated={setisAuthenticated} />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
