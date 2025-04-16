import React from "react";

const Navbar = ({ tab, setTab }) => {
    return (
        <div className="w-full sticky top-0 z-10 bg-gray-900 flex rounded-t-lg">
            <button
                className={`px-4 py-2 rounded-t-lg w-1/2 ${
                    tab === "listed"
                        ? "border-b border-purple-500 text-purple-400"
                        : " border-purple-500 text-white hover:bg-gray-800"
                }`}
                onClick={() => setTab("listed")}
            >
                Listed NFTs
            </button>
            <button
                className={`px-4 py-2 rounded-t-lg w-1/2 ${
                    tab === "user"
                        ? "border-b border-purple-500 text-purple-400"
                        : " border-purple-500 text-white hover:bg-gray-800"
                }`}
                onClick={() => setTab("user")}
            >
                Your NFTs
            </button>
        </div>
    );
};

export default Navbar;
