import React from "react";

const NFT = ({ nft }) => {
    return (
        <div className="border border-purple-500 bg-gray-900 h-52 rounded-xl p-4 flex flex-col items-center shadow-lg">
            <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-35 object-cover rounded-md mb-4"
            />
            <div className="flex gap-2 justify-between w-full">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default NFT;
