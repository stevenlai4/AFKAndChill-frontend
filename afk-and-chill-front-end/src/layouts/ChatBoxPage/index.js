import React from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';

export default function ChatBoxPage() {
    const submitMessage = async (data) => {
        console.log('Submit Message', data);
    };

    const onClickChatItem = async (data) => {
        console.log('chat Item clicked', data);
    };

    return (
        <ChatBox
            message={data[0]}
            submitMessage={submitMessage}
            onClickChatItem={onClickChatItem}
        />
    );
}
