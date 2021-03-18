import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader, Card, CardContent } from '@material-ui/core';
import MessageForm from '../MessageForm';
import UserMessage from '../UserMessage';

const useStyles = makeStyles((theme) => ({
    AFKChat: {
        display: 'flex',
        margin: 30,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    chatBox: {
        width: '50%',
        height: 650,
        display: 'flex',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
        },
    },
    chillerItem: {
        width: '50%',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    chillerItemCard: {
        marginTop: '5%',
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        width: '100%',
    },
    listButton: {
        margin: '2% 2% 0 2%',
    },
    messageForm: {
        margin: 20,
    },
    message: {
        margin: '10px 0',
    },
    messages: {
        overflowY: 'scroll',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function ChatBox({
    message,
    submitMessage,
    onClickChatItem,
    chatboxes,
    userInfo,
}) {
    const classes = useStyles();

    //----------------------------Drawer---------------------------------------//
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

    const chillerList = ['Mongo', 'Bob'];

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
                        onClick={onClickChatItem}
                    >
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}></Avatar>
                            }
                        />
                        <ListItemText primary={chatItem.user_two} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    //----------------------------Submit Message---------------------------------------//
    const onMessage = (data) => {
        submitMessage({ chatId: message._id, text: data.message });
    };

    // const onChatItem = (event) => {
    //     const id = event.target.id;
    //     console.log(id);
    //     onClickChatItem(id);
    // };

    const onChatItem = (data) => {
        onClickChatItem(data);
    };

    return (
        <div>
            {/*----------------------------Drawer---------------------------------------*/}
            <section className={classes.drawer}>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button
                            onClick={toggleDrawer(anchor, true)}
                            className={classes.listButton}
                        >
                            <MenuIcon fontSize="large" />
                            Chiller's List
                        </Button>
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
            {/*----------------------------chiller Item---------------------------------------*/}
            <section className={classes.AFKChat}>
                <div className={classes.chillerItem}>
                    {/* <Card onClick={onClickChatItem}>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}></Avatar>
                            }
                            title={message.chiller}
                        />
                    </Card>
                    {console.log(chatboxes)} */}

                    {console.log(chatboxes)}

                    {chatboxes.map((chatItem) => (
                        <Card
                            className={classes.chillerItemCard}
                            onClick={() => onChatItem(chatItem._id)}
                            key={chatItem._id}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar}></Avatar>
                                }
                                title={chatItem.user_two}
                            />
                        </Card>
                    ))}

                    {/* {console.log(userInfo.attributes.sub)} */}
                    {/* {console.log(chatboxes)} */}

                    {/* {chatboxes.map((chatItem) => (
                        <div
                            className={classes.chillerItemCard}
                            onClick={() => onChatItem(chatItem._id)}
                            key={chatItem._id}
                        >
                            {console.log(chatItem.user_one)}

                            {userInfo.attributes.sub == chatItem.user_two ? (
                                <p>{chatItem.user_one}</p>
                            ) : (
                                <p>{chatItem.user_two}</p>
                            )}
                        </div>
                    ))} */}
                </div>
                {/*----------------------------chat box---------------------------------------*/}
                <Card className={classes.chatBox}>
                    <div className={classes.chat}>
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
                        <div className={classes.messageForm}>
                            <MessageForm onSubmit={onMessage}></MessageForm>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}
