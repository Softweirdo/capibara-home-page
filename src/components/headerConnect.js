import React, { useCallback, useEffect, useState } from "react";
// import imageSrc from '@assets/images/img/ava-header.png'
import constants from "../utility/CONSTANT";
import MetaMaskClass from "../utility/MetaMask";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../actions/accounts";
import { showToastMessage } from "../actions/toastNotification";
import { Button, Modal } from "react-bootstrap";
import { chainId } from "../config";
import ConnectModal from "./connectModal";
import { useWallet } from "react-binance-wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";

let metamask = null;
let accounts = [];
let metamaskWatcher = null;

export default function HeaderConnect() {
    const [walletType, setWalletType] = useState();

    const closeModal = () => {
        setShowConnectWallet(false);
    };
    const openModal = () => {
        setShowConnectWallet(true);
    };
    const [showConnectWallet, setShowConnectWallet] = useState(false);
    return (
        <div className="connection">
            <div className="header__notification">
                {accounts.length > 0 ? (
                    <Button className="connect-wallet">
                        {accounts[0].slice(0, 6) +
                            "...." +
                            accounts[0].slice(-4)}
                    </Button>
                ) : (
                    <Button
                        className="connect-wallet"
                        // onClick={handleWatch}
                        onClick={openModal}
                    >
                        Connect
                    </Button>
                )}
            </div>
            <Modal
                show={showConnectWallet}
                centered
                backdrop="static"
                className="wallet-modal"
            >
                <ConnectModal
                    close={closeModal}
                    setWalletType={setWalletType}
                />
            </Modal>
            {walletType === "METAMASK" ? <ConnectMetamask /> : ""}
            {walletType === "BINANCE" ? <ConnectBinanceWallet /> : ""}
            {walletType === "WALLET-CONNECT" ? <WalletConnect /> : ""}
        </div>
    );
}

const ConnectMetamask = () => {
    const { selectedAddress, latestBlockNumberState, walletType } = useSelector(
        (state) => state.accounts,
    );
    const dispatch = useDispatch();

    const [openConnect, setOpenConnect] = useState(false);
    const [web3, setWeb3] = useState(null);
    // const [awaiting, setAwaiting] = useState(false);
    const [error, setError] = useState("");

    // ---------------------------------Network Change connect-------------------------------------

    const checkNetwork = () => {
        let netId;
        if (walletType === "binance") {
            netId = +window.BinanceChain.chainId;
        } else {
            netId = window.ethereum.networkVersion
                ? +window.ethereum.networkVersion
                : +window.ethereum.chainId;
        }
        if (netId) {
            if (netId === chainId) {
                dispatch(
                    setSetting({
                        wrongNetwork: false,
                    }),
                );
                return;
            } else {
                dispatch(
                    showToastMessage(
                        `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
                        "error",
                    ),
                );
            }
            dispatch(
                setSetting({
                    wrongNetwork: true,
                }),
            );
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.addEventListener("load", () => {
                checkNetwork();
            });
        }
    }, [window.ethereum]);

    // ---------------------------------MetaMask connect-------------------------------------
    const withTimeoutRejection = async (promise, timeout) => {
        const sleep = new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error(constants.TIMEOUT)), timeout),
        );
        return Promise.race([promise, sleep]);
    };

    const handleOpen = () => {
        setOpenConnect(!openConnect);
    };

    const ConnectMetamask = useCallback(async () => {
        if (window.ethereum) {
            const accs = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (!accs[0]) {
                accounts = [];
                clearTimeout(metamaskWatcher);
                dispatch(setSetting({ selectedAddress: null }));
            }
        }
        if (metamaskWatcher) {
            clearTimeout(metamaskWatcher);
        }

        // if (!web3 || !accounts.length) {
        //   setAwaiting(true);
        // }

        try {
            const isLocked = error && error.message === constants.LOCKED;
            if (!metamask || isLocked) {
                metamask = await withTimeoutRejection(
                    MetaMaskClass.initialize(undefined), // if option is existed, add it
                    20 * 1000, // timeout
                );
            }

            let [tempWeb3, tempAccounts, latestBlockNumber] = await Promise.all(
                [
                    metamask.getWeb3(),
                    metamask.getAccounts(),
                    metamask.getLatestBlockNumber(),
                ],
            );
            accounts = tempAccounts;
            setWeb3(tempWeb3);
            setError(null);
            //   setAwaiting(false);
            if (
                selectedAddress !== tempAccounts[0] &&
                latestBlockNumber !== latestBlockNumberState
            ) {
                dispatch(
                    setSetting({
                        selectedAddress: tempAccounts[0],
                        latestBlockNumber,
                    }),
                );
                dispatch(
                    setSetting({
                        walletType: "METAMASK",
                    }),
                );
                dispatch(
                    setSetting({
                        provider: window.ethereum,
                    }),
                );
            }
            metamaskWatcher = setTimeout(() => {
                clearTimeout(metamaskWatcher);
                ConnectMetamask();
            }, 3000);
        } catch (err) {
            dispatch(setSetting({ selectedAddress: null }));
            accounts = [];
            setWeb3(null);
            setError(err);
            // setAwaiting(false);
        }
    }, [error, web3, latestBlockNumberState]);

    useEffect(() => {
        ConnectMetamask();
    }, [window]);

    return (
        <div className="connection">
            {/* <div className="header__notification">
                {accounts.length > 0 ? (
                    <Button className="connect-wallet">
                        {accounts[0].slice(0, 6) +
                            "...." +
                            accounts[0].slice(-4)}
                    </Button>
                ) : (
                    <Button
                        className="connect-wallet"
                        onClick={ConnectMetamask}
                    >
                        Connect
                    </Button>
                )}
            </div> */}
        </div>
    );
};

const ConnectBinanceWallet = () => {
    const { selectedAddress, latestBlockNumberState, walletType } = useSelector(
        (state) => state.accounts,
    );
    const dispatch = useDispatch();

    const {
        account: binanceAccount,
        connect,
        reset,
        status,
        error,
        chainId: binanceChainId,
    } = useWallet();

    useEffect(() => {
        dispatch(
            setSetting({
                walletType: "BINANCE",
            }),
        );
        setTimeout(() => {
            connect("bsc");
        }, 1000);
        // connect("bsc");
    }, [window]);

    useEffect(() => {
        if (status == "connected" && binanceChainId === chainId) {
            dispatch(
                setSetting({
                    selectedAddress: binanceAccount,
                }),
            );
            accounts.push(binanceAccount);
            dispatch(
                setSetting({
                    wrongNetwork: false,
                }),
            );
            // window.BinanceChain
            dispatch(
                setSetting({
                    provider: window.BinanceChain,
                }),
            );
        }
    }, [binanceAccount, status, binanceChainId]);

    useEffect(() => {
        if (status == "connected" && binanceChainId != chainId) {
            dispatch(
                showToastMessage(
                    `CMN is only supported on Binance Network. Please confirm you selected Binance Network`,
                    "error",
                ),
            );
            dispatch(
                setSetting({
                    wrongNetwork: true,
                }),
            );
        }
    }, [binanceChainId]);

    return (
        <div className="connection">
            {/* <div className="header__notification">
                {accounts.length > 0 ? (
                    <Button className="connect-wallet">
                        {accounts[0].slice(0, 6) +
                            "...." +
                            accounts[0].slice(-4)}
                    </Button>
                ) : (
                    <Button
                        className="connect-wallet"
                        onClick={ConnectMetamask}
                    >
                        Connect
                    </Button>
                )}
            </div> */}
        </div>
    );
};

const WalletConnect = () => {
    const { selectedAddress, latestBlockNumberState, walletType } = useSelector(
        (state) => state.accounts,
    );

    const dispatch = useDispatch();

    const [openConnect, setOpenConnect] = useState(false);
    const [web3, setWeb3] = useState(null);
    // const [awaiting, setAwaiting] = useState(false);
    const [error, setError] = useState("");

    const provider = new WalletConnectProvider({
        rpc: {
            56: "https://bsc-dataseed1.ninicoin.io",
        },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        qrcodeModalOptions: {
            mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
            ],
            desktopLinks: ["encrypted ink"],
        },
        supportedChainIds: [56],
    });

    // ---------------------------------Network Change connect-------------------------------------

    // const checkNetwork = () => {
    //     let netId;
    //     if (walletType === "binance") {
    //         netId = +window.BinanceChain.chainId;
    //     } else {
    //         netId = window.ethereum.networkVersion
    //             ? +window.ethereum.networkVersion
    //             : +window.ethereum.chainId;
    //     }
    //     if (netId) {
    //         if (netId === chainId) {
    //             dispatch(
    //                 setSetting({
    //                     wrongNetwork: false,
    //                 }),
    //             );
    //             return;
    //         } else {
    //             dispatch(
    //                 showToastMessage(
    //                     `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
    //                     "error",
    //                 ),
    //             );
    //         }
    //         dispatch(
    //             setSetting({
    //                 wrongNetwork: true,
    //             }),
    //         );
    //     }
    // };

    // useEffect(() => {
    //     if (window.ethereum) {
    //         window.addEventListener("load", () => {
    //             checkNetwork();
    //         });
    //     }
    // }, [window.ethereum]);

    // // ---------------------------------MetaMask connect-------------------------------------
    // const withTimeoutRejection = async (promise, timeout) => {
    //     const sleep = new Promise((resolve, reject) =>
    //         setTimeout(() => reject(new Error(constants.TIMEOUT)), timeout),
    //     );
    //     return Promise.race([promise, sleep]);
    // };

    // const handleOpen = () => {
    //     setOpenConnect(!openConnect);
    // };

    // const ConnectMetamask = useCallback(async () => {
    //     if (window.ethereum) {
    //         const accs = await window.ethereum.request({
    //             method: "eth_accounts",
    //         });
    //         if (!accs[0]) {
    //             accounts = [];
    //             clearTimeout(metamaskWatcher);
    //             dispatch(setSetting({ selectedAddress: null }));
    //         }
    //     }
    //     if (metamaskWatcher) {
    //         clearTimeout(metamaskWatcher);
    //     }

    //     // if (!web3 || !accounts.length) {
    //     //   setAwaiting(true);
    //     // }

    //     try {
    //         const isLocked = error && error.message === constants.LOCKED;
    //         if (!metamask || isLocked) {
    //             metamask = await withTimeoutRejection(
    //                 MetaMaskClass.initialize(undefined), // if option is existed, add it
    //                 20 * 1000, // timeout
    //             );
    //         }

    //         let [tempWeb3, tempAccounts, latestBlockNumber] = await Promise.all(
    //             [
    //                 metamask.getWeb3(),
    //                 metamask.getAccounts(),
    //                 metamask.getLatestBlockNumber(),
    //             ],
    //         );
    //         accounts = tempAccounts;
    //         setWeb3(tempWeb3);
    //         setError(null);
    //         //   setAwaiting(false);
    //         if (
    //             selectedAddress !== tempAccounts[0] &&
    //             latestBlockNumber !== latestBlockNumberState
    //         ) {
    //             dispatch(
    //                 setSetting({
    //                     selectedAddress: tempAccounts[0],
    //                     latestBlockNumber,
    //                 }),
    //             );
    //             dispatch(
    //                 setSetting({
    //                     walletType: "METAMASK",
    //                 }),
    //             );
    //         }
    //         metamaskWatcher = setTimeout(() => {
    //             clearTimeout(metamaskWatcher);
    //             ConnectMetamask();
    //         }, 3000);
    //     } catch (err) {
    //         dispatch(setSetting({ selectedAddress: null }));
    //         accounts = [];
    //         setWeb3(null);
    //         setError(err);
    //         // setAwaiting(false);
    //     }
    // }, [error, web3, latestBlockNumberState]);

    useEffect(() => {
        const setPro = async () => {
            await provider.enable();
        };
        setPro();
    }, []);

    provider.on("accountsChanged", (accountsData) => {
        accounts = accountsData;

        dispatch(
            setSetting({
                selectedAddress: accountsData[0],
            }),
        );
        dispatch(
            setSetting({
                walletType: "Wallet-connect",
            }),
        );
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (netId) => {
        console.log(chainId);
        if (netId === chainId) {
            dispatch(
                setSetting({
                    wrongNetwork: false,
                }),
            );
            return;
        } else {
            dispatch(
                showToastMessage(
                    `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
                    "error",
                ),
            );
        }
        dispatch(
            setSetting({
                wrongNetwork: true,
            }),
        );
    });

    // Subscribe to session connection
    provider.on("connect", () => {
        console.log("connect");
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
        dispatch(
            setSetting({
                selectedAddress: null,
            }),
        );
        dispatch(showToastMessage(`Wallet Disconnected`, "error"));
    });

    useEffect(() => {
        dispatch(
            setSetting({
                provider: provider,
            }),
        );
    }, [provider]);

    return (
        <div className="connection">
            {/* <div className="header__notification">
                {accounts.length > 0 ? (
                    <Button className="connect-wallet">
                        {accounts[0].slice(0, 6) +
                            "...." +
                            accounts[0].slice(-4)}
                    </Button>
                ) : (
                    <Button
                        className="connect-wallet"
                        onClick={ConnectMetamask}
                    >
                        Connect
                    </Button>
                )}
            </div> */}
        </div>
    );
};
