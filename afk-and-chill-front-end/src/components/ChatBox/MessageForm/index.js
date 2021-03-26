import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { sendMsg } from '../../../network';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
    },
    textField: {
        flexGrow: 2,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function MessageForm({ chatboxId, setRerender }) {
    const classes = useStyles();
    const [message, setMessage] = useState('');

    const onMessage = async (event) => {
        event.preventDefault();
        try {
            if (message) {
                await sendMsg({ message: message, chatboxId });
                setRerender((prev) => !prev);
                setMessage('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <form onSubmit={onMessage} className={classes.form}>
            <TextField
                className={classes.textField}
                value={message}
                multiline
                onChange={(e) => setMessage(e.target.value)}
                label="Add a message"
                rowsMax={4}
                variant="filled"
            ></TextField>
            <div className={classes.buttonWrapper}>
                <IconButton type="submit">
                    <SendIcon />
                </IconButton>
            </div>
        </form>
    );
}
