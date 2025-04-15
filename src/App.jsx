import { Outlet } from "react-router-dom";
import { Sidebar } from "./components";

function App() {
    return (
        <div className="flex">
            <div className="w-1/6">
                <Sidebar />
            </div>
            <div className="w-5/6 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                <Outlet />
            </div>
        </div>
    );
}

export default App;

