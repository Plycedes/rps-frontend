import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useState } from "react";
import { getActiveTournaments } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import Loader from "../Loader";

const ActiveTournaments = () => {
    const { loading, error, fetchData } = useAxios();
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getActiveTournaments());
            if (res.statusCode === 200) {
                setTournaments(res.data);
            }
        })();
    }, []);

    return (
        <div className="space-y-4">
            {loading && <Loader />}
            {tournaments.map((t) => (
                <Link
                    key={t._id}
                    to={`/tournament/${t._id}`}
                    className="bg-gray-800 p-4 shadow-md flex justify-between rounded-lg"
                >
                    <div>
                        <h2 className="text-xl font-semibold text-purple-400">{t.name}</h2>
                        <div className="flex gap-5">
                            <p className="text-sm text-zinc-400">Status: {t.status}</p>
                            <p className="text-sm text-zinc-400">
                                Participants: {t.participantsCount || "N/A"}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Ends on: {new Date(t.endDate).toLocaleString()}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default ActiveTournaments;
