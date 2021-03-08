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
        <div>
            <Card>
                <CardContent>
                    <form onSubmit={submit}>
                        <TextField
                            label="username"
                            value={username}
                        ></TextField>
                        <TextField
                            label="password"
                            value={password}
                        ></TextField>
                        <Button type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
