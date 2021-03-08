import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';

export default function Register({ authenticate }){
const history = useHistory();

const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async event => {
    event.preventDefault();
    try {
      // cognito register api
       await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      authenticate(true);
    //   history.push("/protected");
    } catch (error) {
        console.error(error.message)
      // handle cognito error
    }
    };

 return (
    <section className="section auth">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <p className="control">
                <input
                    type="text"
                    className="input"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                />
            </p>
            <p className="control">
                <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

            </p>
            <p className="control">
                <input
                    className="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </p>
            <p className="control">
                <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </p>
            <p className="control">
                <input type="submit" name="Register" className="button is-success" />
            </p>
        </form>
    </section>
);
}