import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chatboxToRight: {
        overflow: 'auto',
        display: 'flex',
        // color:'red',
        // justifyContent: 'flex-end',
    },
    chatboxToLeft: {
        overflow: 'auto',
        display: 'flex',
        // color:'red',
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
    const d = new Date(0);
    return (
        <>
            {}
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
                        {message.message}
                    </Typography>
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
