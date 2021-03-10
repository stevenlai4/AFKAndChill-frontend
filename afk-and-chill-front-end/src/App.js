import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from "./layouts/RegisterPage";
import Login from "./layouts/LoginPage";
import ChatBox from "./layouts/ChatBoxPage";

function App() {
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Login setisAuthenticated={setisAuthenticated} />
                </Route>
                <Route path="/chatBox">
                    <ChatBox />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
