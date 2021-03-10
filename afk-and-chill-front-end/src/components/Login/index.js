import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

function Login({ setisAuthenticated }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            history.push('/chatBox');
            console.log('Login Successful');
            console.log(user);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section
            className="Login-form"
            style={{ flex: 1, flexDirection: 'row' }}
        >
            <h1>AFK & Chill </h1>
            <Card className={classes.root}>
                <h3>Welcome to AFK & Chill</h3>
                <form onSubmit={onSubmit}>
                    <p className="control">
                        <TextField
                            type="text"
                            id="email"
                            placeholder="email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Dont have an account?{' '}
                        <Link to="/register">Create an Account</Link>
                    </p>
                </form>
            </Card>
        </section>
    );
}

export default Login;
