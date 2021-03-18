import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';
import { getChatBoxes } from '../../network';
import { getUserInfo } from '../../userAuth';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

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
            console.log(tempChatBox);
            // console.log(tempUserInfo.attributes.sub);
        })();
    }, []);

    return (
        <ChatBox
            message={data[0]}
            userInfo={userInfo}
            chatboxes={chatboxes}
            submitMessage={submitMessage}
            onClickChatItem={onClickChatItem}
        />
    );
}
