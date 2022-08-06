import {IconButton, Paper, Stack, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useFormik} from "formik";
import {useStore} from "../hooks/useStore";
import {useParams} from "react-router";
import {contentValidationSchema} from "../utils/validate";
import {useStompClient} from "react-stomp-hooks";

const MessageInputs = () => {

    const params = useParams()

    const client = useStompClient()

    const user = useStore(store => store.user)

    const { handleSubmit, getFieldProps } = useFormik({
        initialValues: {
            senderID: user?.id,
            receiverID: params?.receiverID,
            chatID: params?.chatID,
            content: ''
        },
        enableReinitialize: true,
        validationSchema: contentValidationSchema,
        onSubmit: (data, {resetForm}) => {
            client.publish({ destination: "/app/messages/private", body: JSON.stringify(data) })
            resetForm()
        }
    })

    return (
        <Paper
            sx={{
                padding: 1,
                position: 'sticky',
                bottom: 0,
                right: 0,
                width: '100%',
            }}
        >
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        { ...getFieldProps("content") }
                    />
                    <IconButton color="primary" type="submit">
                        <SendIcon/>
                    </IconButton>
                </Stack>
            </form>
        </Paper>
    )
}

export default MessageInputs