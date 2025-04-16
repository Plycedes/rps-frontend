import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { getUserParticipatedTournaments } from "../../utils/api";

const TournamentSelection = ({ userId }) => {
    const { loading, error, fetchData } = useAxios();

    const [tournaments, setTournaments] = useState([]);
    const [findingOpponent, setFindingOpponent] = useState(false);
    const { socket, connectSocket, isConnected } = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournaments = async () => {
            const res = await fetchData(() => getUserParticipatedTournaments());
            setTournaments(res.data);
        };
        fetchTournaments();
    }, [userId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("matchReady", ({ matchId }) => {
            navigate(`/game/${matchId}`);
        });

        socket.on("waitingForOpponent", () => {
            setFindingOpponent(true);
        });

        return () => {
            socket.off("matchReady");
            socket.off("waitingForOpponent");
        };
    }, [socket]);

    const handleJoinTournament = (tournamentId) => {
        if (!isConnected) connectSocket();
        socket.emit("findOrCreateMatch", { userId, tournamentId });
    };

    if (loading) {
        return <div className="text-purple-300 text-center mt-10">Loading tournaments...</div>;
    }

    if (findingOpponent) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-purple-300">
                <div className="text-2xl font-semibold mb-4">Finding an opponent...</div>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black px-4 py-10 text-white">
            <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">
                Particiapted Tournaments
            </h1>
            <div className="grid gap-6 max-w-3xl mx-auto">
                {tournaments.map((t) => (
                    <div
                        key={t._id}
                        onClick={() => handleJoinTournament(t._id)}
                        className="cursor-pointer bg-gray-800 hover:bg-purple-800 transition-all duration-200 p-6 rounded-2xl border-2 border-purple-600"
                    >
                        <h2 className="text-xl font-semibold text-purple-300">{t.name}</h2>
                        <p className="text-sm text-gray-400">
                            Starts: {new Date(t.c).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TournamentSelection;
