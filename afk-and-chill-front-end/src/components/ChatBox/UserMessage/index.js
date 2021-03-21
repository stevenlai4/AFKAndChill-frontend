import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Avatar, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    chatboxToRight: {
        overflow: 'auto',
        display: 'flex',
    },
    chatboxToLeft: {
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    avatar: {
        float: 'left',
        marginRight: 10,
        marginBottom: 5,
    },
    text: {
        paddingTop: 5,
        margin: 10,
    },
}));

export default function UserMessage({ message, className, cognitoId }) {
    const classes = useStyles();

    return (
        <>
            {console.log(moment.now())}
            {message.user.cognito_id !== cognitoId ? (
                <div className={clsx(classes.chatboxToRight, className)}>
                    <Avatar
                        className={classes.avatar}
                        alt="userIcon"
                        src={message.user.photo_url}
                    ></Avatar>
                    <Typography
                        className={classes.text}
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                        {message.message}
                    </Typography>
                    <Typography component="p"></Typography>
                </div>
            ) : (
                <div className={clsx(classes.chatboxToLeft, className)}>
                    <Typography
                        className={classes.text}
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        {message.message}
                        {moment(message.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    </Typography>
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
