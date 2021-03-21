import React, { useState } from 'react';
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
        backgroundColor: '#00aeff',
        color: 'white',
    },
}));

export default function UserMessage({ message, className, cognitoId }) {
    const classes = useStyles();

    return (
        <>
            {console.log(moment.now())}
            {message.user.cognito_id !== cognitoId ? (
                <div className={clsx(classes.UserChatbox, className)}>
                    <Avatar
                        className={classes.avatar}
                        alt="userIcon"
                        src={message.user.photo_url}
                    ></Avatar>
                    <Card
                        className={classes.userText}
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                        {message.message}
                    </Card>
                    <Typography component="p"></Typography>
                </div>
            ) : (
                <div className={clsx(classes.chillerChatbox, className)}>
                    <Card
                        className={classes.chillerText}
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        {message.message}
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </Card>
                    <Avatar
                        className={classes.avatar}
                        alt="userIcon"
                        src={message.user.photo_url}
                    ></Avatar>
                </div>
            )}
        </>
    );
}
