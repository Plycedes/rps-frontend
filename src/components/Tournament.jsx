import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import Loader from "./Loader";
import { getTournament, getLeaderboard } from "../utils/api";

function Tournament() {
    const { id } = useParams();
    const { loading, error, fetchData } = useAxios();

    const [tournament, setTournament] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const tournamentRes = await fetchData(() => getTournament(id));
                const leaderboardRes = await fetchData(() => getLeaderboard(id));
                console.log(tournamentRes);
                setTournament(tournamentRes.data);
                setLeaderboard(leaderboardRes.data);
            } catch (err) {
                console.error("Failed to fetch tournament data", err);
            }
        })();
    }, [id]);

    if (!tournament) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="h-screen p-2">
            {loading && <Loader />}
            <div className="rounded-lg shadow bg-[#151A25] h-full flex">
                {/* Left Section */}
                <div className="w-1/2 py-2 flex flex-col space-y-4">
                    {/* Tournament Info */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow border border-purple-500">
                        <h2 className="text-4xl font-bold text-white mb-2">{tournament.name}</h2>
                        <p className="text-zinc-400 mb-1 text-lg">
                            <span className="text-purple-400">Created By:</span>{" "}
                            {tournament.createdBy.username}
                        </p>
                        <p className="text-zinc-400 mb-1 text-lg">
                            <span className="text-purple-400">Status:</span> {tournament.status}
                        </p>
                        <p className="text-zinc-400 mb-1 text-lg">
                            <span className="text-purple-400">Winner:</span>{" "}
                            {tournament.winner?.username || "N/A"}
                        </p>
                        <p className="text-zinc-400 mb-1 text-lg">
                            <span className="text-purple-400">Participants:</span>{" "}
                            {tournament.participantsCount}
                        </p>
                        <p className="text-zinc-400 text-lg">
                            <span className="text-purple-400">Ended On:</span>{" "}
                            {new Date(tournament.endDate).toLocaleString()}
                        </p>
                    </div>

                    {/* Reward Card */}
                    <Link
                        to={`/rewards/${tournament.reward._id}`}
                        className="bg-gray-800 rounded-lg p-4 shadow flex items-center space-x-4 hover:bg-gray-700 border border-purple-500 transition"
                    >
                        <img
                            src={tournament.reward.imageUrl}
                            alt={tournament.reward.name}
                            className="w-40 h-40 object-cover rounded-lg border border-purple-500"
                        />
                        <div className="w-full h-full flex flex-col justify-start">
                            <h3 className="text-2xl text-white font-semibold">
                                {tournament.reward.name}
                            </h3>
                            <p className="text-zinc-400 text-lg">Reward NFT</p>
                            <p className="text-zinc-400 text-lg">
                                Winner: {tournament.winner?.username || "N/A"}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Right Section - Scrollable Leaderboard */}
                <div className="w-1/2 overflow-y-auto space-y-4 bg-gray-800 rounded-lg m-2 ml-4 p-4 border border-purple-500 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                    <h2 className="text-xl font-semibold text-white mb-2">Leaderboard</h2>
                    {leaderboard.map((entry, index) => (
                        <Link
                            key={entry._id}
                            to={`/profile/${entry.user._id}`}
                            className="flex items-center bg-gray-700 rounded-lg p-3 space-x-4 hover:bg-gray-600 transition"
                        >
                            <p className="text-white font-medium">{index + 1}.</p>
                            <div className="flex justify-between w-full">
                                <p className="text-white font-medium">{entry.user.username}</p>
                                <p className="text-zinc-400 text-sm">Wins: {entry.wins}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tournament;
