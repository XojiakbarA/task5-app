import {
    ADD_CHAT_MESSAGE, ADD_MESSAGE,
    ADD_USER,
    SET_CHAT_BADGES,
    SET_DIALOG,
    SET_LOADING,
    SET_MESSAGES, SET_MESSAGES_LOADING,
    SET_SNACKBAR,
    SET_USER,
    SET_USERS
} from "./types";

export const setLoading = (bool) => ({
    type: SET_LOADING,
    payload: bool
})

export const setMessagesLoading = (bool) => ({
    type: SET_MESSAGES_LOADING,
    payload: bool
})

export const setSnackbar = (open, text, color) => ({
    type: SET_SNACKBAR,
    payload: { open, text, color }
})

export const setDialog = (bool) => ({
    type: SET_DIALOG,
    payload: bool
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
})

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

export const addChatMessage = (message) => ({
    type: ADD_CHAT_MESSAGE,
    payload: message
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const setChatBadges = (chatIDs) => ({
    type: SET_CHAT_BADGES,
    payload: chatIDs
})