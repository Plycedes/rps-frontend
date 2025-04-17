import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const choices = [
    {
        name: "rock",
        image: "https://res.cloudinary.com/dxsffcg6l/image/upload/v1743837256/rock_ofzboo.png",
    },
    {
        name: "paper",
        image: "https://res.cloudinary.com/dxsffcg6l/image/upload/v1743837256/paper_xrtmqd.png",
    },
    {
        name: "scissors",
        image: "https://res.cloudinary.com/dxsffcg6l/image/upload/v1743837256/scissor_tgkvbs.png",
    },
];

const GamePlay = () => {
    const userId = useSelector((state) => state.auth.user?._id);
    const navigate = useNavigate();
    const { matchId } = useParams();
    const { socket } = useSocket();
    const [selected, setSelected] = useState(null);
    const [opponentChoice, setOpponentChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [round, setRound] = useState(1);
    const [scores, setScores] = useState({});
    const [finalWinner, setFinalWinner] = useState(null);

    useEffect(() => {
        if (!socket) return;

        socket.emit("joinMatchRoom", { matchId }); // Correct event name

        socket.on("roundResult", ({ winnerId, playerChoice, opponentChoice, scores }) => {
            // Correct event name
            setSelected(null);
            setOpponentChoice(null);
            setWaiting(false);
            setScores(scores);

            if (winnerId === "draw") {
                setResult("It's a draw!");
            } else if (winnerId === userId) {
                setResult("You win this round! 🎉");
            } else {
                setResult("You lose this round 😢");
            }

            setRound((prev) => prev + 1);
        });

        socket.on("finalResult", ({ winnerId, scores }) => {
            // Correct event name
            setScores(scores);
            setWaiting(false);

            if (winnerId === "draw") {
                setFinalWinner("It's a draw overall!");
            } else if (winnerId === userId) {
                setFinalWinner("You won the game! 🏆");
            } else {
                setFinalWinner("You lost the game 😞");
            }
        });

        socket.on("waitingForOpponent", () => {
            // Correct event name
            setWaiting(true);
            setResult(null);
        });

        return () => {
            socket.off("roundResult");
            socket.off("finalResult");
            socket.off("waitingForOpponent");
        };
    }, [socket, matchId, userId]);

    const handleChoice = (move) => {
        setSelected(move);
        setResult(null);
        setWaiting(true);
        socket.emit("makeMove", { matchId, userId, move });
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-purple-400 mb-6">Rock Paper Scissors</h1>

            {result && <div className="text-xl font-semibold text-purple-300 mb-4">{result}</div>}

            {waiting && (
                <div className="text-purple-400 mb-4 animate-pulse">Waiting for opponent...</div>
            )}

            <div className="flex gap-10 justify-center items-center mt-6 flex-wrap">
                {choices.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => handleChoice(c.name)}
                        disabled={waiting}
                        className={`transition-all duration-200 transform hover:scale-105 ${
                            selected === c.name ? "border-4 border-purple-600" : ""
                        } rounded-xl overflow-hidden bg-gray-800`}
                    >
                        <img src={c.image} alt={c.name} className="w-32 h-32 object-contain" />
                    </button>
                ))}
            </div>

            <div className="mt-10 text-center">
                {selected && (
                    <div className="text-sm text-gray-400">
                        You chose: <span className="text-purple-300">{selected}</span>
                    </div>
                )}
                {opponentChoice && (
                    <div className="text-sm text-gray-400">
                        Opponent chose: <span className="text-purple-300">{opponentChoice}</span>
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-sm text-gray-300">
                <p>Round: {round > 3 ? 3 : round}/3</p>
                <p>Your Score: {scores[userId] || 0}</p>
                <p>
                    Opponent Score: {Object.entries(scores).find(([id]) => id !== userId)?.[1] || 0}
                </p>
            </div>

            {finalWinner && (
                <div className="mt-6 text-2xl font-bold text-yellow-400">{finalWinner}</div>
            )}

            {finalWinner && (
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    Back to Tournaments
                </button>
            )}
        </div>
    );
};

export default GamePlay;
