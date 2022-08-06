import {CircularProgress, Stack} from "@mui/material";
import MessageListItem from "./MessageListItem";
import {useStore} from "../../hooks/useStore";
import {useParams} from "react-router";
import {useDispatch} from "../../hooks/useDispatch";
import {useEffect} from "react";
import {fetchChatMessages} from "../../api";
import {setMessages, setMessagesLoading} from "../../context/actions";

const MessageList = () => {

    const params = useParams()

    const dispatch = useDispatch()

    const user = useStore(store => store.user)

    const messages = useStore(store => store.messages)

    const messagesLoading = useStore(store => store.messagesLoading)

    useEffect(() => {
        const getChatMessages = async () => {
            try {
                dispatch(setMessagesLoading(true))
                const res = await fetchChatMessages(params.chatID)
                if (res.status === 200) {
                    dispatch(setMessages(res.data.content))
                    dispatch(setMessagesLoading(false))
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (params.chatID) {
            getChatMessages()
        }
        return () => {
            dispatch(setMessages([]))
        }
    }, [params.chatID, dispatch])

    return (
        <Stack
            spacing={2}
            padding={1}
            height="100vh"
            overflow="scroll"
        >
            {
                messagesLoading
                ?
                <CircularProgress/>
                :
                messages.map(message => (
                    <MessageListItem
                        key={message.id}
                        message={message}
                        right={message.sender.id === user.id}
                    />
                ))
            }
        </Stack>
    )
}

export default MessageList