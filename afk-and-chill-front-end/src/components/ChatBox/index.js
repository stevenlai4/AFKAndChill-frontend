import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    CardHeader,
    Card,
    CardActions,
    CardContent,
} from '@material-ui/core';

import MessageForm from '../MessageForm';
import UserMessage from '../UserMessage';

const useStyles = makeStyles({
    root: {
        maxWidth: 1200,
        height: 600,
        display: 'flex',
    },
    media: {
        width: '50%',
    },

    otherData: {
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        margin: '0 10px',
    },
    messageForm: {
        width: '100%',
    },
    message: {
        margin: '10px 0',
    },
    messages: {
        overflowY: 'scroll',
    },
});

export default function ChatBox({ className, message, submitMessage }) {
    const classes = useStyles();

    const onMessage = (data) => {
        submitMessage({ chatId: message._id, text: data.message });
    };

    return (
        <Card className={`${classes.root} ${className}`}>
            <Card className={classes.media}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {message.chiller[0]}
                        </Avatar>
                    }
                    title={message.chiller}
                />
            </Card>
            <div className={classes.otherData}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {message.username[0]}
                        </Avatar>
                    }
                    title={message.username}
                />
                <CardContent className={classes.message}>
                    {message.messages.map((message) => (
                        <UserMessage
                            key={message._id}
                            className={classes.message}
                            message={message}
                        ></UserMessage>
                    ))}
                </CardContent>
                <div>
                    <CardActions></CardActions>
                    <MessageForm
                        className={classes.messageForm}
                        onSubmit={onMessage}
                    ></MessageForm>
                </div>
            </div>
        </Card>
    );
}
