import React from 'react';
import ChatBox from '../../components/ChatBox';
import data from '../../fakeData';

export default function ChatBoxPage() {
    const submitMessage = async (data) => {
        console.log('Submit Message', data);
    };
    return <ChatBox message={data[0]} submitMessage={submitMessage} />;
}
