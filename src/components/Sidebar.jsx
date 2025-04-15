import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    //[#414264]
    return (
        <div className="flex">
            <div className="w-64 bg-transparent text-white h-screen p-4">
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
                    <div className="rounded bg-gray-800 p-2 py-2 mt-5">
                        {/* User name and profile image */}
                    </div>
                </div>
                <div className="h-5/6 pb-5 pt-1">
                    <div className="rounded bg-gray-800 p-2 mt-5 h-full">
                        <ul className="text-xl my-1">
                            <li>
                                <NavLink to="">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=GFDbOB2OqPWt&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Play
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="tournaments">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=uSWplRVhqqlS&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Tournaments
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="profile">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=Ib9FADThtmSf&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Profile
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="leaderboard">
                                    <div className="flex gap-2 items-center block py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=70624&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Leaderboard
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="marketplace">
                                    <div className="flex gap-2 items-center block pt-3 py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=7775&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Marketplace
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="contact-us">
                                    <div className="flex gap-2 items-center block pt-3 py-2 px-4 hover:bg-gray-700 rounded">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=2848&format=png&color=7726e6"
                                            className="w-8 h-6"
                                        />
                                        Contact Us
                                    </div>
                                </NavLink>
                            </li>

                            <li>
                                <hr className="my-3 border-t-2 border-gray-400" />
                            </li>
                            <li>
                                <div className="my-6">
                                    <input
                                        className="block py-2 px-4 bg-gray-700 rounded w-full"
                                        placeholder="Search"
                                    />
                                    <button
                                        className="flex items-center justify-center gap-1 bg-primary mt-3 w-full text-white py-2 rounded hover:bg-purple-800 focus:outline-none text-xl"
                                        onClick={() => {}}
                                    >
                                        Search
                                        <img
                                            src="https://img.icons8.com/?size=100&id=7789&format=png&color=FFFFFF"
                                            className="w-8 h-6 mt-1"
                                        />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
