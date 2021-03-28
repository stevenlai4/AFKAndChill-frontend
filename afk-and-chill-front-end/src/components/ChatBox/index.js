import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    CardHeader,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import ChatDrawer from './ChatDrawer';
import MessageForm from './MessageForm';
import UserMessage from './UserMessage';
import ChillerItem from './ChillerItem';
import { getMsges } from '../../network';
import { UserContext } from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Vazir, sans-serif ',
    },
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
    avatar: {
        margin: '3%',
    },
    title: {
        fontFamily: 'Josefin Sans, cursive',
    },
    chatHeader: {
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
    },
    messageForm: {
        margin: 20,
        justifyContent: 'flex-end',
    },
    message: {
        margin: '10px 0',
    },
    messageBox: {
        height: '100%',
        overflow: 'auto',
    },
    fullList: {
        width: 'auto',
    },
    loadingIcon: {
        margin: 'auto',
    },
    noChatboxText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '40px',
    },
}));

export default function ChatBox({ chatboxes }) {
    const classes = useStyles();
    const [chatboxId, setChatboxId] = useState('');
    const [messages, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [matchedChiller, setMatchedChiller] = useState({});
    const [rerender, setRerender] = useState(false);
    const [user, setUser] = useContext(UserContext);

    // CDM
    useEffect(() => {
        if (chatboxes.length > 0) {
            if (chatboxes[0].user_one.cognito_id === user.cognito_id) {
                setMatchedChiller(chatboxes[0].user_two);
            } else {
                setMatchedChiller(chatboxes[0].user_one);
            }

            setChatboxId(chatboxes[0]._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (chatItem.user_one.cognito_id === user.cognito_id) {
            setMatchedChiller(chatItem.user_two);
        } else {
            setMatchedChiller(chatItem.user_one);
        }
        setChatboxId(chatItem._id);
    };

    return (
        <div>
            {chatboxes.length > 0 ? (
                <>
                    <ChatDrawer
                        cognitoId={user.cognito_id}
                        chatboxes={chatboxes}
                        onChatItem={onChatItem}
                    />
                    <section className={classes.AFKChat}>
                        <ChillerItem
                            cognitoId={user.cognito_id}
                            chatboxes={chatboxes}
                            onChatItem={onChatItem}
                        />
                        {/*----------------------------chat header-----------------------*/}
                        <Card className={classes.chatBox}>
                            <div className={classes.chat}>
                                <div className={classes.chatHeader}>
                                    <CardHeader
                                        classes={{
                                            title: classes.title,
                                        }}
                                        avatar={
                                            <Avatar
                                                alt="userIcon"
                                                src={matchedChiller.photo_url}
                                                className={classes.avatar}
                                            />
                                        }
                                        titleTypographyProps={{
                                            variant: 'h6',
                                        }}
                                        title={matchedChiller.name}
                                    />
                                </div>
                                {/*----------------------------message box---------------------------------------*/}
                                {isLoading ? (
                                    <CircularProgress
                                        className={classes.loadingIcon}
                                    />
                                ) : (
                                    <div className={classes.messageBox}>
                                        <CardContent
                                            className={classes.message}
                                        >
                                            {messages.map((message) => (
                                                <UserMessage
                                                    key={message._id}
                                                    className={classes.message}
                                                    message={message}
                                                    cognitoId={user.cognito_id}
                                                ></UserMessage>
                                            ))}
                                        </CardContent>
                                    </div>
                                )}
                                {/*----------------------------Message send form ---------------------------------------*/}
                                <div className={classes.messageForm}>
                                    <MessageForm
                                        setRerender={setRerender}
                                        chatboxId={chatboxId}
                                    ></MessageForm>
                                </div>
                            </div>
                        </Card>
                    </section>
                </>
            ) : (
                <Typography className={classes.noChatboxText} component="h3">
                    You Don't Have Any Chat
                </Typography>
            )}
        </div>
    );
}
