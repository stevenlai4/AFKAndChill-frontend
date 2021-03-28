import React, { useEffect, useState } from 'react';
import ChatBox from '../../components/ChatBox';
import { ReactComponent as LoadingBeanEater } from '../../assests/loading-bean-eater.svg';
import { getChatBoxes } from '../../network';
import { makeStyles } from '@material-ui/core/styles';

export default function ChatBoxPage() {
    const [chatboxes, setChatboxes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const useStyles = makeStyles((theme) => ({
        tinderCardsContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '15vh',
            [theme.breakpoints.down('md')]: {
                marginTop: '10vh',
            },
        },
        loadingSVG: {
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
                setChatboxes(tempChatBox.chatboxes);

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingBeanEater className={classes.loadingSVG} />
            ) : (
                <ChatBox
                    chatboxes={chatboxes}
                    onClickChatItem={onClickChatItem}
                />
            )}
        </>
    );
}
