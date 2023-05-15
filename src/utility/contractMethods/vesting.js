import { vestingABI } from "../contracts/vesting";
import Web3 from "web3";
import { store } from "../../redux/store";
import { VestingAddress } from "../../config/index";
let walletType, web3;
store.subscribe(() => {
    const state = store.getState();

    const provider = state.accounts.provider;
    web3 = new Web3(provider);
});

export const vestingScheduleForBeneficiary = (myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(vestingABI, VestingAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .vestingScheduleForBeneficiary(myAddress)
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

export const remainingBalance = (myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(vestingABI, VestingAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .remainingBalance(myAddress)
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

export const availableDrawDownAmount = (myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(vestingABI, VestingAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .availableDrawDownAmount(myAddress)
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

export const drawDown = (myAddress) => {
    return new Promise((resolve, reject) => {
        const tokenContract = new web3.eth.Contract(vestingABI, VestingAddress);
        if (web3 && web3.currentProvider) {
            tokenContract.methods
                .drawDown()
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
