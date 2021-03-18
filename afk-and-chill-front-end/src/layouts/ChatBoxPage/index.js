import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';
import { getChatBoxes } from '../../network';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);

    const submitMessage = async (data) => {
        console.log('Submit Message', data);
    };

    const onClickChatItem = async (data) => {
        console.log('ChatBoxId', data);
    };

    useEffect(() => {
        (async () => {
            const result = await getChatBoxes();
            setChatboxes(result.chatboxes);
        })();
    }, []);

    return (
        <ChatBox
            message={data[0]}
            chatboxes={chatboxes}
            submitMessage={submitMessage}
            onClickChatItem={onClickChatItem}
        />
    );
}
