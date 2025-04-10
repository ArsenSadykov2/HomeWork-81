import './App.css'
import ToolBar from "./components/ToolBar/ToolBar.tsx";
import {ToastContainer} from "react-toastify";
import {CssBaseline} from "@mui/material";
import NewLink from "./features/NewLink.tsx";


const App = () => (
    <>
        <CssBaseline />
        <ToastContainer/>
        <header>
            <ToolBar/>
        </header>
        <main>
            <NewLink/>
        </main>
    </>
);

export default App
