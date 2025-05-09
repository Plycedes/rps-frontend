import { useState } from "react";
import { Copy } from "lucide-react";

export const NFTItem = ({ nft }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (nftId) => {
        try {
            await navigator.clipboard.writeText(nftId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };
    return (
        <div className="flex gap-4 items-center">
            <img src={nft.imageUrl} className="w-25 h-25 rounded-lg border border-purple-500 p-1" />
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-purple-400">{nft.name}</h2>
                <div className="flex items-center justify-between bg-gray-800 text-white p-3 rounded border border-gray-600 w-fit max-w-full">
                    <span className="truncate">{nft._id}</span>
                    <button
                        onClick={() => handleCopy(nft._id)}
                        className="ml-3 hover:text-purple-400"
                    >
                        {copied ? (
                            <img
                                src="https://img.icons8.com/?size=100&id=3061&format=png&color=ad46ff"
                                className="w-5 h-5"
                            />
                        ) : (
                            <Copy size={18} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
