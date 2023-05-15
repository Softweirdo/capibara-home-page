import { posiABI } from "../contracts/Posi";
import Web3 from "web3";
import { store } from "../../redux/store";

let walletType, web3;
store.subscribe(() => {
    const state = store.getState();

    const provider = state.accounts.provider;
    web3 = new Web3(provider);
});

/*
 * Enable click action of vault
 * Allowance == 0 approve.
 */
export const tokenApprove = (contractAddress, tokenAddress, myAddress) => {
    const amount = "115792089237316195423570985"; //"115792089237316195423570985008687907853";
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(posiABI, tokenAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .approve(contractAddress, amount)
                .send({ from: myAddress })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => reject(error));
        } else {
            resolve();
        }
    });
};

/*
 * call for get token allowance token
 */
export const tokenAllowance = (ContractAddress, tokenAddress, myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(posiABI, tokenAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .allowance(myAddress, ContractAddress)
                .call({ from: myAddress })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => reject(error));
        } else {
            resolve();
        }
    });
};

/*
 * call for get Token Balance
 */
export const tokenBalanceOfAddress = (tokenAddress, address) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(posiABI, tokenAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .balanceOf(address)
                .call()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => reject(error));
        } else {
            resolve();
        }
    });
};

/*
 * call for get token symbol
 */
export const getTokenSymbol = (tokenAddress, myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(posiABI, tokenAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .symbol()
                .call({ from: myAddress })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => reject(error));
        } else {
            resolve();
        }
    });
};
