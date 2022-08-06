import {Avatar, Box, Fade, Paper, Stack, Typography} from "@mui/material";

const MessageListItem = ({ message, right }) => {

    const date = new Date(message.createdAt)

    return (
        <Fade in>
        <Stack
            direction={right ? 'row-reverse' : 'row'}
            spacing={1}
            sx={{ alignSelf: right ? 'end' : 'start',}}
        >
            <Avatar/>
            <Paper
                sx={{
                    padding: 1,
                    minWidth: 120,
                    maxWidth: 500,
                    bgcolor: right ? 'primary.light' : 'grey.300',
                    color: right ? 'primary.contrastText' : 'common.black'
                }}
                elevation={4}
            >
                <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="start">
                    <Typography
                        variant="body1"
                        sx={{ wordBreak: 'break-all' }}
                    >
                        {message.content}
                    </Typography>
                    <Typography
                        alignSelf="self-end"
                        variant="caption"
                        mt={1}
                    >
                        {String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')}
                    </Typography>
                </Box>
            </Paper>
        </Stack>
        </Fade>
    )
}

export default MessageListItem