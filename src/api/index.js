import axios from "axios";

export const BASE_URL = "https://taskfiveapi.herokuapp.com/api/"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const fetchUser = async (id, name) => {
    return instance.get(`/users/${id}/${name}`)
}

export const fetchUsers = async (senderID) => {
    return instance.get("/users", { params: { senderID } })
}

export const fetchChatMessages = async (id) => {
    return instance.get(`/chats/${id}/messages`)
}