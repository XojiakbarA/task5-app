import {
    ADD_CHAT_MESSAGE, ADD_MESSAGE,
    ADD_USER,
    SET_CHAT_BADGES,
    SET_DIALOG,
    SET_LOADING, SET_MESSAGES, SET_MESSAGES_LOADING, SET_RECEIVER,
    SET_SNACKBAR,
    SET_USER,
    SET_USERS
} from "./types"

export const reducer = (state, action) => {

    switch (action.type) {

        case SET_LOADING:
            return { ...state, loading: action.payload }

        case SET_MESSAGES_LOADING:
            return { ...state, messagesLoading: action.payload }

        case SET_USER:
            return { ...state, user: action.payload }

        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    open: action.payload.open ?? state.snackbar.open,
                    text: action.payload.text ?? state.snackbar.text,
                    color: action.payload.color ?? state.snackbar.color
                }
            }

        case SET_DIALOG:
            return { ...state, dialog: action.payload }

        case SET_USERS:
            return { ...state, users: action.payload }

        case ADD_USER:
            const user = JSON.parse(localStorage.getItem("user"))
            let newUser = user;
            let users = [ ...state.users ]
            if (user?.name === action.payload?.name) {
                localStorage.setItem("user", JSON.stringify(action.payload))
                newUser = action.payload
            }
            if (!users.find(u => u.name === action.payload.name)) {
                users = users.concat(action.payload)
            }
            return { ...state, user: newUser, users}

        case SET_MESSAGES:
            return { ...state, messages: action.payload }

        case SET_RECEIVER:
            return { ...state, receiver: action.payload }

        case ADD_CHAT_MESSAGE:
            let users1 = [ ...state.users ]
            let chatBadges1 = [ ...state.chatBadges ]
            const receiver1 = action.payload.receiver
            const sender = action.payload.sender
            users1 = users1.map(user => {
                if (user.id === receiver1.id || user.id === sender.id) {
                    const chats = [ ...user.chats, action.payload.chat]
                    return { ...user, chats }
                }
                return user
            })
            const currentUser = { ...state.user }
            if (currentUser.id === receiver1.id) {
                chatBadges1 = [ ...state.chatBadges, action.payload.chat.id ]
            }
            return { ...state, users: users1, chatBadges: chatBadges1 }

        case ADD_MESSAGE:
            let messages = [ ...state.messages ]
            let chatBadges2 = [ ...state.chatBadges ]
            const receiver2 = action.payload.message.receiver
            if (action.payload.isOwnChat) {
                messages = state.messages.concat(action.payload.message)
            } else {
                const currentUser = { ...state.user }
                if (currentUser.id === receiver2.id) {
                    chatBadges2 = [ ...state.chatBadges, action.payload.message.chat.id ]
                }
            }
            return { ...state, messages, chatBadges: chatBadges2 }

        case SET_CHAT_BADGES:
            return { ...state, chatBadges: action.payload }

        default:
            return state
    }
}