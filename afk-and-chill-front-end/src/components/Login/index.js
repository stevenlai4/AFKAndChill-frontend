import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

function Login({ authenticate }) {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // cognito login api
            const user = await Auth.signIn({
                username,
                password,
            });
            authenticate(true);
            console.log("Login Successful");
            //   history.push("/protected");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section
            className="Login-form"
            style={{ flex: 1, flexDirection: "row" }}
        >
            <h1>AFK & Chill </h1>
            <Card className={classes.root}>
                <h3>Welcome to AFK & Chill</h3>
                <form onSubmit={onSubmit}>
                    <div className="control">
                        <TextField
                            type="text"
                            id="username"
                            placeholder="username*"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <TextField
                            type="password"
                            id="password"
                            placeholder="password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <Button
                            variant="contained"
                            className="button is-success"
                            type="submit"
                            name="Login"
                        >
                            Login
                        </Button>
                    </div>

                    <div>
                        Dont have an account?{" "}
                        <Link to="/register">Create an Account</Link>
                    </div>
                </form>
            </Card>
        </section>
    );
}

export default Login;
