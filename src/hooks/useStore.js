import { useContext } from "react"
import { StoreContext } from "../context/AppProvider"

export const useStore = (selector) => {

    const context = useContext(StoreContext)

    if (context === undefined) {
        throw new Error('`useApp` hook must be used within a `AppProvider` component')
    }

    return selector(context)
}