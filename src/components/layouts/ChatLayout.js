import {Backdrop, CircularProgress, Grid, Toolbar, useMediaQuery} from "@mui/material";
import UserList from "../UserList";
import {Navigate, Outlet, useParams} from "react-router";
import {useStore} from "../../hooks/useStore";
import Header from "../Header";
import CreateDialog from "../CreateDialog";

const ChatLayout = () => {

    const params = useParams()

    const isDownSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const user = useStore(store => store.user)

    const loading = useStore(store => store.loading)

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }
    if (!user) return <Navigate to="/auth"/>

    return (
        <>
            <Header/>
            <Toolbar variant="dense"/>
            <Grid container spacing={2} height="100vh">
                {
                    isDownSm && !params.chatID
                    &&
                    <Grid item xs={12}>
                        <UserList/>
                    </Grid>
                }
                {
                    isDownSm && params.chatID
                    &&
                    <Grid item xs={12}>
                        <Outlet/>
                    </Grid>
                }
                {
                    !isDownSm
                    &&
                    <Grid item xs={12} sm={4} md={3}>
                        <UserList/>
                    </Grid>
                }
                {
                    !isDownSm
                    &&
                    <Grid item xs={12} sm={8} md={9}>
                        <Outlet/>
                    </Grid>
                }
            </Grid>
            <CreateDialog/>
        </>

    )
}

export default ChatLayout