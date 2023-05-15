import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import Logo from "../../assets/images/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";

// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Button,
  Dialog,
} from "@mui/material";
// components
import { MHidden } from "../../components/@material-extend";
// import { Link } from "react-router-dom";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

import Lottie from "lottie-web";
import ConnectModal from "./connectModal";

import constants from "../../utility/CONSTANT";
import MetaMaskClass from "../../utility/MetaMask";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "../../redux/actions/accounts";
import { showToastMessage } from "../../redux/actions/toastNotification";
import { useWallet } from "react-binance-wallet";
import { chainId } from "../../config/index";
import { getOwnerAddress } from "../../utility/contractMethods/ico";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import RUPAYlogo from "../../assets/image/logo.json";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: "black",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  paddingLeft: "0px !important",
  paddingRight: "0px !important",
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
  },
}));
const LinkStyled = styled(Link)(({ theme }) => ({
  cursor: "pointer",
}));
// ----------------------------------------------------------------------

let metamask = null;
let accounts = [];
let metamaskWatcher = null;

export default function DashboardSidebar(props) {
  const { selectedAddress, provider } = useSelector((state) => state.accounts);
  const [ownerAddress, setOwnerAddress] = useState(null);

  const [walletName, setWalletType] = useState("");
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [click, setClick] = React.useState(false);

  const closeModal = () => {
    setShowConnectWallet(false);
  };
  const openModal = () => {
    setShowConnectWallet(true);
  };

  useEffect(() => {
    if (selectedAddress) {
      const getOwnerData = async () => {
        const ownerAddressDart = await getOwnerAddress(selectedAddress);
        setOwnerAddress(ownerAddressDart);
      };
      getOwnerData();
    }
  }, [selectedAddress, provider]);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  //   React.useLayoutEffect(() => {
  //     var params = {
  //       container: document.getElementById("logo-inm"),
  //       renderer: "svg",
  //       loop: true,
  //       autoplay: true,
  //       animationData: RUPAYlogo,
  //     };

  //     var logoImg;

  //     logoImg = Lottie.loadAnimation(params);
  //   }, []);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let drawerWidth = 96;
  const drawer = (
    <div>
      {/* <Toolbar />
      <Divider /> */}
      <List>
        <ListItem button>
          <ListItemIcon className="m-auto sidebar-item">
            <img src={"images/logo11.png"} />
          </ListItemIcon>
          {/* <ListItemText primary={"sadddddddddddd"} /> */}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon className="m-auto sidebar-item">
            <img src={"images/Category.png"} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon className="m-auto sidebar-item">
            <img src={"images/Arrow - Down 6.png"} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon className="m-auto sidebar-item">
            <img src={"images/Arrow - Down 4.png"} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon className="m-auto sidebar-item">
            <img src={"images/Chart.png"} />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    // <RootStyle>
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        style={{ backgroundColor: "#FFFAEE", color: "black" }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
        style={{ backgroundColor: "#FFFAEE", color: "black" }}
      >
        {drawer}
      </Drawer>
    </Box>
    // </RootStyle>
  );
}

const ConnectMetamask = () => {
  const { selectedAddress, latestBlockNumberState, walletType } = useSelector(
    (state) => state.accounts
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
    console.log(
      "%c 🍵 netId: ",
      "font-size:20px;background-color: #33A5FF;color:#fff;",
      netId
    );
    if (netId) {
      if (netId === chainId) {
        dispatch(
          setSetting({
            wrongNetwork: false,
          })
        );
        return;
      } else {
        dispatch(
          showToastMessage(
            `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
            "error"
          )
        );
      }
      dispatch(
        setSetting({
          wrongNetwork: true,
        })
      );
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.addEventListener("load", () => {
        checkNetwork();
      });
    }
  }, [window.ethereu]);

  // ---------------------------------MetaMask connect-------------------------------------
  const withTimeoutRejection = async (promise, timeout) => {
    const sleep = new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error(constants.TIMEOUT)), timeout)
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
          20 * 1000 // timeout
        );
      }

      let [tempWeb3, tempAccounts, latestBlockNumber] = await Promise.all([
        metamask.getWeb3(),
        metamask.getAccounts(),
        metamask.getLatestBlockNumber(),
      ]);
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
          })
        );
        // dispatch(
        //     setSetting({
        //         walletType: "METAMASK",
        //     }),
        // );
        dispatch(
          setSetting({
            provider: window.ethereum,
          })
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
    (state) => state.accounts
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
      })
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
        })
      );
      accounts.push(binanceAccount);
      dispatch(
        setSetting({
          wrongNetwork: false,
        })
      );
      // window.BinanceChain
      dispatch(
        setSetting({
          provider: window.BinanceChain,
        })
      );
    }
  }, [binanceAccount, status, binanceChainId]);

  useEffect(() => {
    if (status == "connected" && binanceChainId != chainId) {
      dispatch(
        showToastMessage(
          `CMN is only supported on Binance Network. Please confirm you selected Binance Network`,
          "error"
        )
      );
      dispatch(
        setSetting({
          wrongNetwork: true,
        })
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
    (state) => state.accounts
  );

  const dispatch = useDispatch();

  const [openConnect, setOpenConnect] = useState(false);
  const [web3, setWeb3] = useState(null);
  // const [awaiting, setAwaiting] = useState(false);
  const [error, setError] = useState("");

  const provider = new WalletConnectProvider({
    rpc: {
      56: "https://bsc-dataseed.binance.org",
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    chainId: 56,
    supportedChainIds: [56],
  });
  console.log("provider: ", provider);

  useEffect(() => {
    // web3React.activate(provider);

    const setPro = async () => {
      const data = await provider.enable();

      dispatch(
        setSetting({
          provider: provider,
        })
      );
      const web3 = new Web3(provider);
      // const chainId = await web3.eth.chainId();

      const networkId = await web3.eth.net.getId();
    };
    setPro();
  }, []);

  // useEffect(() => {
  //     if (web3React.account) {
  //         accounts = web3React.account;

  //         dispatch(
  //             setSetting({
  //                 selectedAddress: accounts,
  //             }),
  //         );
  //         dispatch(
  //             setSetting({
  //                 walletType: "Wallet-connect",
  //             }),
  //         );
  //     }
  // }, [web3React.account]);

  provider.on("accountsChanged", (accountsData) => {
    accounts = accountsData;
    console.log("accountsData: ", accountsData);

    dispatch(
      setSetting({
        selectedAddress: accountsData[0],
        walletType: "Wallet-connect",
        wrongNetwork: false,
      })
    );
  });

  // useEffect(() => {
  //     if (web3React.chainId === chainId) {
  //         dispatch(
  //             setSetting({
  //                 wrongNetwork: false,
  //             }),
  //         );
  //         return;
  //     } else {
  //         dispatch(
  //             showToastMessage(
  //                 `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
  //                 "error",
  //             ),
  //         );
  //     }
  //     dispatch(
  //         setSetting({
  //             wrongNetwork: true,
  //         }),
  //     );
  // }, [web3React.chainId]);

  // Subscribe to chainId change
  provider.on("chainChanged", (netId) => {
    console.log(
      "%c 🥤 netId: ",
      "font-size:20px;background-color: #F5CE50;color:#fff;",
      netId
    );
    if (netId === chainId) {
      dispatch(
        setSetting({
          wrongNetwork: false,
        })
      );
      return;
    } else {
      dispatch(
        showToastMessage(
          `CMN is only supported on Binance Network. Please confirm you installed Metamask and selected Binance Network`,
          "error"
        )
      );
    }
    dispatch(
      setSetting({
        wrongNetwork: true,
      })
    );
  });

  // Subscribe to session connection
  provider.on("connect", () => {
    console.log("connect");
  });

  // // Subscribe to session disconnection
  provider.on("disconnect", (code, reason) => {
    dispatch(
      setSetting({
        selectedAddress: null,
      })
    );
    dispatch(showToastMessage(`Wallet Disconnected`, "error"));
  });

  useEffect(() => {
    // dispatch(
    //     setSetting({
    //         provider: provider,
    //     }),
    // );
  }, [provider, selectedAddress]);

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
