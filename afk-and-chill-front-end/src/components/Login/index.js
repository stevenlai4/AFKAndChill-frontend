import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        position: "fixed",
        // top: 0,
        width: "25%",
        // zIndex: 100,
    },
    formControl: {
        minWidth: 100,
    },
    login: {
        display: "flex",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 14,
    },

    input: {
        marginBottom: 20,
        width: "200%",
    },

    wrapper: {
        margin: 30,
    },
});

function Login({ setisAuthenticated }) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // cognito login api
            const user = await Auth.signIn({
                username: email,
                password,
            });
            setisAuthenticated(true);
            history.push("/chatBox");
            console.log("Login Successful");
            console.log(user);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section
            className={classes.wrapper}
            className="Login-form"
            style={{ display: "flex", flexDirection: "row" }}
        >
            <h1>AFK & Chill </h1>
            <div>
                <img src="https://i.imgur.com/x7EZzDz.jpg" alt="AFK home" />
            </div>

            <Card className={classes.root}>
                <h3>Welcome to AFK & Chill</h3>
                <Avatar src="/broken-image.jpg" />
                <form onSubmit={onSubmit}>
                    <div className="control">
                        <TextField
                            type="text"
                            id="email"
                            placeholder="email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
