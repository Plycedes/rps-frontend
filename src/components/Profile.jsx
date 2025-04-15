import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../utils/api.js";
import { Loader } from "../components";
import { useAxios } from "../hooks/useAxios";

function Profile() {
    const [userData, setUserData] = useState({});
    const { loading, error, fetchData } = useAxios();

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getCurrentUser());
            if (res.statusCode === 200) {
                console.log(res.data);
                setUserData(res.data);
            }
        })();
    }, []);

    return (
        <div>
            {loading && <Loader text="Loading User Profile" />}
            <div>
                <div>
                    <div className="h-screen flex flex-col">
                        <div className="flex h-3/5">
                            <div className="w-1/2 flex">
                                <div className="w-full m-2 p-3 border rounded-lg shadow bg-zinc-900 border border-purple-500">
                                    <div className="h-full">
                                        <div className="">
                                            <h1 className="text-2xl font-semibold text-purple-500">
                                                Welcome!
                                            </h1>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center m-2 mt-3 bg-gray-800 p-3 rounded-lg">
                                                <div className="flex gap-3 items-center">
                                                    <img
                                                        src={userData.avatar}
                                                        className="w-20 h-20 rounded-lg"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="flex text-md text-purple-200 gap-1">
                                                            <p className="text-purple-400">
                                                                Email:
                                                            </p>
                                                            {userData.email}
                                                        </div>
                                                        <div className="flex text-md text-purple-200 gap-1">
                                                            <p className="text-purple-400">
                                                                Username:
                                                            </p>
                                                            {userData.username}
                                                        </div>
                                                        <div className="flex text-md text-purple-200 gap-1">
                                                            <p className="text-purple-400">
                                                                WalletId:
                                                            </p>
                                                            {userData.walletId}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mx-2 mt-3 bg-gray-800 p-3 rounded-lg">
                                            <h1 className="text-purple-300 text-xl font-semibold">
                                                Account Stats:
                                            </h1>
                                            <div className="flex gap-4 ml-2 mt-3 text-gray-100">
                                                <div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=uSWplRVhqqlS&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            Balance:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.balance}
                                                        </h1>
                                                    </div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=16007&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            Tournaments Participated:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.tournamentsParticipated}
                                                        </h1>
                                                    </div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=2koI9uU0dBK7&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            Tournaments Won:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.tournamentsWon}
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=65661&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            Matches Played:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.matchesPlayed}
                                                        </h1>
                                                    </div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=37862&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            Matches Won:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.matchesWon}
                                                        </h1>
                                                    </div>
                                                    <div className="flex gap-3 mb-2">
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=ZET2DXXF8Nhj&format=png&color=ad46ff"
                                                            className="w-6 h-6"
                                                        />
                                                        <h1 className="text-md font-semibold text-gray-200">
                                                            NFTs Owned:
                                                        </h1>
                                                        <h1 className="text-md text-purple-300">
                                                            {userData.nftsOwned}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 flex">
                                <div className="w-full m-2 p-3 border rounded-lg shadow bg-zinc-900 border border-purple-500">
                                    <div className="flex justify-center text-2xl text-purple-500 font-semibold">
                                        Signed Petitions
                                    </div>
                                    <div className="flex h-full my-2 pb-10">
                                        <div className="w-full h-full rounded-lg overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                                            {false ? (
                                                <div>
                                                    <table className="table-fixed w-full">
                                                        {votedPetitons.map((petition, index) => (
                                                            <tr
                                                                key={petition.pId}
                                                                className="flex text-white my-1"
                                                            >
                                                                <td className="w-1/12 text-xl">
                                                                    {index + 1}.
                                                                </td>

                                                                <td className="w-5/12 text-xl text-purple-300 ml-1">
                                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        {petition.title}
                                                                    </div>
                                                                </td>

                                                                <td className="w-6/12 text-xl ml-5 text-gray-300">
                                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        {petition.description}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </table>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full  flex justify-center items-center text-3xl text-gray-500">
                                                    Nothing to show {":("}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-2/5 mb-4">
                            <div className="w-full h-full m-2 p-2 pb-10 border rounded-lg shadow bg-zinc-900 border border-purple-500">
                                <div className="text-2xl mb-2 ml-2 text-purple-500 font-semibold">
                                    Deployed Petitions:
                                </div>
                                <div className="flex ml-2 w-full h-full overflow-x-scroll scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                                    {false ? (
                                        <div className="flex flex-row space-x-4">
                                            {petitions.map((petition) => (
                                                <div key={petition.pId} className="flex-shrink-0">
                                                    <MiniCard petition={petition} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-center items-center text-3xl text-gray-500">
                                            Nothing to show {":("}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
