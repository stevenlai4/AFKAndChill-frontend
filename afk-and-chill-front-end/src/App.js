import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from "./layouts/RegisterPage";
import Login from "./layouts/LoginPage";
import Header from "./components/Header";

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
                    <Register setisAuthenticated={setisAuthenticated} />
                </Route>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/Header">
                    <Header />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
