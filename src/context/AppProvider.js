import {createContext, useEffect, useReducer} from 'react'
import { reducer } from './reducer'
import {fetchUser} from "../api";
import {setUser} from "./actions";

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
                const res = await fetchUser(user?.id, user?.name)
                if (res.status === 200) {

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