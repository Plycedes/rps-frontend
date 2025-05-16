import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { mintNFT } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import {
    mintNFTWithBroadcast,
    viewNFTWithBroadcast,
    transferNFTWithBroadcast,
} from "../../utils/blockchainApi";

function Mint() {
    const [form, setForm] = useState({ name: "", nftImg: null });
    const { loading, error, fetchData } = useAxios();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("nftImg", form.nftImg);

        //const res = await fetchData(() => mintNFT(formData));
        const res = await mintNFTWithBroadcast(
            "https://res.cloudinary.com/dxsffcg6l/image/upload/v1744889434/Screenshot_2025-04-17_165730_dew98g.png"
        );

        if (res?.statusCode === 201 || res?.statusCode === 200) {
            toast(res.message, {
                autoClose: 3000,
                theme: "dark",
            });
        }
        setForm({ name: "", nftImg: null });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
            <ToastContainer />
            {loading && <Loader />}
            <div className="flex flex-col p-12 border border-purple-500 rounded-xl items-center gap-4">
                <div className="flex gap-2 items-center mb-4">
                    <img
                        src="https://img.icons8.com/?size=100&id=RZhEJ5DGO5vJ&format=png&color=ad46ff"
                        className="w-12 h-12"
                    />
                    <h1 className="text-3xl font-bold mb-2">Mint NFT</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="NFT Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        name="nftImg"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full p-3 bg-primary rounded hover:bg-purple-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Minting..." : "Mint NFT"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Mint;
