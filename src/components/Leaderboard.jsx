import { useState, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import { getMatchesLeaderboard } from "../utils/api";

import Loader from "./Loader";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const { loading, error, fetchData } = useAxios();

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getMatchesLeaderboard());
            console.log(res.data);
            if (res.statusCode === 200) {
                setLeaderboard(res.data);
            }
        })();
    }, []);

    return (
        <div>
            {loading && <Loader text="Loading the leaderboard" />}
            {leaderboard.length > 0 ? (
                <div className="flex w-full h-full">
                    <div className="w-1/2 flex h-screen justify-center items-center pb-20 px-10">
                        <div class="w-full flex items-end justify-center space-x-4 mt-10">
                            <div className="w-1/3">
                                <div class="bg-gray-700 rounded-lg flex flex-col justify-end items-center p-2">
                                    <div class="bg-gray-800 shadow-lg flex flex-col w-full rounded-lg">
                                        <img
                                            src={leaderboard[1].avatar}
                                            className="w-full h-[100px] rounded-lg"
                                        />
                                        <p className="text-md text-white p-2 text-center">
                                            {leaderboard[1].username}
                                        </p>
                                    </div>
                                    <span class="text-sm font-medium text-gray-300 mt-2">
                                        Total Wins: {leaderboard[1].totalWins}
                                    </span>
                                </div>
                            </div>

                            <div className="w-1/3">
                                <div class="bg-purple-700 rounded-lg flex flex-col justify-end items-center p-2 transform translate-y-[-60px]">
                                    <div class="bg-gray-800 shadow-lg flex flex-col w-full rounded-lg">
                                        <img
                                            src={leaderboard[0].avatar}
                                            className="w-full h-[100px] rounded-lg"
                                        />
                                        <p className="text-md text-white p-2 text-center">
                                            {leaderboard[0].username}
                                        </p>
                                    </div>
                                    <span class="text-sm font-medium text-gray-300 mt-2">
                                        Total Wins: {leaderboard[0].totalWins}
                                    </span>
                                </div>
                            </div>

                            <div className="w-1/3">
                                <div class="bg-gray-700 rounded-lg flex flex-col justify-end items-center p-2">
                                    <div class="bg-gray-800 shadow-lg flex flex-col w-full rounded-lg">
                                        <img
                                            src={leaderboard[2].avatar}
                                            className="w-full h-[100px] rounded-lg"
                                        />
                                        <p className="text-md text-white p-2 text-center">
                                            {leaderboard[2].username}
                                        </p>
                                    </div>
                                    <span class="text-sm font-medium text-gray-300 mt-2">
                                        Total Wins: {leaderboard[2].totalWins}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex w-full h-full px-10 py-20">
                            <div className="w-full h-full m-2 p-5 pb-10 border rounded-lg shadow bg-gray-800 border border-purple-500">
                                <div className="flex justify-center text-2xl mb-2 ml-2 text-purple-500 font-semibold">
                                    Top Players:
                                </div>
                                <div className="flex ml-2 w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                                    {leaderboard.length > 0 ? (
                                        <div className="flex flex-col space-y-2 text-gray-400 text-lg">
                                            <table className="table-fixed w-full">
                                                <tr className="flex  my-1">
                                                    <td className="w-1/6 text-xl">Rank</td>

                                                    <td className="w-4/6 text-xl ">
                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                            Username
                                                        </div>
                                                    </td>

                                                    <td className="w-1/6 text-xl">
                                                        <div className="">Wins</div>
                                                    </td>
                                                </tr>
                                                {leaderboard.map((player, index) => (
                                                    <tr key={player._id} className="flex my-1">
                                                        <td className="w-1/6 text-xl pl-3">
                                                            {index + 1}.
                                                        </td>

                                                        <td className="w-4/6 text-xl ">
                                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                                {player.username}
                                                            </div>
                                                        </td>

                                                        <td className="w-1/6 text-xl pl-4">
                                                            <div className="">
                                                                {player.totalWins}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
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
            ) : (
                <div className="flex h-screen items-center justify-center font-semibold text-gray-600 text-4xl">
                    Alas! Nothing to show :{`(`}
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
