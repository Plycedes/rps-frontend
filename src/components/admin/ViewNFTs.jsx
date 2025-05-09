import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useState } from "react";
import { getUserNFTs } from "../../utils/api";
import Loader from "../Loader";
import { Copy } from "lucide-react";

function ViewNFTs() {
    const { loading, error, fetchData } = useAxios();
    const [adminNFT, setAdminNFT] = useState([]);
    const [copied, setCopied] = useState(false);
    const textToCopy = "0xAbCdEf1234567890";

    useEffect(() => {
        (async () => {
            const nftRes = await fetchData(() => getUserNFTs());
            setAdminNFT(nftRes.data);
        })();
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    return (
        <div className="p-2 w-full h-full">
            <div
                className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent w-full h-full
            border border-purple-500 rounded-lg p-4"
            >
                {loading && <Loader />}
                {error && <p className="text-red-500">{error}</p>}
                {adminNFT.map((nft) => (
                    <p
                        key={nft._id}
                        className="bg-gray-800 p-4 shadow-md flex justify-between rounded-lg items-center"
                    >
                        <div className="flex gap-4">
                            <img
                                src={nft.imageUrl}
                                className="w-25 h-25 rounded-lg border border-purple-500 p-1"
                            />
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xl font-semibold text-purple-400">
                                    {nft.name}
                                </h2>
                                <div className="flex items-center justify-between bg-gray-800 text-white p-3 rounded border border-gray-600 w-fit max-w-full">
                                    <span className="truncate">{textToCopy}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="ml-3 hover:text-purple-400"
                                    >
                                        <Copy size={18} />
                                    </button>
                                    {copied && (
                                        <span className="ml-2 text-green-400 text-sm">Copied!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ViewNFTs;
