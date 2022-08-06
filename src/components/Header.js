import {AppBar, Box, Breadcrumbs, Button, Grid, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useDispatch} from "../hooks/useDispatch";
import {setUser} from "../context/actions";
import {useStore} from "../hooks/useStore";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const user = useStore(store => store.user)

    const users = useStore(store => store.users)

    const userInList = users?.find(u => u.id === user.id)

    const currentChat = userInList?.chats.find(ch => ch.id === +params.chatID)
    const receiver = users?.find(u => u.id === +params.receiverID)

    const handleExitClick = () => {
        dispatch(setUser(null))
        localStorage.removeItem("user")
    }

    return (
        <AppBar>
            <Toolbar variant="dense">
                <Grid container spacing={2}>
                    <Grid item xs={3} sm={4} md={3}>
                        <Button component={Link} to="/" color="inherit">Task 5</Button>
                    </Grid>
                    <Grid item xs={9} sm={8} md={3} display="flex" alignItems="center">
                        {
                            currentChat &&
                            <Breadcrumbs aria-label="breadcrumb" color="inherit">
                                <Typography variant="body2">{receiver?.name}</Typography>
                                <Typography variant="body1">{currentChat?.subject}</Typography>
                            </Breadcrumbs>
                        }
                    </Grid>
                </Grid>
                <Box flexGrow={1}/>
                <Tooltip title="Exit">
                    <IconButton color="inherit" onClick={handleExitClick}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

export default Header