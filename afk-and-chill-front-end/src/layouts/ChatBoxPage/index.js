import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';
import { CircularProgress } from '@material-ui/core';
import { getChatBoxes, sendMsg } from '../../network';
import { getUserInfo } from '../../userAuth';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);
    const [cognitoId, setCognitoId] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const sendMsg = async (data) => {
    //     console.log('Submit Message', data);
    // };

    const onClickChatItem = async (data) => {
        console.log('ChatBoxId', data);
    };

    useEffect(() => {
        (async () => {
            try {
                const tempChatBox = await getChatBoxes();
                const tempUserInfo = await getUserInfo();
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
            {isLoading ? (
                <CircularProgress />
            ) : (
                <ChatBox
                    // message={data[0]}
                    sendMsg={sendMsg}
                    cognitoId={cognitoId}
                    chatboxes={chatboxes}
                    onClickChatItem={onClickChatItem}
                />
            )}
        </>
    );
}
