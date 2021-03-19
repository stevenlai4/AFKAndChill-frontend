import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'auto',
        // display: "flex"
    },
    avatar: {
        float: 'left',
        marginRight: 10,
        marginBottom: 5,
    },
    text: {
        paddingTop: 5,
    },
}));

export default function UserMessage({ message, className }) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>
            <Avatar className={classes.avatar}>{message.name}</Avatar>
            <Typography
                className={classes.text}
                variant="body2"
                color="textPrimary"
                component="p"
            >
                <b>{message.name}</b> {message.message}
            </Typography>
        </div>
    );
}
