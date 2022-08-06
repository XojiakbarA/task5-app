import CustomSpeedDial from "../../components/CustomSpeedDial";
import ThreePIcon from "@mui/icons-material/ThreeP";
import {Stack, Typography} from "@mui/material";

const Main = () => {

    return (
        <>
        <Stack spacing={1} display="flex" alignItems="center" justifyContent="center" height="100%">
            <ThreePIcon fontSize="large" color="primary"/>
            <Typography variant="h4" color="primary">
                Select a user to start a chat
            </Typography>
        </Stack>
        <CustomSpeedDial/>
        </>
    )
}

export default Main