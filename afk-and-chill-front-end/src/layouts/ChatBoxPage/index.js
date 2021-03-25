import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import { ReactComponent as LoadingHeart } from '../../assests/loading-heart.svg';
import { CircularProgress } from '@material-ui/core';
import { getChatBoxes } from '../../network';
import { getUserInfo } from '../../userAuth';
import { makeStyles } from '@material-ui/core/styles';
import { getChatBoxesNew } from '../../network';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);
    const [cognitoId, setCognitoId] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chatboxesNew, setChatboxesNew] = useState([]);
    // const sendMsg = async (data) => {
    //     console.log('Submit Message', data);
    // };
    const useStyles = makeStyles((theme) => ({
        tinderCardsContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15vh',
            [theme.breakpoints.down('md')]: {
                marginTop: '10vh',
            },
        },
        heartSVG: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    }));
    const classes = useStyles();
    const onClickChatItem = async (data) => {
        console.log('ChatBoxId', data);
    };

    useEffect(() => {
        (async () => {
            try {
                const tempChatBox = await getChatBoxes();
                const tempUserInfo = await getUserInfo();

                // const tempChatBoxNew = await getChatBoxesNew();
                // setChatboxesNew(tempChatBoxNew.chatboxes);

                setChatboxes(tempChatBox.chatboxes);
                setCognitoId(tempUserInfo.attributes.sub);
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    return (
        <>
            {/* {console.log(chatboxesNew)} */}
            {isLoading ? (
                <LoadingHeart className={classes.heartSVG} />
            ) : (
                <ChatBox
                    // message={data[0]}
                    cognitoId={cognitoId}
                    chatboxes={chatboxes}
                    onClickChatItem={onClickChatItem}
                />
            )}
        </>
    );
}
