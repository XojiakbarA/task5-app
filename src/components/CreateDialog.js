import {Stack, Button, TextField, Dialog, DialogContent, DialogTitle} from "@mui/material";
import CustomAutocomplete from "./CustomAutocomplete";
import {useStore} from "../hooks/useStore";
import {useFormik} from "formik";
import {createMessageValidationSchema} from "../utils/validate";
import {useDispatch} from "../hooks/useDispatch";
import {setDialog, setSnackbar} from "../context/actions";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useStompClient} from "react-stomp-hooks";


const CreateDialog = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const client = useStompClient()

    const open = useStore(store => store.dialog)
    const user = useStore(store => store.user)
    const users = useStore(store => store.users)

    const receiver = users.find(u => u.id === +params.receiverID)

    const [userValue, setUserValue] = useState(null)

    const handleClose = () => {
        dispatch(setDialog(false))
    }

    const { handleSubmit, handleBlur, setValues, errors, touched, getFieldProps } = useFormik({
        initialValues: {
            senderID: user?.id,
            receiverID: params?.receiverID,
            subject: '',
            content: ''
        },
        validationSchema: createMessageValidationSchema,
        enableReinitialize: true,
        onSubmit: (data, {resetForm}) => {
            client.publish({ destination: "/app/messages/chat", body: JSON.stringify(data) })
            dispatch(setSnackbar(true, "Chat created succesfully!", "success"))
            handleClose()
            resetForm()
        }
    })

    const handleUserChange = (e, option) => {
        if (option) {
            setValues(prev => ({ ...prev, receiverID: option.id }))
            setUserValue(option)
        } else {
            setValues(prev => ({ ...prev, receiverID: '' }))
            setUserValue(null)
        }
    }

    useEffect(() => {
        if (receiver) {
            setUserValue(receiver)
        } else {
            setUserValue(null)
        }
    }, [receiver])

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Create Chat</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <CustomAutocomplete
                        disabled={!!receiver}
                        value={userValue}
                        options={users}
                        onChange={handleUserChange}
                        onBlur={handleBlur}
                        name="receiverID"
                        error={ touched.receiverID && Boolean(errors.receiverID) }
                        helperText={ touched.receiverID && errors.receiverID }
                    />
                    <TextField
                        id="subject"
                        label="Subject"
                        fullWidth
                        variant="standard"
                        error={ touched.subject && Boolean(errors.subject) }
                        helperText={ touched.subject && errors.subject }
                        { ...getFieldProps('subject') }
                    />
                    <TextField
                        id="message"
                        label="Message"
                        fullWidth
                        variant="standard"
                        multiline
                        error={ touched.content && Boolean(errors.content) }
                        helperText={ touched.content && errors.content }
                        { ...getFieldProps('content') }
                    />
                    <Stack direction="row" spacing={1} justifyContent="end">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </Stack>
                </Stack>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default CreateDialog