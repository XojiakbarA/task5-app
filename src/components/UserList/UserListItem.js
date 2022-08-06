import {
    Badge,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChatIcon from '@mui/icons-material/Chat';
import AddCommentIcon from '@mui/icons-material/AddComment';
import {useState} from "react";
import {useStore} from "../../hooks/useStore";
import {setChatBadges, setDialog} from "../../context/actions";
import {useDispatch} from "../../hooks/useDispatch";
import {Link} from "react-router-dom";
import {useParams} from "react-router";

const UserListItem = ({ user }) => {

    const dispatch = useDispatch()

    const params = useParams()

    const currentUser = useStore(store => store.user)

    const chatBadges = useStore(store => store.chatBadges)

    const isMe = currentUser.id === user.id

    const initOpen = user?.chats?.map(ch => ch.id).includes(+params.chatID)

    const [open, setOpen] = useState(initOpen)

    const handleUserClick = async () => {
        setOpen(prev => !prev)
    }
    const handleAddClick = () => {
        dispatch(setDialog(true))
    }
    const handleChatClick = (chatID) => {
        dispatch(setChatBadges(chatBadges.filter(ch => ch !== chatID)))
    }

    return (
        <>
            <ListItemButton
                onClick={handleUserClick}
                disabled={isMe}
                component={Link}
                to={open ? `/` : `/users/${user.id}`}
            >
                <ListItemText primary={user.name + (isMe ? " (me)" : "")} />
                <Badge variant="dot" color="error" sx={{ mr: 2 }} invisible/>
                {!isMe && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {
                !isMe
                &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List
                        dense
                        component="div"
                        disablePadding
                        subheader={<ListSubheader>Subjects</ListSubheader>}
                    >
                        {
                            user?.chats?.map(chat => (
                                <ListItemButton
                                    key={chat.id}
                                    sx={{ pl: 4 }}
                                    component={Link}
                                    to={`users/${user.id}/chats/${chat.id}`}
                                    selected={+params.chatID === chat.id}
                                    onClick={ e => handleChatClick(chat.id) }
                                >
                                    <ListItemIcon>
                                        <Badge
                                            variant="dot"
                                            color="error"
                                            invisible={ !chatBadges.includes(chat.id) }
                                        >
                                            <ChatIcon/>
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText primary={chat.subject}/>
                                </ListItemButton>
                            ))
                        }
                        <ListItemButton sx={{ pl: 4 }} onClick={handleAddClick}>
                            <ListItemIcon>
                                <AddCommentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Start a new chat" />
                        </ListItemButton>
                    </List>
                </Collapse>
            }
        </>
    )
}

export default UserListItem