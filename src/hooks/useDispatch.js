import { useContext } from "react"
import { DispatchContext } from "../context/AppProvider"

export const useDispatch = () => {

    const context = useContext(DispatchContext)

    if (context === undefined) {
        throw new Error('`useDispatch` hook must be used within a `AppProvider` component')
    }
    return context
}