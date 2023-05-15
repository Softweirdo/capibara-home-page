import { IcoAbi } from "../contracts/Ico";
import Web3 from "web3";
import { store } from "../../redux/store";
import { IcoAddress, IcoAddressOld } from "../../config/index";

let walletType, web3, IcoContract, IcoContractOld;
store.subscribe(() => {
    const state = store.getState();

    const provider = state.accounts.provider;
    web3 = new Web3(provider);
    IcoContract = new web3.eth.Contract(IcoAbi, IcoAddress);
    IcoContractOld = new web3.eth.Contract(IcoAbi, IcoAddressOld);
});

export const getTokenAddress = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                ._token()
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

export const getUsdtAddress = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .usdt()
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

export const getRate = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .rate()
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

export const getMinAmount = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .minAmount()
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

export const exchangeToken = (myAddress, amount, referralAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .buyTokenWithUSDT(
                    Web3.utils.toWei(amount, "ether"),
                    referralAddress,
                )
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

export const checkReferralToken = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .alreadyReferred(myAddress)
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

export const getOwnerAddress = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .owner()
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

export const getStatus = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .isPaused()
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

export const pauseICO = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .pauseICO()
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

export const unPauseICO = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .unPauseICO()
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

export const withdrawToken = (address, myAddress, amount) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .withdrawToken(address, Web3.utils.toWei(amount, "ether"))
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

export const withdrawUsdt = (address, myAddress, amount) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .withdrawBUSDToken(address, Web3.utils.toWei(amount, "ether"))
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

export const transferOwner = (address, myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .transferOwnership(address)
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

export const claimable = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContract.methods
                .claimable(myAddress)
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

export const claimableOld = (myAddress) => {
    return new Promise((resolve, reject) => {
        if (web3 && web3.currentProvider) {
            IcoContractOld.methods
                .claimable(myAddress)
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
