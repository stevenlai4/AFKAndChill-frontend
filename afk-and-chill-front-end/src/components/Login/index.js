import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, autoShowTooltip } from "aws-amplify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        // top: 0,
        width: "25%",
        // zIndex: 100,
    },
    button: {
        marginBottom: 20,
    },
    // loginButton: {
    //     display: "flex",
    //     justifyContent: "center",
    //     paddingBottom: 10,
    // },
    formControl: {
        minWidth: 100,
    },
    formTitle: {
        marginTop: 10,
        paddingBottom: 10,
    },
    login: {
        display: "flex",
        justifyContent: "space-between",
    },
    loginForm: {
        justifyContent: "center",
        alignItems: "center",
        // paddingLeft: 30,
        width: "90%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
    },
    sizeAvatar: {
        height: theme.spacing(13),
        width: theme.spacing(13),
    },

    title: {
        fontSize: 14,
    },

    input: {
        marginTop: 10,
        marginBottom: 20,
        width: "100%",
        // display: "block",
    },

    wrapper: {
        margin: 30,
    },
}));

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
        <section className={classes.wrapper}>
            <div className={classes.login}>
                <h1>AFK & Chill</h1>

                <img
                    src="https://i.imgur.com/x7EZzDz.jpg"
                    alt="AFK home"
                    width={600}
                />

                <Card className={classes.root}>
                    <div className={classes.loginForm}>
                        <h3 className={classes.formTitle}>
                            Welcome to AFK & Chill
                        </h3>
                        <div>
                            <Avatar
                                src="https://i.imgur.com/c5ET53T.gif"
                                className={classes.sizeAvatar}
                            />
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="control">
                                <TextField
                                    type="text"
                                    className={classes.input}
                                    variant="outlined"
                                    helperText={onSubmit.error}
                                    id="email"
                                    placeholder="email*"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    type="password"
                                    className={classes.input}
                                    variant="outlined"
                                    helperText={""}
                                    id="password"
                                    placeholder="password*"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                name="Login"
                                style={{
                                    width: "100%",
                                    marginBottom: "5%",
                                }}
                            >
                                Login
                            </Button>

                            <div style={{ paddingBottom: 20 }}>
                                Dont have an account?{" "}
                                <Link to="/register">Create an Account</Link>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default Login;
