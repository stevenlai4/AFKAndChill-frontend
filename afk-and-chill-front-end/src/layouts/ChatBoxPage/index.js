import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';
import { getChatBoxes } from '../../network';
import { getUserInfo } from '../../userAuth';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);
    const [cognitoId, setCognitoId] = useState([]);

    const submitMessage = async (data) => {
        console.log('Submit Message', data);
    };

    const onClickChatItem = async (data) => {
        console.log('ChatBoxId', data);
    };

    useEffect(() => {
        (async () => {
            const tempChatBox = await getChatBoxes();
            const tempUserInfo = await getUserInfo();
            setChatboxes(tempChatBox.chatboxes);
            setCognitoId(tempUserInfo.attributes.sub);
        })();
    }, []);

    return (
        <ChatBox
            message={data[0]}
            cognitoId={cognitoId}
            chatboxes={chatboxes}
            submitMessage={submitMessage}
            onClickChatItem={onClickChatItem}
        />
    );
}
