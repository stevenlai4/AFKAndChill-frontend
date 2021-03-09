import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";

function Login({ authenticate }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // cognito login api
            await Auth.signIn({
                username,
                password,
            });
            authenticate(true);
            console.log("Login Successful");
            //   history.push("/protected");
        } catch (error) {
            console.error(error.message);
            //handle cognito error
        }
    };

    return (
        <section className="Login-form">
            <h1>Welcome to AFK & Chill</h1>
            <form onSubmit={onSubmit}>
                <p className="control">
                    <TextField
                        type="text"
                        id="username"
                        placeholder="username*"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p className="control">
                    <TextField
                        type="password"
                        id="password"
                        placeholder="password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p className="control">
                    <Button
                        variant="contained"
                        className="button is-success"
                        type="submit"
                        name="Login"
                    >
                        Login
                    </Button>
                </p>

                <p>
                    Dont have an account?{" "}
                    <Link to="/register">Create an Account</Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
