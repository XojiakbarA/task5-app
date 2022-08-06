import {Alert, Snackbar} from "@mui/material"
import {useDispatch} from "../hooks/useDispatch";
import {useStore} from "../hooks/useStore";
import {setSnackbar} from "../context/actions";

const CustomSnackbar = () => {

    const dispatch = useDispatch()

    const { open, text, color } = useStore(store => store.snackbar)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setSnackbar(false))
    }

    return (
        <Snackbar
            sx={{ minWidth: 200 }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                sx={{ width: '100%' }}
                severity={color}
                color={color}
                onClose={handleClose}
            >
                { text }
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar