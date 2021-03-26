import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    itemButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        width: '80%',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    chillerItemCardDrawer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    textDrawer: { marginLeft: '10px' },
    avatarDrawer: {
        margin: '5%',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
    list: {
        width: 250,
    },
}));

export default function ChatDrawer({
    chatboxes,
    cognitoId,
    onChatItem,
    className,
}) {
    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {chatboxes.map((chatItem) => (
                    <ListItem
                        button
                        key={chatItem._id}
                        onClick={() => onChatItem(chatItem)}
                    >
                        {cognitoId === chatItem.user_one.cognito_id ? (
                            <div className={classes.chillerItemCardDrawer}>
                                <Avatar
                                    alt="userIcon"
                                    src={chatItem.user_two.photo_url}
                                    className={classes.avatarDrawer}
                                />
                                <h4 className={classes.textDrawer}>
                                    {chatItem.user_two.name}
                                </h4>
                            </div>
                        ) : (
                            <div className={classes.chillerItemCardDrawer}>
                                <Avatar
                                    alt="userIcon"
                                    src={chatItem.user_one.photo_url}
                                    className={classes.avatarDrawer}
                                />
                                <h4 className={classes.textDrawer}>
                                    {chatItem.user_one.name}
                                </h4>
                            </div>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <section className={classes.drawer}>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className={classes.button}>
                        <Button
                            onClick={toggleDrawer(anchor, true)}
                            className={clsx(classes.itemButton, className)}
                        >
                            Chiller's List
                        </Button>
                    </div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </section>
    );
}
