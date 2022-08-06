import {createContext, useEffect, useReducer} from 'react'
import { reducer } from './reducer'
import {fetchUser} from "../api";
import {setLoading, setUser} from "./actions";

export const StoreContext = createContext(null)
export const DispatchContext = createContext(null)

export const AppProvider = ({ children }) => {

    const initState = {
        loading: false,
        messagesLoading: false,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        snackbar: {
            open: false,
            text: null,
            color: "success"
        },
        dialog: false,
        chatBadges: [],
        users: [],
        messages: []
    }

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const getUser = async () => {
            try {
                dispatch(setLoading(true))
                const res = await fetchUser(user?.id, user?.name)
                if (res.status === 200) {
                    dispatch(setUser(res.data.content))
                    dispatch(setLoading(false))
                }
            } catch (e) {
                localStorage.removeItem("user")
                dispatch(setUser(null))
            }
        }
        if (user) getUser()
    }, [])

    return (
        <StoreContext.Provider value={{ ...state }}>
            <DispatchContext.Provider value={dispatch}>
                { children }
            </DispatchContext.Provider>
        </StoreContext.Provider>
    )
}