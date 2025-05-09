import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useState } from "react";
import { getActiveTournaments, completeTournament } from "../../utils/api";
import Loader from "../Loader";
import { ToastContainer, toast } from "react-toastify";

const CompleteTournament = () => {
    const { loading, error, fetchData } = useAxios();
    const [tournaments, setTournaments] = useState([]);
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getActiveTournaments());
            if (res.statusCode === 200) {
                setTournaments(res.data);
            }
        })();
    }, [reRender]);

    const handleCompletion = async (tournamentId) => {
        const res = fetchData(() => completeTournament({ tournamentId }));
        if (res?.statusCode === 200 || res?.statusCode === 201) {
            toast(res.message, {
                autoClose: 3000,
                theme: "dark",
            });
        }
        setReRender((prev) => !prev);
    };

    return (
        <div className="p-2 w-full h-full">
            <div
                className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent w-full h-full
            border border-purple-500 rounded-lg p-4"
            >
                {loading && <Loader />}
                <ToastContainer />
                {tournaments.length > 0 ? (
                    <div>
                        {tournaments.map((t) => (
                            <div
                                key={t._id}
                                className="bg-gray-800 p-4 shadow-md flex justify-between rounded-lg items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-purple-400">
                                        {t.name}
                                    </h2>
                                    <div className="flex gap-5">
                                        <p className="text-sm text-zinc-400">Status: {t.status}</p>
                                        <p className="text-sm text-zinc-400">
                                            Participants: {t.participantsCount || "N/A"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="flex items-center justify-center gap-1 bg-primary mt-3 px-4 text-white py-2 rounded hover:bg-purple-800 focus:outline-none text-xl"
                                    onClick={() => handleCompletion(t._id)}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=100&id=11697&format=png&color=FFFFFF"
                                        className="w-7 h-7"
                                    />
                                    <p className="mb-1">{loading ? "Completing..." : "Complete"}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center text-3xl text-gray-500">
                        No active tournaments
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompleteTournament;
