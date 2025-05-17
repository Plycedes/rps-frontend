import { ethers } from "ethers";
import { contractAddressV2, ABIV2 } from "./constants";
import axios from "axios";

export const connect = async () => {
    if (!window.ethereum) {
        console.log("Metamask not found");
        return "";
    } else {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return accounts[0];
        } catch (error) {
            console.log(error);
        }
    }
};

const API = axios.create({
    baseURL: "http://localhost:5002/api/tx",
});

const signingKey = localStorage.getItem("key");

const provider = new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/6d70dc9586e04d1e9f9a060d1d58c76a"
);

let wallet;
try {
    wallet = new ethers.Wallet(signingKey, provider);
} catch (error) {
    console.log(error);
}

const iface = new ethers.Interface(ABIV2);

export async function mintNFTWithBroadcast(tokenURI) {
    try {
        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("mintNFT", [tokenURI]),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("mintNFT", [tokenURI]),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await axios.post("http://localhost:5002/api/tx/broadcast", {
            rawTransaction: rawTx,
        });

        const txHash = res.data.txHash;
        console.log("Transaction hash:", txHash);

        const receipt = await provider.waitForTransaction(txHash);

        // Decode logs to find NFTMinted event
        for (const log of receipt.logs) {
            try {
                const parsed = iface.parseLog(log);
                if (parsed.name === "NFTMinted") {
                    const tokenId = parsed.args.tokenId.toString();
                    const mintedURI = parsed.args.tokenURI;

                    console.log("NFT Minted:");
                    console.log("Token ID:", tokenId);

                    return {
                        tokenId,
                        tokenURI: mintedURI,
                    };
                }
            } catch (e) {
                // Not the NFTMinted event
                continue;
            }
        }

        throw new Error("NFTMinted event not found in logs");
    } catch (error) {
        console.log(error);
    }
}

export async function viewNFTWithBroadcast(tokenId) {
    try {
        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("getTokenURI", [tokenId]),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("getTokenURI", [tokenId]),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await axios.post("http://localhost:5002/api/tx/broadcast", {
            rawTransaction: rawTx,
        });

        console.log("Transaction hash:", res.data);
    } catch (error) {
        console.log(error);
    }
}

export async function transferNFTWithBroadcast(tokenId, winner) {
    try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const nftContract = new ethers.Contract(contractAddressV2, ABIV2, signer);
        const currentOwner = await nftContract.ownerOf(tokenId);
        console.log("Current Owner:", currentOwner);
        console.log("Wallet Address:", wallet.address);

        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("transferNFTToWinner", [tokenId, winner]),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("transferNFTToWinner", [tokenId, winner]),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await API.post("/broadcast", {
            rawTransaction: rawTx,
        });

        console.log("Transaction hash:", res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function unlistNFTWithBroadcast(tokenId) {
    try {
        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("unlistNFT", [tokenId]),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("unlistNFT", [tokenId]),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await API.post("/broadcast", {
            rawTransaction: rawTx,
        });

        console.log("Transaction hash:", res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function listNFTWithBroadcast(tokenId, price) {
    try {
        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("listNFT", [tokenId, price]),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("listNFT", [tokenId, price]),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await API.post("/broadcast", {
            rawTransaction: rawTx,
        });

        console.log("Transaction hash:", res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function buyNFTWithBroadcast(tokenId, priceInEth) {
    try {
        const estimatedGas = await provider.estimateGas({
            to: contractAddressV2,
            data: iface.encodeFunctionData("buyNFT", [tokenId]),
            value: ethers.parseEther(priceInEth),
            from: wallet.address,
        });

        const gasLimit = (estimatedGas * 12n) / 10n;

        const unsignedTx = await wallet.populateTransaction({
            to: contractAddressV2,
            data: iface.encodeFunctionData("buyNFT", [tokenId]),
            value: ethers.parseEther(priceInEth),
            chainId: 11155111,
            gasLimit,
        });

        const rawTx = await wallet.signTransaction(unsignedTx);
        console.log(rawTx);

        const res = await API.post("/broadcast", {
            rawTransaction: rawTx,
        });

        console.log("Transaction hash:", res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
