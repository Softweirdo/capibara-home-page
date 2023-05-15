// import { Card, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import {
    borderRadius,
    Box,
    style,
    styled,
    typography,
    width,
} from "@mui/system";

import {
    getTokenAddress,
    getUsdtAddress,
    getStatus,
    pauseICO,
    unPauseICO,
    withdrawToken,
    withdrawUsdt,
    transferOwner,
} from "../utility/contractMethods/ico";
import { showToastMessage } from "../redux/actions/toastNotification";
import { tokenBalanceOfAddress } from "../utility/contractMethods/token";
import { IcoAddress } from "../config";

const CardStyled = styled("div")(({ theme }) => ({
    height: "265px",
    width: "auto",
    background: theme.palette.primary.main,
    padding: "10px 80px 18px",
    borderRadius: "9px",
    color: "white",
    textAlign: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
}));
const TextFieldstyled = styled(TextField)(({ theme }) => ({
    background: "white",
    borderRadius: 8,
}));
const SellerCard = styled("div")(({ theme }) => ({
    background: theme.palette.primary.main,
    borderRadius: "9px",
    padding: "20px",
}));
const TimerCard = styled("div")(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "30px 50px",
    width: 600,
    borderRadius: 10,
}));
const BalanceCard = styled(Card)(({ theme }) => ({
    padding: 20,
    background: theme.palette.primary.main,
}));
const Connect = () => {
    const dispatch = useDispatch();
    const { selectedAddress, provider, wrongNetwork } = useSelector(
        (state) => state.accounts,
    );
    const [changeState, setChangeState] = useState(false);
    const [status, setStatue] = useState(true);
    const [startStopLoading, setStartStopLoading] = useState(false);

    const [tokenAddressInCOntract, setTokenAddressInContract] = useState(null);
    const [usdtAddressInContract, setUsdtAddressInContract] = useState(null);

    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenAmount, setTokenAmount] = useState(0);
    const [tokenContractBalance, setTokenContractBalance] = useState(0);
    const [tokenLoading, setTokenLoading] = useState(false);

    const [usdtAddress, setUsdtAddress] = useState("");
    const [usdtAmount, setUsdtAmount] = useState(0);
    const [usdtContractBalance, setUsdtContractBalance] = useState(0);

    const [usdtLoading, setUsdtLoading] = useState(false);

    const [newOwnerAddress, setNewOwnerAddress] = useState("");
    const [ownerLoading, setOwnerLoading] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            const getTokenAddressData = async () => {
                const tokenAddressData = await getTokenAddress(selectedAddress);
                setTokenAddressInContract(tokenAddressData);
            };
            getTokenAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getUsdtAddressData = async () => {
                const usdtAddressData = await getUsdtAddress(selectedAddress);
                setUsdtAddressInContract(usdtAddressData);
            };
            getUsdtAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getStatusData = async () => {
                const contractStatus = await getStatus(selectedAddress);

                setStatue(contractStatus);
            };
            getStatusData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress && tokenAddressInCOntract) {
            const getContractTokenBalance = async () => {
                const contractBalance = await tokenBalanceOfAddress(
                    tokenAddressInCOntract,
                    IcoAddress,
                );
                setTokenContractBalance(contractBalance / 10 ** 18);
            };
            getContractTokenBalance();
        }
    }, [selectedAddress, provider, changeState, tokenAddressInCOntract]);

    useEffect(() => {
        if (selectedAddress && usdtAddressInContract) {
            const getContractUsdtTokenBalance = async () => {
                const contractUsdtBalance = await tokenBalanceOfAddress(
                    usdtAddressInContract,
                    IcoAddress,
                );
                setUsdtContractBalance(contractUsdtBalance / 10 ** 18);
            };
            getContractUsdtTokenBalance();
        }
    }, [selectedAddress, provider, changeState, usdtAddressInContract]);

    const stopICO = async () => {
        try {
            setStartStopLoading(true);
            const calAllowToken = await pauseICO(selectedAddress);
            if (calAllowToken.status === true) {
                dispatch(showToastMessage("IPO Paused", "success"));
                setStartStopLoading(false);
                setChangeState(!changeState);
            } else {
                dispatch(
                    showToastMessage(calAllowToken.error.message, "error"),
                );
                setStartStopLoading(false);
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setStartStopLoading(false);
        }
    };

    const startICO = async () => {
        try {
            setStartStopLoading(true);
            const calAllowToken = await unPauseICO(selectedAddress);
            if (calAllowToken.status === true) {
                dispatch(showToastMessage("IPO UnPaused", "success"));
                setStartStopLoading(false);
                setChangeState(!changeState);
            } else {
                dispatch(
                    showToastMessage(calAllowToken.error.message, "error"),
                );
                setStartStopLoading(false);
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setStartStopLoading(false);
        }
    };

    const withdrawTokenFromContract = async () => {
        try {
            setTokenLoading(true);
            if (tokenAmount <= 0) {
                dispatch(
                    showToastMessage("Please Enter Valid Amount", "error"),
                );
                setTokenLoading(false);
            } else if (tokenAddress == "") {
                dispatch(
                    showToastMessage("Please Enter Valid Address", "error"),
                );
                setTokenLoading(false);
            } else {
                const calAllowToken = await withdrawToken(
                    tokenAddress,
                    selectedAddress,
                    tokenAmount,
                );
                if (calAllowToken.status === true) {
                    dispatch(
                        showToastMessage(
                            "Token Withdraw Successfully",
                            "success",
                        ),
                    );
                    setTokenLoading(false);
                    setChangeState(!changeState);
                } else {
                    dispatch(
                        showToastMessage(calAllowToken.error.message, "error"),
                    );
                    setTokenLoading(false);
                }
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setTokenLoading(false);
        }
    };

    const withdrawUsdtFromContract = async () => {
        try {
            setUsdtLoading(true);
            if (usdtAmount <= 0) {
                dispatch(
                    showToastMessage("Please Enter Valid Amount", "error"),
                );
                setUsdtLoading(false);
            } else if (usdtAddress == "") {
                dispatch(
                    showToastMessage("Please Enter Valid Address", "error"),
                );
                setUsdtLoading(false);
            } else {
                const calAllowToken = await withdrawUsdt(
                    usdtAddress,
                    selectedAddress,
                    usdtAmount,
                );
                if (calAllowToken.status === true) {
                    dispatch(
                        showToastMessage(
                            "USDt Token Withdraw Successfully",
                            "success",
                        ),
                    );
                    setUsdtLoading(false);
                    setChangeState(!changeState);
                } else {
                    dispatch(
                        showToastMessage(calAllowToken.error.message, "error"),
                    );
                    setUsdtLoading(false);
                }
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setUsdtLoading(false);
        }
    };

    const setNewOwner = async () => {
        try {
            setOwnerLoading(true);
            if (newOwnerAddress == "") {
                dispatch(
                    showToastMessage("Please Enter Valid Address", "error"),
                );
            } else {
                const calAllowToken = await transferOwner(
                    newOwnerAddress,
                    selectedAddress,
                );
                if (calAllowToken.status === true) {
                    dispatch(showToastMessage("Owner Transfer", "success"));
                    setOwnerLoading(false);
                    setChangeState(!changeState);
                } else {
                    dispatch(
                        showToastMessage(calAllowToken.error.message, "error"),
                    );
                    setOwnerLoading(false);
                }
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setOwnerLoading(false);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Container maxWidth="lg">
                <Box
                    item
                    sm={6}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                    }}
                >
                    <TimerCard>
                        <Typography variant="h5" mb={4} textAlign="center">
                            Set Contract Start/Stop
                        </Typography>
                        {startStopLoading ? (
                            <Button size="large" variant="contained" fullWidth>
                                <CircularProgress color="inherit" />
                            </Button>
                        ) : status ? (
                            <Box>
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={startICO}
                                    disabled={selectedAddress ? false : true}
                                >
                                    Start ICO
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={stopICO}
                                    disabled={selectedAddress ? false : true}
                                >
                                    Stop ICO
                                </Button>
                            </Box>
                        )}
                    </TimerCard>
                </Box>
                <Box
                    item
                    sm={6}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                    }}
                >
                    <TimerCard>
                        <Typography variant="h5" mb={4} textAlign="center">
                            Withdraw GCT Token (
                            {tokenContractBalance.toFixed(3)})
                        </Typography>

                        <Stack direction="row" mt={3} spacing={2}>
                            <TextFieldstyled
                                placeholder="Address"
                                type="text"
                                fullWidth
                                value={tokenAddress}
                                onChange={(e) => {
                                    setTokenAddress(e.target.value);
                                }}
                            />
                        </Stack>
                        <Stack direction="row" mt={3} spacing={2}>
                            <TextFieldstyled
                                placeholder="Address"
                                type="text"
                                fullWidth
                                value={tokenAmount}
                                onChange={(e) => {
                                    setTokenAmount(e.target.value);
                                }}
                            />
                        </Stack>
                        <Box>
                            {tokenLoading ? (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                >
                                    <CircularProgress color="inherit" />
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={withdrawTokenFromContract}
                                    disabled={selectedAddress ? false : true}
                                >
                                    Transfer GCT Token
                                </Button>
                            )}
                        </Box>
                    </TimerCard>
                </Box>
                <Box
                    item
                    sm={6}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                    }}
                >
                    <TimerCard>
                        <Typography variant="h5" mb={4} textAlign="center">
                            Withdraw USDT Token (
                            {usdtContractBalance.toFixed(3)})
                        </Typography>

                        <Stack direction="row" mt={3} spacing={2}>
                            <TextFieldstyled
                                placeholder="Address"
                                type="text"
                                fullWidth
                                value={usdtAddress}
                                onChange={(e) => {
                                    setUsdtAddress(e.target.value);
                                }}
                            />
                        </Stack>
                        <Stack direction="row" mt={3} spacing={2}>
                            <TextFieldstyled
                                placeholder="Address"
                                type="text"
                                fullWidth
                                value={usdtAmount}
                                onChange={(e) => {
                                    setUsdtAmount(e.target.value);
                                }}
                            />
                        </Stack>
                        <Box>
                            {usdtLoading ? (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                >
                                    <CircularProgress color="inherit" />
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={withdrawUsdtFromContract}
                                    disabled={selectedAddress ? false : true}
                                >
                                    Transfer USDT Token
                                </Button>
                            )}
                        </Box>
                    </TimerCard>
                </Box>
                <Box
                    item
                    sm={6}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0px",
                    }}
                >
                    <TimerCard>
                        <Typography variant="h5" mb={4} textAlign="center">
                            Transfer Ownership
                        </Typography>

                        <Stack direction="row" mt={3} spacing={2}>
                            <TextFieldstyled
                                placeholder="Address"
                                type="text"
                                fullWidth
                                value={newOwnerAddress}
                                onChange={(e) => {
                                    setNewOwnerAddress(e.target.value);
                                }}
                            />
                        </Stack>
                        <Box>
                            {ownerLoading ? (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                >
                                    <CircularProgress color="inherit" />
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={setNewOwner}
                                    disabled={selectedAddress ? false : true}
                                >
                                    Transfer Owner
                                </Button>
                            )}
                        </Box>
                    </TimerCard>
                </Box>
            </Container>
        </Box>
    );
};
export default Connect;
