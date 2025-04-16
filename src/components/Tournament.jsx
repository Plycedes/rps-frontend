import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import Loader from "./Loader";
import Countdown from "./Countdown";
import { getTournament, getLeaderboard, joinTournament } from "../utils/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Tournament() {
    const { id } = useParams();
    const { loading, error, fetchData } = useAxios();

    const [tournament, setTournament] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [reRender, setReRender] = useState(false);

    const userId = useSelector((state) => state.auth.user._id);
    const hasParticipated = leaderboard.some((entry) => entry.user._id === userId);
    console.log(userId);

    useEffect(() => {
        (async () => {
            try {
                const tournamentRes = await fetchData(() => getTournament(id));
                const leaderboardRes = await fetchData(() => getLeaderboard(id));
                setTournament(tournamentRes.data);
                setLeaderboard(leaderboardRes.data);
            } catch (err) {
                console.error("Failed to fetch tournament data", err);
            }
        })();
    }, [id, reRender]);

    const handleParticipation = async () => {
        const res = await fetchData(() => joinTournament({ tournamentId: tournament._id }));
        toast(res.message, {
            autoClose: 3000,
            theme: "dark",
        });
        setReRender((prev) => !prev);
    };

    if (!tournament) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="h-screen p-2">
            {loading && <Loader />}
            <ToastContainer />
            <div className="rounded-lg shadow bg-[#151A25] h-full flex">
                {/* Left Section */}
                <div className="w-1/2 py-2 flex flex-col space-y-4">
                    {/* Tournament Info */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow border border-purple-500">
                        <div className="flex justify-between">
                            <h2 className="text-4xl font-bold text-purple-400 mb-4">
                                {tournament.name}
                            </h2>
                            {hasParticipated ? (
                                <div className="flex items-center justify-center bg-zinc-700 text-white rounded px-4 h-10 text-md font-medium">
                                    Participated
                                </div>
                            ) : (
                                <button
                                    className="flex items-center justify-center gap-1 bg-primary w-30 h-10 text-white rounded hover:bg-purple-800 focus:outline-none text-md"
                                    onClick={handleParticipation}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=100&id=8953&format=png&color=FFFFFF"
                                        className="w-5 h-5 mt-1"
                                        alt="Participate Icon"
                                    />
                                    Participate
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2 items-center mb-2">
                            <img
                                src="https://img.icons8.com/?size=100&id=lakvfye1TLJV&format=png&color=FFFFFF"
                                className="w-6 h-6"
                            />
                            <p className="text-zinc-400  text-lg">
                                <span className="text-purple-400">Created By:</span>{" "}
                                {tournament.createdBy.username}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center mb-2">
                            <img
                                src="https://img.icons8.com/?size=100&id=11658&format=png&color=FFFFFF"
                                className="w-6 h-6"
                            />
                            <p className="text-zinc-400  text-lg">
                                <span className="text-purple-400">Status:</span> {tournament.status}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center mb-2">
                            <img
                                src="https://img.icons8.com/?size=100&id=12566&format=png&color=FFFFFF"
                                className="w-6 h-6"
                            />
                            <p className="text-zinc-400  text-lg">
                                <span className="text-purple-400">Winner:</span>{" "}
                                {tournament.winner?.username || "N/A"}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center mb-2">
                            <img
                                src="https://img.icons8.com/?size=100&id=112560&format=png&color=FFFFFF"
                                className="w-6 h-6"
                            />
                            <p className="text-zinc-400  text-lg">
                                <span className="text-purple-400">Participants:</span>{" "}
                                {tournament.participantsCount}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center mb-3">
                            <img
                                src="https://img.icons8.com/?size=100&id=bDrb5MdYaEje&format=png&color=FFFFFF"
                                className="w-6 h-6"
                            />
                            <p className="text-zinc-400 text-lg">
                                {tournament.winner.username ? (
                                    <span className="text-purple-400">Ended On:</span>
                                ) : (
                                    <span className="text-purple-400">Ends On:</span>
                                )}{" "}
                                {new Date(tournament.endDate).toLocaleString()}
                            </p>
                        </div>

                        {!tournament.winner.username && (
                            <Countdown
                                startDate={tournament.createdAt}
                                endDate={tournament.endDate}
                            />
                        )}
                    </div>

                    {/* Reward Card */}
                    <div
                        //to={`/rewards/${tournament.reward._id}`}
                        className="bg-gray-800 rounded-lg p-4 shadow flex items-center space-x-4 border border-purple-500 "
                    >
                        <img
                            src={tournament.reward.imageUrl}
                            alt={tournament.reward.name}
                            className="w-40 h-40 object-cover rounded-lg border border-purple-500"
                        />
                        <div className="w-full h-full flex flex-col justify-start">
                            <h3 className="text-2xl text-purple-400 font-semibold">
                                {tournament.reward.name}
                            </h3>
                            <p className="text-zinc-400 text-lg">Reward NFT</p>
                            <p className="text-zinc-400 text-lg">
                                Winner: {tournament.winner?.username || "N/A"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="border border-purple-500 p-4 bg-gray-800 rounded-lg flex gap-3 ">
                            {tournament.winner.username ? (
                                <div>
                                    <img
                                        src={tournament.winner.avatar}
                                        alt={tournament.reward.name}
                                        className="w-34 h-34 object-cover rounded-lg border border-purple-500"
                                    />
                                    <div className="w-full h-full flex flex-col justify-start">
                                        <h3 className="text-2xl text-purple-400 font-semibold">
                                            Winner
                                        </h3>
                                        <p className="text-zinc-400 text-lg">
                                            Username: {tournament.winner?.username || "N/A"}
                                        </p>
                                        <p className="text-zinc-400 text-lg">
                                            Tournament Wins: {leaderboard[0].wins || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-24 flex justify-center items-center text-2xl text-gray-500">
                                    Winner: To be decided!!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section - Scrollable Leaderboard */}
                <div className="w-1/2 overflow-y-auto space-y-4 bg-gray-800 rounded-lg m-2 ml-4 p-4 border border-purple-500 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                    <h2 className="text-xl font-semibold text-purple-400 mb-2">Leaderboard</h2>
                    {leaderboard.map((entry, index) => (
                        <Link
                            key={entry._id}
                            to={`/profile/${entry.user._id}`}
                            className="flex items-center bg-gray-700 rounded-lg p-3 space-x-4 hover:bg-gray-600 transition"
                        >
                            <p className="text-white font-medium">{index + 1}.</p>
                            <div className="flex justify-between w-full">
                                <p className="text-purple-400 font-medium">{entry.user.username}</p>
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
