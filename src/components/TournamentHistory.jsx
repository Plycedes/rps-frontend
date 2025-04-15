import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { getPreviousTournaments } from "../utils/api";
import Loader from "./Loader";

const TournamentsHistory = () => {
    const { loading, error, fetchData } = useAxios();
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getPreviousTournaments());
            if (res.statusCode === 200) {
                setTournaments(res.data);
            }
        })();
    }, []);

    return (
        <div className="space-y-4">
            {loading && <Loader />}
            {tournaments.map((t) => (
                <div key={t._id} className="bg-gray-800 p-4 rounded shadow-md flex justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-purple-400">{t.name}</h2>
                        <div className="flex gap-5">
                            <p className="text-sm text-zinc-400">
                                Winner: {t.winner?.username || "N/A"}
                            </p>
                            <p className="text-sm text-zinc-400">
                                Participants: {t.participantsCount || "N/A"}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Ended on: {new Date(t.endDate).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TournamentsHistory;
