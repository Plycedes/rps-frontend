import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { createTournament } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";

function CreateTournament() {
    const [form, setForm] = useState({
        name: "",
        reward: "",
        endDate: "",
    });

    const { loading, error, fetchData } = useAxios();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endDateMs = new Date(form.endDate).getTime();
        if (isNaN(endDateMs)) {
            toast.error("Please enter a valid end date", {
                autoClose: 3000,
                theme: "dark",
            });
            return;
        }

        const payload = {
            name: form.name,
            reward: form.reward,
            endDate: endDateMs,
        };

        const res = await fetchData(() => createTournament(payload));

        if (res?.statusCode === 201 || res?.statusCode === 200) {
            toast.success(res.message, {
                autoClose: 3000,
                theme: "dark",
            });
            setForm({ name: "", reward: "", endDate: "" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
            <ToastContainer />
            {loading && <Loader />}
            <div className="flex flex-col p-10 border border-purple-500 rounded-xl items-center gap-4">
                <div className="flex gap-2 items-center mb-4">
                    <img
                        src="https://img.icons8.com/?size=100&id=48&format=png&color=ad46ff"
                        className="w-10 h-10"
                    />
                    <h1 className="text-3xl font-bold mb-2">Create Tournament</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Tournament Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />

                    <input
                        name="reward"
                        type="text"
                        placeholder="Reward NFT ID"
                        value={form.reward}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />

                    <input
                        name="endDate"
                        type="datetime-local"
                        value={form.endDate}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full p-3 bg-primary font-semibold rounded hover:bg-purple-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Creating Tournament..." : "Create Tournament"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTournament;
