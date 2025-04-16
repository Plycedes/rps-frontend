import React, { useState } from "react";

const DialogBox = ({ visible, onClose, onConfirm, nftId, type, name }) => {
    const [price, setPrice] = useState("");

    const handleConfirm = () => {
        if (type === "list") {
            if (!price || isNaN(price)) return alert("Enter a valid price");
            onConfirm(nftId, price);
        } else {
            onConfirm(nftId);
        }
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-gray-900 border border-purple-500 rounded-lg p-6 w-96 text-white shadow-2xl">
                <h2 className="text-xl font-bold mb-4 capitalize">
                    {type} NFT: {name}
                </h2>

                {type === "list" ? (
                    <div>
                        <label className="block mb-2">Enter price (ETH):</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-purple-500 rounded bg-black text-white focus:outline-none"
                            placeholder="0.05"
                        />
                    </div>
                ) : (
                    <p className="mb-4">Are you sure you want to {type} this NFT?</p>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
