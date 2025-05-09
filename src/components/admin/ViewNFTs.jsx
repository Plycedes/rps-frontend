import { useAxios } from "../../hooks/useAxios.js";
import { useEffect, useState } from "react";
import { getUserNFTs } from "../../utils/api";
import Loader from "../Loader";
import { NFTItem } from "./NFTItem.jsx";

function ViewNFTs() {
    const { loading, error, fetchData } = useAxios();
    const [adminNFT, setAdminNFT] = useState([]);

    useEffect(() => {
        (async () => {
            const nftRes = await fetchData(() => getUserNFTs());
            setAdminNFT(nftRes.data);
        })();
    }, []);

    return (
        <div className="px-2 py-4 w-full h-full">
            <div
                className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent w-full h-full
            border border-purple-500 rounded-lg p-4"
            >
                {loading && <Loader />}
                {error && <p className="text-red-500">{error}</p>}
                {adminNFT.map((nft) => (
                    <p key={nft._id}>
                        {nft.tournament == null && (
                            <div className="bg-gray-800 p-4 shadow-md flex justify-between rounded-lg items-center">
                                <NFTItem nft={nft} />
                            </div>
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ViewNFTs;
