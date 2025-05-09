import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAxios } from "../hooks/useAxios";
import { logoutUser } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { connect } from "../utils/blockchainApi";

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { loading, error, fetchData } = useAxios();

    const [account, setAccount] = useState(localStorage.getItem("account"));

    useEffect(() => {
        window.ethereum.on("accountsChanged", accountWasChanged);
    });
    useEffect(() => {}, [account]);

    const connectMetamask = async () => {
        const account = await connect();
        localStorage.setItem("account", account);
        setAccount(account);
    };

    const accountWasChanged = (accounts) => {
        setAccount(accounts[0]);
        if (accounts[0] === undefined) {
            localStorage.setItem("account", "");
        } else {
            localStorage.setItem("account", accounts[0]);
        }
    };

    const handleLogout = async () => {
        const res = await fetchData(() => logoutUser());
        if (res?.statusCode === 200) {
            dispatch(setUser({ user: "", token: "" }));
            navigate("/");
        }
    };

    const linkClasses = ({ isActive }) =>
        `flex gap-2 items-center block py-2 px-4 rounded hover:bg-gray-700 ${
            isActive ? "bg-gray-700" : ""
        }`;

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
                        {user && (
                            <div className="flex items-center gap-3">
                                <img src={user.avatar} className="w-15 h-15 rounded-full" />
                                <div>
                                    <p className="text-xl text-purple-500">{user.username}</p>
                                    {localStorage.getItem("account") ? (
                                        <p className="text-lg text-gray-400 pb-1">
                                            {account.substring(0, 10)}
                                        </p>
                                    ) : (
                                        <button
                                            className="bg-primary text-white text-xs px-2 py-1 rounded-lg hover:bg-purple-500"
                                            onClick={connectMetamask}
                                        >
                                            Connect
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-5/6">
                    <div className="rounded bg-gray-800 p-2 h-full">
                        <ul className="text-xl my-1">
                            <li>
                                <NavLink to="" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=GFDbOB2OqPWt&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Play
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="tournaments" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=NuFBBv7mvFEA&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Tournaments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="profile" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="leaderboard" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=70624&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Leaderboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="marketplace" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=78230&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Marketplace
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="contact-us" className={linkClasses}>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=2848&format=png&color=ad46ff"
                                        className="w-7 h-7"
                                    />
                                    Contact Us
                                </NavLink>
                            </li>

                            <li>
                                <hr className="my-3 border-t-2 border-gray-400" />
                            </li>
                            <li>
                                <div className="my-4">
                                    <input
                                        className="block py-2 px-4 bg-gray-700 rounded w-full"
                                        placeholder="Search"
                                    />
                                    <button
                                        className="flex items-center justify-center gap-1 bg-primary mt-3 w-full text-white py-2 rounded hover:bg-purple-800 focus:outline-none text-xl"
                                        onClick={() => {}}
                                    >
                                        <img
                                            src="https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF"
                                            className="w-7 h-7 mt-1"
                                        />
                                        Search
                                    </button>
                                </div>
                            </li>
                            <li>
                                <hr className="my-3 border-t-2 border-gray-400" />
                            </li>
                            <button
                                className="flex items-center justify-center gap-1 bg-gray-600 mt-3 w-full text-white py-2 rounded hover:bg-purple-800 focus:outline-none text-xl"
                                onClick={handleLogout}
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=26217&format=png&color=FFFFFF"
                                    className="w-7 h-7 mt-1"
                                />
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
