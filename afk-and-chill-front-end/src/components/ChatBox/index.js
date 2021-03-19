import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    CardHeader,
    Card,
    CardContent,
    CircularProgress,
} from '@material-ui/core';
import MessageForm from '../MessageForm';
import UserMessage from '../UserMessage';
import { getMsges, sendMsg } from '../../network';

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
        width: '60%',
        height: 650,
        display: 'flex',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
        },
    },
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
    chillerItemCardDrawer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    textDrawer: { marginLeft: '10px' },
    avatarDrawer: {
        margin: '5%',
    },
    avatar: {
        margin: '3%',
    },
    chillerCard: { marginBottom: '5%' },
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

export default function ChatBox({ onClickChatItem, chatboxes, cognitoId }) {
    const classes = useStyles();
    const [chatboxId, setChatboxId] = useState('');
    const [messages, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [matchedChiller, setMatchedChiller] = useState({});
    const [user, setUser] = useState({});
    const [rerender, setRerender] = useState(false);

    // CDU get messages
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                if (chatboxId) {
                    const messageResult = await getMsges({
                        chatboxId: chatboxId,
                    });
                    setMessage(messageResult.messages);
                }
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [chatboxId, rerender]);

    //----------------------------Submit Message---------------------------------------//
    const onChatItem = (chatItem) => {
        // Check user_one or user_two is the matched chiller
        if (chatItem.user_one.cognito_id === cognitoId) {
            setMatchedChiller(chatItem.user_two);
            setUser(chatItem.user_one);
        } else {
            setMatchedChiller(chatItem.user_one);
            setUser(chatItem.user_two);
        }
        setChatboxId(chatItem._id);
        // onClickChatItem(chatboxId);
    };

    const onMessage = (data) => {
        sendMsg({ message: data.message, chatboxId });
        setRerender((prev) => !prev);
    };

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
                        onClick={() => onChatItem(chatItem._id)}
                    >
                        {cognitoId == chatItem.user_one.cognito_id ? (
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

                {/*----------------------------chat box---------------------------------------*/}
                {/*----------------------------chat header-----------------------*/}
                <Card className={classes.chatBox}>
                    <div className={classes.chat}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt="userIcon"
                                    src={matchedChiller.photo_url}
                                    className={classes.avatar}
                                />
                            }
                            title={matchedChiller.name}
                        />
                        {/*----------------------------message box---------------------------------------*/}
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <CardContent className={classes.message}>
                                {messages.map((message) => (
                                    <UserMessage
                                        key={message._id}
                                        className={classes.message}
                                        message={message}
                                        cognitoId={cognitoId}
                                    ></UserMessage>
                                ))}
                            </CardContent>
                        )}
                        {/*----------------------------Message submit Form---------------------------------------*/}
                        <div className={classes.messageForm}>
                            <MessageForm
                                // setRerender={setRerender}
                                onSubmit={onMessage}
                            ></MessageForm>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}
