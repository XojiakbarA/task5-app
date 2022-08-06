import {Route, Routes} from "react-router";
import Auth from "./pages/Auth";
import ChatLayout from "./components/layouts/ChatLayout";
import CustomSnackbar from "./components/CustomSnackbar";
import Main from "./pages/Chat/Main";
import Chat from "./pages/Chat/Chat";
import WebSocketLayout from "./components/layouts/WebSocketLayout";

const App = () => {

    return (
        <>
        <Routes>
            <Route element={<WebSocketLayout/>}>
                <Route path="/" element={<ChatLayout/>}>
                    <Route index element={<Main/>}/>
                    <Route path="/users/:receiverID" element={<Main/>}/>
                    <Route path="/users/:receiverID/chats/:chatID" element={<Chat/>}/>
                </Route>
                <Route path="/auth" element={<Auth/>}/>
            </Route>
        </Routes>
        <CustomSnackbar/>
        </>
    )
}

export default App