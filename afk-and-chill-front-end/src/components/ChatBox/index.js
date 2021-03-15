// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//     Avatar,
//     CardHeader,
//     Card,
//     CardActions,
//     CardContent,
// } from '@material-ui/core';
// import MessageForm from '../MessageForm';
// import UserMessage from '../UserMessage';

// const useStyles = makeStyles((theme) => ({
//     wrapper: {
//         display: 'flex',
//         margin: 30,
//         flexDirection: 'row',
//         [theme.breakpoints.down('sm')]: {
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//     },
//     chatBox: {
//         width: '50%',
//         height: 650,
//         display: 'flex',
//         margin: 10,
//         [theme.breakpoints.down('sm')]: {
//             width: '100%',
//         },
//     },
//     chillerItem: {
//         width: '50%',
//         margin: 10,
//         [theme.breakpoints.down('sm')]: {
//             width: '100%',
//         },
//     },
//     otherData: {
//         display: 'flex',
//         flexDirection: 'column',
//         boxSizing: 'border-box',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     messageForm: {
//         margin: 20,
//     },
//     message: {
//         margin: '10px 0',
//     },
//     messages: {
//         overflowY: 'scroll',
//     },
// }));

// export default function ChatBox({ message, submitMessage }) {
//     const classes = useStyles();

//     const onMessage = (data) => {
//         submitMessage({ chatId: message._id, text: data.message });
//     };

//     return (
//         <section className={classes.wrapper}>
//             <div className={classes.chillerItem}>
//                 <Card>
//                     <CardHeader
//                         avatar={
//                             <Avatar className={classes.avatar}>
//                                 {message.chiller[0]}
//                             </Avatar>
//                         }
//                         title={message.chiller}
//                     />
//                 </Card>
//             </div>
//             <Card className={classes.chatBox}>
//                 <div className={classes.otherData}>
//                     <CardHeader
//                         avatar={
//                             <Avatar className={classes.avatar}>
//                                 {message.username[0]}
//                             </Avatar>
//                         }
//                         title={message.username}
//                     />
//                     <CardContent className={classes.message}>
//                         {message.messages.map((message) => (
//                             <UserMessage
//                                 key={message._id}
//                                 className={classes.message}
//                                 message={message}
//                             ></UserMessage>
//                         ))}
//                     </CardContent>
//                     <div className={classes.messageForm}>
//                         <CardActions></CardActions>
//                         <MessageForm onSubmit={onMessage}></MessageForm>
//                     </div>
//                 </div>
//             </Card>
//         </section>
//     );
// }

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

export default function ChatBox({ message, submitMessage, onClickChatItem }) {
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
                {/* {chillerList.map((text, index) => ( */}
                <ListItem button key={message.chiller}>
                    {/* <ListItemText primary={text} /> */}
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {message.chiller[0]}
                            </Avatar>
                        }
                        title={message.chiller}
                    />
                </ListItem>
                {/* // ))} */}
            </List>
        </div>
    );

    //----------------------------Submit Message---------------------------------------//
    const onMessage = (data) => {
        submitMessage({ chatId: message._id, text: data.message });
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
                    <Card onClick={onClickChatItem}>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}>
                                    {message.chiller[0]}
                                </Avatar>
                            }
                            title={message.chiller}
                        />
                    </Card>
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
