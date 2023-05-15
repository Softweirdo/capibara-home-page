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
    vestingScheduleForBeneficiary,
    remainingBalance,
    drawDown,
    availableDrawDownAmount,
} from "../utility/contractMethods/vesting";

import {
    getTokenSymbol,
    tokenBalanceOfAddress,
    tokenAllowance,
    tokenApprove,
} from "../utility/contractMethods/token";
import { showToastMessage } from "../redux/actions/toastNotification/index";

import { IcoAddress, date } from "../config/index";

const ClaimBox = () => {
    const dispatch = useDispatch();
    const { selectedAddress, latestBlockNumberState, provider, wrongNetwork } =
        useSelector((state) => state.accounts);
    const [selectedCoin, setSelectedCoin] = React.useState("USDT");

    const [climedToken, setClimedToken] = useState(0);
    const [totalParched, setTotalParched] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [climable, setClimable] = useState(0);
    const [changeState, setChangeState] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            const getAllowanceData = async () => {
                const allowanceData = await vestingScheduleForBeneficiary(
                    selectedAddress,
                );

                setClimedToken(
                    allowanceData?._totalDrawn > 0
                        ? allowanceData?._totalDrawn / 10 ** 18
                        : 0,
                );
                setTotalParched(
                    allowanceData?._amount > 0
                        ? allowanceData?._amount / 10 ** 18
                        : 0,
                );
            };
            getAllowanceData();
        }
    }, [selectedAddress, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getUsdtAddressData = async () => {
                const usdtAddressData = await remainingBalance(selectedAddress);
                setRemaining(usdtAddressData / 10 ** 18);
            };
            getUsdtAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getUsdtAddressData = async () => {
                const usdtAddressData = await availableDrawDownAmount(
                    selectedAddress,
                );
                setClimable(usdtAddressData / 10 ** 18);
            };
            getUsdtAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    const climeTokenData = async () => {
        try {
            setLoading(true);
            const calAllowToken = await drawDown(selectedAddress);
            if (calAllowToken.status === true) {
                dispatch(showToastMessage("Clime Success", "success"));
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
    const handleChange = (event) => {
        setSelectedCoin(event.target.value);
    };
    return (
      <Box className="tab-box" p={4}>
        <p className="tab-head" style={{textAlign: 'center'}}>Waiting for Vesting</p>
        {/* <FormControl
                fullWidth
                sx={{ m: 1, marginBottom: "20px" }}
                variant="standard"
            >
                <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={selectedAddress}
                    disabled={true}
                    startAdornment={
                        <InputAdornment position="start">
                            {" "}
                            <img src="images/Arrow - Down 4.png" />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            {" "}
                            <p className="adorment-disconnect">Disconnect</p>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{ display: "flex" }}>
                <Box>
                    <FormControl
                        fullWidth
                        sx={{ m: 1, marginBottom: "20px" }}
                        variant="standard"
                    >
                        <InputLabel htmlFor="standard-adornment-date">
                            Claimed to date
                        </InputLabel>
                        <Input
                            id="standard-adornment-date"
                            value={climedToken}
                            disabled={true}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        fullWidth
                        sx={{ m: 1, marginBottom: "20px" }}
                        variant="standard"
                    >
                        <InputLabel htmlFor="standard-adornment-total">
                            Total Purchased
                        </InputLabel>
                        <Input
                            id="standard-adornment-total"
                            value={totalParched}
                            disabled={true}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl
                        fullWidth
                        sx={{ m: 1, marginBottom: "20px" }}
                        variant="standard"
                    >
                        <InputLabel htmlFor="standard-adornment-p">
                            Pending
                        </InputLabel>
                        <Input
                            id="standard-adornment-p"
                            value={remaining}
                            disabled={true}
                        />
                    </FormControl>
                </Box>
            </Box>
            <FormControl
                fullWidth
                sx={{ m: 1, marginBottom: "20px" }}
                variant="standard"
            >
                <InputLabel htmlFor="standard-adornment-amount">
                    Claimable
                </InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={climable}
                    disabled={true}
                />
            </FormControl>
            {loading ? (
                <Button className="buy-button" disabled>
                    Loading....
                </Button>
            ) : climable > 0 ? (
                <Button className="buy-button" onClick={climeTokenData}>
                    Clime Now
                </Button>
            ) : (
                <Button className="buy-button" disabled>
                    Clime Now
                </Button>
            )} */}
      </Box>
    );
};
export default ClaimBox;
