import React from "react";

const NFTCard = ({ nft, currentUserId, tab, onBuy, onList, onUnlist }) => {
    const isOwner =
        typeof nft.owner === "object"
            ? nft.owner._id === currentUserId
            : nft.owner === currentUserId;

    return (
        <div className="border border-purple-500 bg-gray-900 h-72 rounded-xl p-4 flex flex-col items-center shadow-lg">
            <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex gap-2 justify-between w-full">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">
                        {nft.isListedForSale ? `Price: ${nft.price} ETH` : "Not for Sale"}
                    </p>
                </div>
                <div className="0">
                    {tab === "listed" && !isOwner && nft.isListedForSale && (
                        <button
                            onClick={() => onBuy(nft._id)}
                            className="mt-auto bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                            Buy
                        </button>
                    )}
                    {tab === "user" && (
                        <>
                            {!nft.isListedForSale ? (
                                <button
                                    onClick={() => onList(nft._id)}
                                    className="mt-auto bg-purple-500 text-white px-1 py-2 rounded hover:bg-purple-600"
                                >
                                    List for Sale
                                </button>
                            ) : (
                                <button
                                    onClick={() => onUnlist(nft._id)}
                                    className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Unlist
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
