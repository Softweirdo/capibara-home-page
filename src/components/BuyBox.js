import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getTokenAddress,
    getUsdtAddress,
    getRate,
    getMinAmount,
    exchangeToken,
    checkReferralToken,
    claimable,
    claimableOld,
} from "../utility/contractMethods/ico";
import {
    getTokenSymbol,
    tokenBalanceOfAddress,
    tokenAllowance,
    tokenApprove,
} from "../utility/contractMethods/token";
import { showToastMessage } from "../redux/actions/toastNotification/index";
import { IcoAddress, date } from "../config/index";

const BuyBox = () => {
    const dispatch = useDispatch();
    const { selectedAddress, latestBlockNumberState, provider, wrongNetwork } =
        useSelector((state) => state.accounts);
    const [selectedCoin, setSelectedCoin] = React.useState("USDT");
    const handleChange = (event) => {
        setSelectedCoin(event.target.value);
    };

    const [tokenAddress, setTokenAddress] = useState(null);
    const [tokenName, setTokenName] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [usdtAddress, setUsdtAddress] = useState(null);
    const [usdtName, setUsdtName] = useState(null);
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [climableAmount, setClimable] = useState(0);
    const [rate, setRate] = useState(1);
    const [loading, setLoading] = useState(false);
    const [changeState, setChangeState] = useState(false);
    const [alreadyReferral, setAlreadyReferral] = useState(true);

    const [allowanceToken, setAllowanceToken] = useState(0);
    const [referralAddress, setReferralAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [minAmount, setMinAmount] = useState(250);

    // useEffect(() => {
    //     if (selectedAddress) {
    //         const getTokenAddressData = async () => {
    //             const tokenAddressData = await getTokenAddress(selectedAddress);
    //             setTokenAddress(tokenAddressData);
    //         };
    //         getTokenAddressData();
    //     }
    // }, [selectedAddress, provider, changeState]);

    // useEffect(() => {
    //     if (selectedAddress && tokenAddress) {
    //         const getTokenNameData = async () => {
    //             const tokenNameData = await getTokenSymbol(
    //                 tokenAddress,
    //                 selectedAddress,
    //             );
    //             setTokenName(tokenNameData);
    //         };
    //         getTokenNameData();
    //     }
    // }, [selectedAddress, tokenAddress, changeState]);

    // useEffect(() => {
    //     if (selectedAddress && tokenAddress) {
    //         const getTokenBalanceData = async () => {
    //             const tokenBalanceData = await tokenBalanceOfAddress(
    //                 tokenAddress,
    //                 selectedAddress,
    //             );
    //             setTokenBalance(tokenBalanceData / 10 ** 18);
    //         };
    //         getTokenBalanceData();
    //     }
    // }, [selectedAddress, tokenAddress, changeState]);

    useEffect(() => {
        if (selectedAddress && usdtAddress) {
            const getAllowanceData = async () => {
                const allowanceData = await tokenAllowance(
                    IcoAddress,
                    usdtAddress,
                    selectedAddress,
                );

                setAllowanceToken(allowanceData / 10 ** 18);
            };
            getAllowanceData();
        }
    }, [selectedAddress, usdtAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getAllowanceData = async () => {
                const allowanceData = await claimable(selectedAddress);
                const allowanceDataOld = await claimableOld(selectedAddress);

                setClimable(
                    (parseFloat(allowanceData) + parseFloat(allowanceDataOld)) /
                        10 ** 18,
                );
            };
            getAllowanceData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getUsdtAddressData = async () => {
                const usdtAddressData = await getUsdtAddress(selectedAddress);
                setUsdtAddress(usdtAddressData);
            };
            getUsdtAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    // useEffect(() => {
    //     if (selectedAddress && usdtAddress) {
    //         const getUsdtNameData = async () => {
    //             const usdtNameData = await getTokenSymbol(
    //                 usdtAddress,
    //                 selectedAddress,
    //             );
    //             setUsdtName(usdtNameData);
    //         };
    //         getUsdtNameData();
    //     }
    // }, [selectedAddress, usdtAddress, changeState]);

    useEffect(() => {
        if (selectedAddress && usdtAddress) {
            const getUsdtBalanceData = async () => {
                const usdtBalanceData = await tokenBalanceOfAddress(
                    usdtAddress,
                    selectedAddress,
                );

                setUsdtBalance(usdtBalanceData / 10 ** 18);
            };
            getUsdtBalanceData();
        }
    }, [selectedAddress, usdtAddress, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getRateData = async () => {
                const rateData = await getRate(selectedAddress);

                setRate(rateData / 100);
            };
            getRateData();
        }
    }, [selectedAddress, provider, changeState]);

    // useEffect(() => {
    //     if (selectedAddress) {
    //         const getMinAmountData = async () => {
    //             const minAmountData = await getMinAmount(selectedAddress);

    //             setMinAmount(minAmountData / 10 ** 18);
    //         };
    //         getMinAmountData();
    //     }
    // }, [selectedAddress, provider, changeState]);

    const approveTokenData = async () => {
        try {
            setLoading(true);
            const calAllowToken = await tokenApprove(
                IcoAddress,
                usdtAddress,
                selectedAddress,
            );
            if (calAllowToken.status === true) {
                dispatch(showToastMessage("Approved Success", "success"));
                setLoading(false);
                setChangeState(!changeState);
            } else {
                dispatch(
                    showToastMessage(calAllowToken.error.message, "error"),
                );
                setLoading(false);
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setLoading(false);
        }
    };

    const setAmountData = async (e) => {
        // if(e.target.value < 250){
        //  showToastMessage("You must have to buy minimum $250 of CPI", "error");
        //  return
        // }
        setAmount(e.target.value);
        setToAmount(e.target.value * rate);
    };

    const swapTokenData = async () => {
        try {
            setLoading(true);
            if (amount < minAmount) {
                dispatch(
                    showToastMessage(
                        `You must have to buy minimum amount of $${minAmount} USDT.`,
                        "error",
                    ),
                );
                setLoading(false);
            } else {
                const calAllowToken = await exchangeToken(
                    selectedAddress,
                    amount,
                    referralAddress ? referralAddress : IcoAddress,
                );
                if (calAllowToken.status === true) {
                    dispatch(
                        showToastMessage("Buy Token Successful", "success"),
                    );
                    setLoading(false);
                    setReferralAddress("");
                    setAmount(0);

                    setChangeState(!changeState);
                } else {
                    dispatch(
                        showToastMessage(calAllowToken.error.message, "error"),
                    );
                    setLoading(false);
                }
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setLoading(false);
        }
    };

    return (
        <Box className="tab-box" p={4}>
            <p className="tab-head" style={{ display: "inherit" }}>
                Buy CPI
                <Box style={{ float: "right" }}>
                    <p
                        className="adorment-disconnect"
                        style={{ color: "black" }}
                    >
                        {"USDT BEP20"}&nbsp;
                    </p>
                    <p
                        className="adorment-disconnect"
                        style={{ color: "black" }}
                    >
                        {usdtBalance}
                    </p>
                </Box>
            </p>
            {/* <Box>
          <p className="adorment-disconnect" style={{ color: "black" }}>
            {"USDT BEP20"}&nbsp;
          </p>
          <p className="adorment-disconnect" style={{ color: "black" }}>
            {usdtBalance}
          </p>
        </Box> */}
            <FormControl
                fullWidth
                sx={{ m: 1, marginBottom: "20px" }}
                variant="standard"
            >
                {/* <InputLabel htmlFor="standard-adornment-amount">
            USDT BEP20
          </InputLabel> */}
                <Input
                    id="standard-adornment-amount"
                    value={selectedAddress}
                    startAdornment={
                        <InputAdornment position="start">
                            {" "}
                            <img src="images/Arrow - Down 4.png" />
                        </InputAdornment>
                    }
                    endAdornment={
                        <>
                            <InputAdornment position="end">
                                {" "}
                                {/* <p className="adorment-disconnect" style={{ color: "black" }}>
                    {usdtBalance}
                  </p> */}
                            </InputAdornment>
                        </>
                    }
                />
            </FormControl>
            {/* <Box sx={{ display: "flex" }}>
          <Box> */}
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                    Enter Amount
                </InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={amount}
                    type="number"
                    onChange={(e) => {
                        setAmountData(e);
                    }}
                    sx={{ m: 1, marginBottom: "20px" }}

                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     {" "}
                    //     <FormControl variant="standard" sx={{ width: "100%" }}>
                    //       <Select
                    //         labelId="demo-simple-select-standard-label"
                    //         id="demo-simple-select-standard"
                    //         value={selectedCoin}
                    //         onChange={handleChange}
                    //         label="Select Coin"
                    //         fullWidth
                    //       >
                    //         <MenuItem value={"USDT"}>USDT</MenuItem>
                    //         {/* <MenuItem value={"BNB"}>BNB</MenuItem>
                    //                     <MenuItem value={"BUSD"}>BUSD</MenuItem> */}
                    //       </Select>
                    //     </FormControl>
                    //   </InputAdornment>
                    // }
                />
            </FormControl>
            {/* </Box> */}
            {/* <Box>
            <FormControl
              fullWidth
              //   sx={{ m: 1, marginBottom: "20px" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-p">Claimable</InputLabel>
              <Input
                id="standard-adornment-p"
                value={Number(climable) !== NaN ? climable : 0}
                disabled={true}
                type="number"
              />
            </FormControl>
          </Box>
        </Box> */}
            <FormControl
                fullWidth
                //   sx={{ m: 1, marginBottom: "20px" }}
                variant="standard"
            >
                <InputLabel htmlFor="standard-adornment-p">
                    Claimable
                </InputLabel>
                <Input
                    id="standard-adornment-p"
                    value={Number(climableAmount) !== NaN ? climableAmount : 0}
                    disabled={true}
                    type="number"
                />
            </FormControl>
            <FormControl
                fullWidth
                sx={{ marginBottom: "20px" }}
                variant="standard"
            >
                <InputLabel htmlFor="standard-adornment-p">
                    Referral Address
                </InputLabel>
                <Input
                    id="standard-adornment-p"
                    value={referralAddress}
                    onChange={(e) => {
                        setReferralAddress(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl
                fullWidth
                sx={{ marginBottom: "20px" }}
                variant="standard"
            >
                <InputLabel htmlFor="standard-adornment-amount">
                    Converted Amount
                </InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={Number(toAmount) !== NaN ? toAmount : 0}
                />
            </FormControl>
            {loading ? (
                <Button className="buy-button" disabled>
                    Loading....
                </Button>
            ) : allowanceToken > 0 ? (
                <Button className="buy-button" onClick={swapTokenData}>
                    Buy Now
                </Button>
            ) : (
                <Button className="buy-button" onClick={approveTokenData}>
                    Approve Token
                </Button>
            )}
            <b style={{ fontSize: "12px", marginTop: "5px" }}>
                Notes : You must have ‘USDT BEP20’ and ‘Smart Chain BNB’ tokens
                in your wallet before proceeding to buy CPI token.
            </b>
        </Box>
    );
};
export default BuyBox;
