import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chillerItem: {
        width: '40%',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    chillerItemCard: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    avatar: {
        margin: '3%',
    },
    chillerCard: { marginBottom: '5%' },
}));

export default function ChillerItem({ chatboxes, cognitoId, onChatItem }) {
    const classes = useStyles();

    return (
        <div className={classes.chillerItem}>
            {chatboxes.map((chatItem) => (
                <Card
                    className={classes.chillerCard}
                    onClick={() => onChatItem(chatItem)}
                    key={chatItem._id}
                >
                    {cognitoId == chatItem.user_one.cognito_id ? (
                        <div className={classes.chillerItemCard}>
                            <Avatar
                                alt="userIcon"
                                src={chatItem.user_two.photo_url}
                                className={classes.avatar}
                            />
                            <h4>{chatItem.user_two.name}</h4>
                        </div>
                    ) : (
                        <div className={classes.chillerItemCard}>
                            <Avatar
                                alt="userIcon"
                                src={chatItem.user_one.photo_url}
                                className={classes.avatar}
                            />
                            <h4>{chatItem.user_one.name}</h4>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}
