import { ethers } from "ethers";

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
