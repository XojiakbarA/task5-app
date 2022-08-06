import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "../hooks/useDispatch";
import {setDialog} from "../context/actions";

const CustomSpeedDial = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setDialog(true))
    }

    return (
        <SpeedDial
            onClick={handleClick}
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<AddIcon/>}
        />
    )
}

export default CustomSpeedDial