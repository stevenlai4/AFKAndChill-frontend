import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

import {
    TextField,
    Card,
    CardContent,
    CardHeader,
    Button,
    Typography,
} from "@material-ui/core";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="section auth">
            <h1>Welcome to AFK & Chill</h1>
            <form>
                <p className="control">
                    <input
                        type="text"
                        className="input"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p className="control">
                    <input
                        type="password"
                        id="password"
                        className="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p className="control">
                    <input
                        type="submit"
                        name="Login"
                        className="button is-danger"
                    />
                </p>
            </form>
        </section>
    );
}

export default Login;
