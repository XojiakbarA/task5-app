import {ListSubheader, List} from '@mui/material';
import {useEffect} from "react";
import {useDispatch} from "../../hooks/useDispatch";
import {useStore} from "../../hooks/useStore";
import {fetchUsers} from "../../api";
import {setUsers} from "../../context/actions";
import UserListItem from "./UserListItem";

const UserList = () => {

    const dispatch = useDispatch()

    const user = useStore(store => store.user)

    const users = useStore(store => store.users)

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetchUsers(user.id)
            if (res.status === 200) {
                dispatch(setUsers(res.data.content))
            }
        }
        if (user.id) {
            getUsers()
        }
    }, [dispatch, user.id])

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<ListSubheader component="div" id="nested-list-subheader">Users</ListSubheader>}
        >
            {
                users.map(user => (
                    <UserListItem key={user.id} user={user}/>
                ))
            }
        </List>
    )
}

export default UserList