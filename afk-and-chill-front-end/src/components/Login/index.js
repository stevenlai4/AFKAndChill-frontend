import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import {
    AppBar,
    Select,
    Link,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    TextField,
    InputLabel,
    FormControl,
    Button,
} from "@material-ui/core";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // cognito login api
            await Auth.Login({
                username,
                password,
                attributes: {
                    email: email,
                },
            });
            setisAuthenticated(true);
            console.log("Login Successful");
            //   history.push("/protected");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section className="Login">
            <h1>Welcome to AFK & Chill</h1>
            <form onSubmit={onSubmit}>
                <p className="control">
                    <TextField
                        type="text"
                        className="input"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p className="control">
                    <TextField
                        type="password"
                        id="password"
                        className="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p className="control">
                    <Button
                        variant="contained"
                        color="error"
                        type="submit"
                        name="Login"
                    >
                        Login
                    </Button>
                </p>

                <p>
                    Dont have a an account?{" "}
                    <Link to="/register">Create an Account</Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
