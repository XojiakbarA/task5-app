import {Outlet, useParams} from "react-router";
import {useDispatch} from "../../hooks/useDispatch";
import {useStore} from "../../hooks/useStore";
import {addChatMessage, addMessage, addUser} from "../../context/actions";
import {useSubscription} from "react-stomp-hooks";

const WebSocketLayout = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const user = useStore(store => store.user)

    const onCreatedReceived = (payload) => {
        dispatch(addUser(JSON.parse(payload.body)))
    }
    const onChatMessageReceived = (payload) => {
        const message = JSON.parse(payload.body)
        dispatch(addChatMessage(message))
    }
    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body)
        const isOwnChat = +params.chatID === message.chat.id
        dispatch(addMessage({ message, isOwnChat }))
    }

    useSubscription("/chatroom/create", onCreatedReceived)
    useSubscription(`/user/${user?.id}/chatMessage`, onChatMessageReceived)
    useSubscription(`/user/${user?.id}/message`, onMessageReceived)

    return <Outlet/>
}

export default WebSocketLayout