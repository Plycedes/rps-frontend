import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAxios } from "../..//hooks/useAxios";
import Navbar from "./Navbar";
import NFTCard from "./NFTCard";
import DialogBox from "./DialogBox";
import Loader from "../Loader";
import { ToastContainer, toast } from "react-toastify";
import { getUserNFTs, getListedNFTs, listNFT, unListNFT, buytNFT } from "../../utils/api";
import {
    buyNFTWithBroadcast,
    listNFTWithBroadcast,
    unlistNFTWithBroadcast,
} from "../../utils/blockchainApi";
import { ethers } from "ethers";

const Marketplace = () => {
    const { loading, error, fetchData } = useAxios();

    const [tab, setTab] = useState("listed");
    const [listedNFTs, setListedNFTs] = useState([]);
    const [userNFTs, setUserNFTs] = useState([]);
    const [dialog, setDialog] = useState({
        visible: false,
        type: null,
        nftId: null,
        name: null,
        tokenId: null,
        listedPrice: null,
    });
    const [reRender, setReRender] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchListedNFTs = async () => {
            const res = await fetchData(() => getListedNFTs());
            console.log(res);
            setListedNFTs(res.data || []);
        };

        const fetchUserNFTs = async () => {
            const res = await fetchData(() => getUserNFTs());
            setUserNFTs(res.data || []);
        };

        fetchListedNFTs();
        fetchUserNFTs();
    }, [user, reRender]);

    const openDialog = (type, nftId, name, tokenId, listedPrice) => {
        setDialog({ visible: true, type, nftId, name, tokenId, listedPrice });
    };

    const closeDialog = () => {
        setDialog({ visible: false, type: null, nftId: null, tokenId: null, listedPrice: null });
    };

    const handleDialogConfirm = async (nftId, tokenId, listedPrice = null, price = null) => {
        console.log(`Confirmed ${dialog.type} for NFT`, nftId, price, tokenId, listedPrice);
        if (dialog.type === "buy") {
            const res = await fetchData(() => buytNFT({ nftId }));
            toast(res.message, {
                autoClose: 3000,
                theme: "dark",
            });

            const web3Price = (listedPrice / 10000).toString();
            const txres = await buyNFTWithBroadcast(tokenId, web3Price);
            console.log(web3Price);

            if (txres.txHash) {
                toast("Bought NFT on-chain", {
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        } else if (dialog.type === "list") {
            const res = await fetchData(() => listNFT({ nftId, price }));
            toast(res.message, {
                autoClose: 3000,
                theme: "dark",
            });

            const web3Price = ethers.parseEther((price / 10000).toString());
            const txres = await listNFTWithBroadcast(tokenId, web3Price);
            console.log(txres);

            if (txres.txHash) {
                toast("Listed NFT on-chain", {
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        } else if (dialog.type === "unlist") {
            const res = await fetchData(() => unListNFT({ nftId }));
            toast(res.message, {
                autoClose: 3000,
                theme: "dark",
            });

            const txres = await unlistNFTWithBroadcast(tokenId);
            console.log(txres);

            if (txres.txHash) {
                toast("Unlisted NFT on-chain", {
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
        setReRender((prev) => !prev);
    };

    const displayedNFTs = tab === "listed" ? listedNFTs : userNFTs;

    return (
        <div className="h-screen p-2">
            {loading && <Loader />}
            <ToastContainer />
            <div className="flex flex-col h-full bg-gray-900 border border-purple-500 rounded-lg text-white">
                <Navbar tab={tab} setTab={setTab} />
                <div
                    className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 
                                scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent"
                >
                    {displayedNFTs.length > 0 ? (
                        displayedNFTs.map((nft) => (
                            <NFTCard
                                key={nft._id}
                                nft={nft}
                                currentUserId={user._id}
                                tab={tab}
                                onBuy={() =>
                                    openDialog("buy", nft._id, nft.name, nft.tokenId, nft.price)
                                }
                                onList={() =>
                                    openDialog("list", nft._id, nft.name, nft.tokenId, nft.price)
                                }
                                onUnlist={() =>
                                    openDialog("unlist", nft._id, nft.name, nft.tokenId, nft.price)
                                }
                            />
                        ))
                    ) : (
                        <p className="text-purple-500 col-span-full text-center">
                            No NFTs to display.
                        </p>
                    )}
                </div>

                <DialogBox
                    visible={dialog.visible}
                    onClose={closeDialog}
                    onConfirm={handleDialogConfirm}
                    nftId={dialog.nftId}
                    type={dialog.type}
                    name={dialog.name}
                    tokenId={dialog.tokenId}
                    listedPrice={dialog.listedPrice}
                />
            </div>
        </div>
    );
};

export default Marketplace;
