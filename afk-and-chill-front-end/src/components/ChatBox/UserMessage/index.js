import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Avatar, Typography, Card } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    UserChatbox: {
        overflow: 'auto',
        display: 'flex',
    },
    chillerChatbox: {
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    avatar: {
        float: 'left',
        marginRight: 10,
        marginBottom: 5,
    },
    userText: {
        padding: '2%',
        margin: 10,
    },
    chillerText: {
        padding: '2%',
        margin: 10,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    },

    userTimestamp: {
        fontSize: 'small',
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 60,
        color: '#d3d3d3',
    },
    chillerTimestamp: {
        fontSize: 'small',
        marginLeft: 60,
        color: '#d3d3d3',
    },
}));

export default function UserMessage({ message, className, cognitoId }) {
    const classes = useStyles();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <>
            {message.user.cognito_id !== cognitoId ? (
                <>
                    <div className={clsx(classes.UserChatbox, className)}>
                        <Avatar
                            className={classes.avatar}
                            alt="userIcon"
                            src={message.user.photo_url}
                        ></Avatar>
                        <Card className={classes.userText}>
                            {message.message}
                        </Card>
                    </div>
                    <div className={classes.chillerTimestamp}>
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </div>
                    <div ref={messagesEndRef} />
                </>
            ) : (
                <>
                    <div className={clsx(classes.chillerChatbox, className)}>
                        <Card
                            className={classes.chillerText}
                            variant="body2"
                            color="textPrimary"
                            component="p"
                        >
                            {message.message}
                        </Card>
                        <Avatar
                            className={classes.avatar}
                            alt="userIcon"
                            src={message.user.photo_url}
                        ></Avatar>
                    </div>
                    <div className={classes.userTimestamp}>
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </div>
                    <div ref={messagesEndRef} />
                </>
            )}
        </>
    );
}
