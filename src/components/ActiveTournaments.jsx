import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { getActiveTournaments } from "../utils/api";
import Loader from "./Loader";

const ActiveTournaments = () => {
    const { loading, error, fetchData } = useAxios();
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData(() => getActiveTournaments());
            if (res.statusCode === 200) {
                console.log(res.data);
                setTournaments(res.data);
            }
        })();
    }, []);

    return (
        <div className="space-y-4">
            {loading && <Loader />}
            {tournaments.map((t) => (
                <div key={t._id} className="bg-zinc-800 p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold">{t.name}</h2>
                    <p className="text-sm text-zinc-400">Created by: {t.createdBy.username}</p>
                    <p className="text-sm text-zinc-400">Status: {t.status}</p>
                </div>
            ))}
        </div>
    );
};

export default ActiveTournaments;
