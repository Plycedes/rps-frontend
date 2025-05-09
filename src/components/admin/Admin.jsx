import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function Admin() {
    return (
        <div className="flex">
            <div className="w-1/6">
                <AdminSidebar />
            </div>
            <div className="w-5/6 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
