import {Box, Card, CardContent, CardHeader, Stack, TextField} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {LoadingButton} from "@mui/lab";
import {useFormik} from "formik";
import {nameValidationSchema} from "../utils/validate";
import {useDispatch} from "../hooks/useDispatch";
import {setSnackbar, setUser} from "../context/actions";
import {useStore} from "../hooks/useStore";
import {Navigate} from "react-router";
import {useStompClient} from "react-stomp-hooks";

const Auth = () => {

    const dispatch = useDispatch()

    const client = useStompClient()

    const user = useStore(store => store.user)

    const { handleSubmit, getFieldProps, errors, touched } = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: nameValidationSchema,
        enableReinitialize: true,
        onSubmit: (data) => {
            client.publish({ destination: "/app/users/create", body: JSON.stringify(data) })
            localStorage.setItem("user", JSON.stringify(data))
            dispatch(setUser(data))
            dispatch(setSnackbar(true, "Welcome to chat!", "success"))
        }
    })

    if (user) return <Navigate to="/"/>

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
            height="100vh"
        >
            <Card
                sx={{ width: { xs: "100%", sm: 375 } }}
                elevation={10}
            >
                <CardHeader
                    avatar={<LoginIcon color="primary"/>}
                    title="Login"
                    titleTypographyProps={{ variant: "h6", color: "primary" }}
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                variant="filled"
                                label="Name"
                                error={ touched.name && Boolean(errors.name) }
                                helperText={ touched.name && errors.name }
                                { ...getFieldProps('name') }
                            />
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={false}
                            >
                                Enter
                            </LoadingButton>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Auth