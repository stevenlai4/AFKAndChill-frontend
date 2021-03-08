import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
    return (
        <div>
            <Card>
                <CardContent>
                    <form>
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
