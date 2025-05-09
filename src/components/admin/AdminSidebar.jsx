import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();
    return (
        <div className="flex">
            <div className="w-64 flex flex-col gap-10 bg-transparent text-white h-screen p-4">
                <div className="h-1/6">
                    <div className="flex mx-2">
                        <img
                            className="w-10 h-10"
                            src="https://res.cloudinary.com/dxsffcg6l/image/upload/v1744696002/Avid-Logo_hgdvr3.png"
                        />
                        <h1 className="text-3xl font-bold mx-4">
                            C<b className="text-primary">O</b>RE
                        </h1>
                    </div>
                    <div className="rounded bg-gray-800 p-2 px-3 mt-5">
                        <p className="text-xl text-purple-500">Admin</p>
                    </div>
                </div>
                <div className="h-5/6">
                    <div className="rounded bg-gray-800 p-2 h-full">
                        <ul className="text-xl my-1">
                            <li>
                                <NavLink to="/admin/mint">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=RZhEJ5DGO5vJ&format=png&color=ad46ff"
                                            className="w-7 h-7"
                                        />
                                        Mint
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=NuFBBv7mvFEA&format=png&color=ad46ff"
                                            className="w-7 h-7"
                                        />
                                        Tournaments
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/create">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=uSWplRVhqqlS&format=png&color=ad46ff"
                                            className="w-7 h-7"
                                        />
                                        Create
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
