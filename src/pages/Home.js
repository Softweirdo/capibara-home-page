import React, { useState, useEffect } from "react";
import amico from "../assets/images/amico.png";
import food from "../assets/images/food.png";
import game from "../assets/images/game.png";
import gmb from "../assets/images/gmb.png";
import one from "../assets/images/one.png";
import use from "../assets/images/use.png";
import user from "../assets/images/user.png";
import { sendEmail } from "../redux/actions/ff";
import pdf from "../assets/FairFace_Whitepaper.pdf";

import twitter from "../assets/images/twitter.png";
import insta from "../assets/images/insta.png";
import facebook from "../assets/images/facebook.png";
import telegram from "../assets/images/telegram.png";
import movies from "../assets/images/movies.png";
import mail from "../assets/images/mail.png";

import healthicons from "../assets/images/healthicons.png";
import voucher from "../assets/images/voucher.png";
import cuate from "../assets/images/cuate.png";
import ic from "../assets/images/ic.png";
import ic2 from "../assets/images/ic2.png";
import ic3 from "../assets/images/ic3.png";
import anim0 from "../assets/images/Animation 01.json";

import anim1 from "../assets/images/Animation 02.json";
import anim2 from "../assets/images/Animation 03.json";
import anim3 from "../assets/images/Animation 04.json";
import anim4 from "../assets/images/Animation 05.json";
import anim5 from "../assets/images/Animation 06.json";


import rafiki from "../assets/images/rafiki1.png";
import rafiki2 from "../assets/images/rafiki.png";

import pieChart from "../assets/images/faftokonomics.png";
import roadmap from "../assets/images/fafroadmap.png";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./timer";
import { Link } from "react-scroll";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import {
    getTokenAddress,
    getUsdtAddress,
    getRate,
    getMinAmount,
    exchangeToken,
    checkReferralToken,
} from "../utility/contractMethods/ico";
import {
    getTokenSymbol,
    tokenBalanceOfAddress,
    tokenAllowance,
    tokenApprove,
} from "../utility/contractMethods/token";
import {
    borderRadius,
    Box,
    style,
    styled,
    typography,
    width,
} from "@mui/system";
import { IcoAddress, date, EMAIL_PATTERN } from "../config/index";
import { showToastMessage } from "../redux/actions/toastNotification/index";
import Countdown from "react-countdown";
import * as Lottie from "lottie-web";
import OurTeam from "./OurTeam";
import { Input } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const PrimaryColor = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main,
}));

const CardStyled = styled("div")(({ theme }) => ({
    height: "265px",
    width: "auto",
    background: theme.palette.primary.main,
    padding: "50px 80px 18px",
    borderRadius: "9px",
    color: "white",
    textAlign: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
}));
const SellerCard = styled("div")(({ theme }) => ({
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 5px 0 rgba(0, 0, 0, 0.25)",
    minHeight: "280px",
}));
const TimerCard = styled("div")(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "30px 50px",
    width: 600,
    borderRadius: 10,
}));
const CountDownCard = styled("div")(({ theme }) => ({
    padding: 20,
    textAlign: "center",
    borderRadius: 5,
    minWidth: 70,
    maxWidth: 70,
    background: theme.palette.primary.main,
    margin: "auto",
}));

const BalanceCard = styled(Card)(({ theme }) => ({
    padding: 20,
    background: theme.palette.primary.main,
}));

const TextFieldstyled = styled(TextField)(({ theme }) => ({
    background: "white",
    borderRadius: 8,
}));

const PeraStyled = styled("p")(({ theme }) => ({
    lineHeight: "40px",
}));

const Home = () => {
    const dispatch = useDispatch();
    const { selectedAddress, provider, wrongNetwork } = useSelector(
        (state) => state.accounts,
    );
    const startDate = new Date(date).getTime();

    const [tokenAddress, setTokenAddress] = useState(null);
    const [tokenName, setTokenName] = useState(null);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [usdtAddress, setUsdtAddress] = useState(null);
    const [usdtName, setUsdtName] = useState(null);
    const [usdtBalance, setUsdtBalance] = useState(0);
    const [rate, setRate] = useState(1);
    const [loading, setLoading] = useState(false);
    const [changeState, setChangeState] = useState(false);
    const [alreadyReferral, setAlreadyReferral] = useState(true);

    const [allowanceToken, setAllowanceToken] = useState(0);
    const [referralAddress, setReferralAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [minAmount, setMinAmount] = useState(0);

    const [openConnectDialog, setOpenConnectDialog] = useState(false);
    const [openWhitePaperDialog, setOpenWhitePaperDialog] = useState(false);
    const [whitePaperEmail, setWhitePaperEmail] = useState("");
    const [whitePaperFiledError, setWhitePaperFiledError] = useState();
    const [submitButton, setSubmitButton] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            const getTokenAddressData = async () => {
                const tokenAddressData = await getTokenAddress(selectedAddress);
                setTokenAddress(tokenAddressData);
            };
            getTokenAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress && tokenAddress) {
            const getTokenNameData = async () => {
                const tokenNameData = await getTokenSymbol(
                    tokenAddress,
                    selectedAddress,
                );
                setTokenName(tokenNameData);
            };
            getTokenNameData();
        }
    }, [selectedAddress, tokenAddress, changeState]);

    useEffect(() => {
        if (selectedAddress && tokenAddress) {
            const getTokenBalanceData = async () => {
                const tokenBalanceData = await tokenBalanceOfAddress(
                    tokenAddress,
                    selectedAddress,
                );
                setTokenBalance(tokenBalanceData / 10 ** 18);
            };
            getTokenBalanceData();
        }
    }, [selectedAddress, tokenAddress, changeState]);

    useEffect(() => {
        if (selectedAddress && tokenAddress) {
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
    }, [selectedAddress, tokenAddress, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getUsdtAddressData = async () => {
                const usdtAddressData = await getUsdtAddress(selectedAddress);
                setUsdtAddress(usdtAddressData);
            };
            getUsdtAddressData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getReferralData = async () => {
                const referralToken = await checkReferralToken(selectedAddress);

                setAlreadyReferral(referralToken);
            };
            getReferralData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress && usdtAddress) {
            const getUsdtNameData = async () => {
                const usdtNameData = await getTokenSymbol(
                    usdtAddress,
                    selectedAddress,
                );
                setUsdtName(usdtNameData);
            };
            getUsdtNameData();
        }
    }, [selectedAddress, usdtAddress, changeState]);

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

                setRate(rateData);
            };
            getRateData();
        }
    }, [selectedAddress, provider, changeState]);

    useEffect(() => {
        if (selectedAddress) {
            const getMinAmountData = async () => {
                const minAmountData = await getMinAmount(selectedAddress);

                setMinAmount(minAmountData / 10 ** 18);
            };
            getMinAmountData();
        }
    }, [selectedAddress, provider, changeState]);

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
        setAmount(e.target.value);
        setToAmount(e.target.value * rate);
    };

    const swapTokenData = async () => {
        try {
            setLoading(true);
            if (amount < minAmount) {
                dispatch(
                    showToastMessage(
                        `Enter Minimum Amount ${minAmount}`,
                        "error",
                    ),
                );
                setLoading(false);
            } else {
                const calAllowToken = await exchangeToken(
                    referralAddress != "" ? referralAddress : IcoAddress,
                    selectedAddress,
                    amount,
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
            }
        } catch (error) {
            dispatch(showToastMessage(error.message, "error"));
            setLoading(false);
        }
    };

    const handelOpenConnectDialog = () => {
        setOpenConnectDialog(true);
    };
    const handelCloseConnectDialog = () => {
        setOpenConnectDialog(false);
    };
    const handelWhitePaperDialog = (value) => {
        if (value == "open") {
            setOpenWhitePaperDialog(true);
        } else {
            setOpenWhitePaperDialog(false);
        }
    };

    const handelWhitePaper = () => {
        setSubmitButton(true);
        validWhitePaperFiled();

        if (validWhitePaperFiled()) {
            dispatch(
                sendEmail(
                    {
                        email: whitePaperEmail,
                        type: "whitePaper",
                    },
                    (value) => {
                        console.log(value);
                        if (value.status == true) {
                            dispatch(
                                showToastMessage(
                                    "white paper successfully sent in your mail",
                                    "success",
                                ),
                            );
                            handelWhitePaperDialog("close");
                            setWhitePaperEmail("");
                        } else {
                            dispatch(
                                showToastMessage(
                                    "something went wrong",
                                    "error",
                                ),
                            );
                        }
                    },
                ),
            );
        }
    };
    const handleChange = (e) => {
        setWhitePaperEmail(e.target.value);
        submitButton && validWhitePaperFiled();
    };
    const validWhitePaperFiled = () => {
        var isError = false;
        if (EMAIL_PATTERN.test(whitePaperEmail)) {
            setWhitePaperFiledError("");
        } else {
            setWhitePaperFiledError("email not valid");
            isError = true;
        }
        return !isError;
    };
    useEffect(() => {
        var params = {
            container: document.getElementById("anim1"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: anim1,
        };
        var main;
        main = Lottie.loadAnimation(params);
    }, []);
    useEffect(() => {
        var params = {
            container: document.getElementById("anim4"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: anim4,
        };
        var main;
        main = Lottie.loadAnimation(params);
    }, []);
    useEffect(() => {
        var params = {
            container: document.getElementById("anim2"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: anim2,
        };
        var main;
        main = Lottie.loadAnimation(params);
    }, []);
    useEffect(() => {
        var params = {
            container: document.getElementById("anim3"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: anim3,
        };
        var main;
        main = Lottie.loadAnimation(params);
    }, []);
    useEffect(() => {
        var params = {
            container: document.getElementById("anim0"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: anim0,
        };
        var main;
        main = Lottie.loadAnimation(params);
    }, []);
      useEffect(() => {
        var params = {
          container: document.getElementById("anim5"),
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: anim5,
        };
        var main;
        main = Lottie.loadAnimation(params);
      }, []);
    return (
      <Box sx={{ position: "relative" }}>
        <Container maxWidth="lg">
          <Box>
            <Grid container>
              <Grid item sm={12} md={12} textAlign="center">
                <Box
                  sx={{
                    width: {
                      md: "100%",
                      sm: "100%",
                    },
                  }}
                >
                  <Box sx={{ margin: "35px 0px 15px 0px" }}>
                    <Typography variant="h2" className="hello-there">
                      India's First Decentralised Exchange
                    </Typography>
                  </Box>
                  <Box className="hello-content">
                    Now enjoy India's first truly decentralised exchange where
                    you can enjoy Dex trading in Rupees via Rupaydex
                  </Box>
                  <Box className="enter-email">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      disableUnderline={true}
                      sx={{ width: { md: "70%", xs: "60%" } }}
                    />
                    <Button
                      className="get-start"
                      // variant="outlined"
                    >
                      Get Started
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "Center",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Box>
          {/* explore more collections */}
          {/* <Box sx={{ marginTop: "80px" }}>
          <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
            <Typography textAlign="center" variant="h2">
              Explore more Collections
            </Typography>
            <Divider sx={{ margin: "auto", borderWidth: 1 }} width="150px" />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CardStyled>
                <img src={food} />
                <Typography variant="h4">Food</Typography>
              </CardStyled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CardStyled>
                <img src={game} />
                <Typography variant="h4">Game</Typography>
              </CardStyled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CardStyled>
                <img src={movies} />
                <Typography variant="h4">Entertainment</Typography>
              </CardStyled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CardStyled>
                <img src={healthicons} />
                <Typography variant="h4">Travel</Typography>
              </CardStyled>
            </Grid>
          </Grid>
        </Box> */}
          {/* how it's works */}
          <div id="howitwork"></div>
          <Box sx={{ marginTop: "50px" }}>
            <Grid container>
              <Grid
                item
                sx={12}
                sm={12}
                md={3}
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                <Box className="sip-box">
                  <img src={"images/icon (1).png"} />
                  <b>SIP in Crypto</b>
                  <p>
                    SIP in crypto seems exciting but yet complex at the same
                    time.
                  </p>
                </Box>
                <Box className="sip-box" mt={3}>
                  <img src={"images/icon (3).png"} />
                  <b>NFT Marketplace</b>
                  <p>
                    Stay on top of the markets with the Cryptolly app for
                    Android or iOS.
                  </p>
                </Box>
              </Grid>
              <Grid
                item
                sm={12}
                md={3}
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                }}
                sx={{ paddingLeft: { xs: "0px", md: "24px" } }}
              >
                <Box className="sip-box" sx={{ marginTop: { md: "70%" } }}>
                  <img src={"images/icon (2).png"} />
                  <b>Multichain Dex</b>
                  <p>
                    For added security, store your funds in a vault with time
                    delayed withdrawals.
                  </p>
                </Box>
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                style={{
                  textAlign: "left",
                  marginBottom: "15px",
                }}
                sx={{ paddingLeft: { xs: "0px", md: "96px" } }}
              >
                <Box
                  className="sip-box-content"
                  sx={{ marginTop: { md: "40%" } }}
                >
                  <b>SIP in Crypto</b>
                  <p>
                    At RupayDex we are developing two protocols i.e. CSIPs and
                    DSIPs whereas CSIPs stands for “Custodial SIPs” and DSIPs as
                    “Decentralized SIPs”. Using these two features on RupayDex
                    user will be able to experience both ways of systematic
                    investment planning in crypto
                  </p>
                  <Button
                    className="get-start-header"
                    // variant="outlined"
                  >
                    Start a SIP
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <div id="why-us"></div>
          {/* <Box sx={{ marginTop: "100px" }}>
            <Box sx={{ marginBottom: "40px" }}>
              <Typography variant="h2"> Why Us</Typography>
              <Divider
                sx={{
                  borderWidth: 4,
                  backgroundColor: "#FAD759",
                  borderRadius: "5px",
                }}
                width="110px"
              />
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <SellerCard>
                    <Typography
                      style={{
                        display: "flex",
                        fontSize: "24px",
                        fontWeight: "bold",
                        alignItems: "center",
                      }}
                      textAlign="left"
                      variant="p"
                      mb={3}
                    >
                      <img
                        src={one}
                        style={{
                          display: "initial",
                          marginRight: "10px",
                        }}
                        height="50px"
                      />{" "}
                      First one
                    </Typography>
                    <Typography textAlign="left" variant="p">
                      FAF token will be the first to be implemented as a reward
                      token on B2C platform with more than 25000+ listed
                      businesses.
                    </Typography>
                  </SellerCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SellerCard>
                    <Typography
                      style={{
                        display: "flex",
                        fontSize: "24px",
                        fontWeight: "bold",
                        alignItems: "center",
                      }}
                      textAlign="left"
                      variant="p"
                      mb={3}
                    >
                      <img
                        src={user}
                        style={{
                          display: "initial",
                          marginRight: "10px",
                        }}
                        height="50px"
                      />{" "}
                      Introduce new users to Digital ecosystem
                    </Typography>
                    <Typography textAlign="center" variant="p">
                      Less than 10% of customers write reviews on companies when
                      asked. By rewarding with FAF tokens the customers will be
                      encouraged to write reviews on products and services and
                      also introduce them to digital currencies.
                    </Typography>
                  </SellerCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SellerCard>
                    <Typography
                      style={{
                        display: "flex",
                        fontSize: "24px",
                        fontWeight: "bold",
                        alignItems: "center",
                      }}
                      textAlign="left"
                      variant="p"
                      mb={3}
                    >
                      <img
                        src={use}
                        style={{
                          display: "initial",
                          marginRight: "10px",
                        }}
                        height="50px"
                      />{" "}
                      Multi Usage
                    </Typography>
                    <Typography textAlign="center" variant="p">
                      FAF tokens can be redeemed by users with the listed
                      businesses on Fairface review platform or the token can be
                      converted into other digital currencies.
                    </Typography>
                  </SellerCard>
                </Grid>
              </Grid>
            </Box>
          </Box> */}
          {/* <section id="ico">
                    <Box sx={{ marginBottom: "40px", paddingTop: "100px" }}>
                        <Typography variant="h2">ICO</Typography>
                        <Divider
                            sx={{
                                borderWidth: 4,
                                backgroundColor: "#FAD759",
                                borderRadius: "5px",
                            }}
                            width="50px"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <TimerCard>
                            <Typography variant="h5" mb={4} textAlign="center">
                                Pre sale is live
                            </Typography>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    color: "#fff",
                                    width: {
                                        xs: "100%",
                                        sm: "70%",
                                    },
                                    margin: "auto",
                                }}
                            >
                                <Countdown date={startDate} renderer={Timer} />
                            </Box>
                            {alreadyReferral ? (
                                ""
                            ) : (
                                <Stack direction="row" mt={3} spacing={2}>
                                    <TextFieldstyled
                                        placeholder="Referral Address"
                                        type="text"
                                        fullWidth
                                        disabled={
                                            allowanceToken > 0 ? false : true
                                        }
                                        value={referralAddress}
                                        onChange={(e) => {
                                            setReferralAddress(e.target.value);
                                        }}
                                    />
                                </Stack>
                            )}
                            <Box sx={{ margin: "50px 0px 20px 0px" }}>
                                <BalanceCard>
                                    <Stack
                                        mb={3}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                        style={{ color: "#fff" }}
                                    >
                                        <h4>From</h4>
                                        <h4>
                                            Balance: {usdtBalance.toFixed(3)} (
                                            {usdtName})
                                        </h4>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <TextFieldstyled
                                            placeholder="0"
                                            type="number"
                                            fullWidth
                                            disabled={
                                                allowanceToken > 0
                                                    ? false
                                                    : true
                                            }
                                            value={amount}
                                            onChange={(e) => {
                                                setAmountData(e);
                                            }}
                                        />
                                    </Stack>
                                </BalanceCard>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <p>&#x21c5;</p>
                            </Box>
                            <Box sx={{ margin: "20px 0px" }}>
                                <Card sx={{ padding: "20px" }}>
                                    <Stack
                                        mb={3}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <h4>To</h4>
                                        <h4>
                                            Balance: {tokenBalance.toFixed(3)} (
                                            {tokenName})
                                        </h4>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <TextFieldstyled
                                            placeholder="0"
                                            type="number"
                                            fullWidth
                                            disabled={true}
                                            value={toAmount}
                                        />
                                    </Stack>
                                </Card>
                            </Box>
                            <Box>
                                {selectedAddress ? (
                                    wrongNetwork ? (
                                        <Button
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                            disabled={true}
                                        >
                                            Please Connect Binance Smart Chain
                                        </Button>
                                    ) : loading ? (
                                        <Button
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                        >
                                            <CircularProgress color="inherit" />
                                        </Button>
                                    ) : allowanceToken > 0 ? (
                                        <Button
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                            onClick={swapTokenData}
                                        >
                                            Exchange
                                        </Button>
                                    ) : (
                                        <Button
                                            size="large"
                                            variant="contained"
                                            fullWidth
                                            onClick={approveTokenData}
                                        >
                                            Approve
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        size="large"
                                        variant="contained"
                                        fullWidth
                                        // disabled={true}
                                        onClick={handelOpenConnectDialog}
                                    >
                                        How to connect
                                    </Button>
                                )}
                            </Box>
                        </TimerCard>
                    </Box>
                </section> */}
          {/* <Box sx={{ marginTop: "80px" }} id="tokenomics">
            <Box sx={{ marginBottom: "40px" }}>
              <Typography variant="h2">Tokenomics</Typography>
              <Divider
                sx={{
                  borderWidth: 4,
                  backgroundColor: "#FAD759",
                  borderRadius: "5px",
                }}
                width="150px"
              />
            </Box>
            <Box>
              <Box
                component="img"
                src={pieChart}
                sx={{ height: { md: "500px" }, margin: "auto" }}
              />
            </Box>
          </Box> */}
          {/* <Box sx={{ marginTop: "80px" }} id="roadmap">
            <Box sx={{ marginBottom: "40px" }}>
              <Typography variant="h2">Roadmap</Typography>
              <Divider
                sx={{
                  borderWidth: 4,
                  backgroundColor: "#FAD759",
                  borderRadius: "5px",
                }}
                width="130px"
              />
            </Box>
            <Box>
              <Box
                component="img"
                src={roadmap}
                sx={{ height: { md: "450px" }, margin: "auto" }}
              />
            </Box>
          </Box> */}
          <Box sx={{ marginTop: "80px" }} id="roadmap">
            {/* <Box sx={{ marginBottom: "40px" }}>
            <Typography variant="h2">Our Team</Typography>
            <Divider
              sx={{
                borderWidth: 4,
                backgroundColor: "#FAD759",
                borderRadius: "5px",
              }}
              width="130px"
            />
          </Box> */}
            {/* <Box>
              <OurTeam />
            </Box> */}
          </Box>
          <Dialog
            fullWidth
            scroll="body"
            maxWidth="md"
            onClose={handelCloseConnectDialog}
            open={openConnectDialog}
          >
            <BootstrapDialogTitle onClose={handelCloseConnectDialog}>
              <Box sx={{ textAlign: "center", paddingTop: "20px" }}>
                <Typography variant="h3"> How To Connect FAF Token</Typography>
              </Box>
            </BootstrapDialogTitle>
            <Divider />
            <Box>
              <DialogContent>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="h5">
                    Buy FAF token on your phone (Android/Iphone)
                  </Typography>
                  <Box sx={{ paddingLeft: "20px" }}>
                    <PeraStyled>
                      Step 1 : Install Trust Wallet App from the App store or
                      visit www.trustwallet.com.
                    </PeraStyled>
                    <PeraStyled>
                      Step 2 : Open an account in trust wallet.
                    </PeraStyled>
                    <PeraStyled>
                      Step 3 : Open trust wallet on your mobile
                    </PeraStyled>
                    <PeraStyled>
                      Step 4 : In the wallet screen click on manage button ( top
                      right corner beside collectibles )
                    </PeraStyled>
                    <PeraStyled>
                      Step 5 : Scroll down to very bottom and click on add
                      custom token
                    </PeraStyled>
                    <PeraStyled>
                      Step 6 : In add custom token screen select network to
                      “Smart Chain”
                    </PeraStyled>
                    <PeraStyled>
                      Step 7 : Paste the address in contract address Field :
                      0xe65313B085258a671d044F7Ad9D9fcd514c5d9e9
                    </PeraStyled>
                    <PeraStyled>
                      Step 8 : Click on done and FAF token will be added on to
                      your wallet screen.
                    </PeraStyled>
                    <PeraStyled>
                      Step 9 : You must have ‘USDT BEP20’ and ‘Smart Chain BNB’
                      tokens in your Trust wallet
                    </PeraStyled>
                    <PeraStyled>
                      before proceeding to buy FAF token. Less than $1 worth of
                      BNB to buy $10000 USDT worth of FAF tokens. Preferred
                      exchanges to buy USDT BEP20 and Smart Chain BNB are
                    </PeraStyled>
                    <PeraStyled>Binance or Gate.</PeraStyled>
                    <PeraStyled>
                      Please note that when you transfer USDT to trust wallet
                      select BEP20 only. you can’t transfer USDT BEP20 from
                      Coinbase.
                    </PeraStyled>
                    <PeraStyled>
                      Step 10 : Check that you have the right funds to buy.
                    </PeraStyled>
                    <PeraStyled>
                      Step 11 : Open 'www.fairface.io' in your phone browser.
                    </PeraStyled>
                    <PeraStyled>
                      Step 12 : Click on ‘Participate in ICO’ button.
                    </PeraStyled>

                    <PeraStyled>
                      Step 13 : Click on ‘Connect Wallet’ button on top right
                      corner you will see four options.
                    </PeraStyled>
                    <PeraStyled>
                      Step 14 : on Android phone select ‘Trust Wallet’ / on
                      IPhone select ‘Wallet Connect’
                    </PeraStyled>
                    <PeraStyled>
                      Step 15 : You can see your wallet address at the top right
                      corner.
                    </PeraStyled>
                    <PeraStyled>
                      Step 16 : Enter the USDT amount you want to buy and that
                      will show you FAF tokens.
                    </PeraStyled>
                    <PeraStyled>
                      Step 17 : Cleck on Approve. Please wait few seconds and
                      you will see the FAF tokens in your trust wallet account.
                    </PeraStyled>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="h5">
                    Buy FAF token on your Desktop or Laptop or PC
                  </Typography>
                  <Box sx={{ paddingLeft: "20px" }}>
                    <PeraStyled>
                      Please note that browser supported are: Chrome, Firefox,
                      Brave, Edge
                    </PeraStyled>
                    <PeraStyled>
                      Step 1: Download & Install MetaMask extension from{" "}
                      <a
                        href="https://metamask.io/download.html"
                        target="_blank"
                      >
                        https://metamask.io/download.html
                      </a>
                    </PeraStyled>
                    <PeraStyled>
                      Step 2 :Open an account in MetaMask.
                    </PeraStyled>
                    <PeraStyled>
                      Step 3 : Click on Add Token under assets tab
                    </PeraStyled>
                    <PeraStyled>Step 4 : Click on Custom Token</PeraStyled>
                    <PeraStyled>
                      Step 5 : Enter Token Address :
                      0xe65313B085258a671d044F7Ad9D9fcd514c5d9e9
                    </PeraStyled>
                    <PeraStyled>
                      Step 6 : Click on Next and Token will be added to your
                      wallet
                    </PeraStyled>
                  </Box>
                </Box>

                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="h5">
                    Add Binance network to Metamsk
                  </Typography>
                  <Box sx={{ paddingLeft: "20px" }}>
                    <PeraStyled>
                      Step 7 : Click on 3 dots menu button and open Metamask in
                      Expand view
                    </PeraStyled>
                    <PeraStyled>
                      Step 8 : Click on profile logo besides network name
                    </PeraStyled>
                    <PeraStyled>Step 9 : Click on settings</PeraStyled>
                    <PeraStyled>Step 10 : Click on Networks</PeraStyled>
                    <PeraStyled>Step 11 : click on add network</PeraStyled>
                    <PeraStyled>
                      Step 12 : Enter the following Details in respective fields
                    </PeraStyled>
                    <PeraStyled>
                      Step 13 : Enter the following Details in respective fields
                    </PeraStyled>
                    <PeraStyled>
                      Network Name : Binance Smart Chain Mainnet
                    </PeraStyled>
                    <PeraStyled>
                      New RPC URL : https://bsc-dataseed1.ninicoin.io
                    </PeraStyled>
                    <PeraStyled>Chain ID : 56</PeraStyled>
                    <PeraStyled>Currency Symbol : BNB</PeraStyled>
                    <PeraStyled>
                      Blockchain Explorer : https://bscscan.com/
                    </PeraStyled>
                    <PeraStyled>
                      Click on save and network for binance smart chain will be
                      saved.
                    </PeraStyled>
                    <PeraStyled>
                      Step 14 : You must have ‘USDT BEP20’ and ‘Smart Chain BNB’
                      tokens in your MetaMask wallet before proceeding to buy
                      FAF token. Less than $1 worth of BNB to buy $10000 USDT
                      worth of FAF tokens. Preferred exchanges to buy USDT BEP20
                      and Smart Chain BNB are Binance or Gate.
                    </PeraStyled>
                    <PeraStyled>
                      Please note that when you transfer USDT to trust wallet
                      select BEP20 only. you can’t transfer USDT BEP20 from
                      Coinbase.
                    </PeraStyled>
                    <PeraStyled>
                      Step 15 : Check that you have the right funds to buy.
                    </PeraStyled>
                    <PeraStyled>
                      Step 16 : Click on ‘Participate in ICO’ button.
                    </PeraStyled>

                    <PeraStyled>
                      Step 17 : Click on ‘Connect Wallet’ button on top right
                      corner you will see four options.
                    </PeraStyled>
                    <PeraStyled>
                      Step 18 : on Android phone select ‘Trust Wallet’ / on
                      IPhone select ‘Wallet Connect’
                    </PeraStyled>
                    <PeraStyled>
                      Step 19 : You can see your wallet address at the top right
                      corner.
                    </PeraStyled>
                    <PeraStyled>
                      Step 20 : Enter the USDT amount you want to buy and that
                      will show you FAF tokens.
                    </PeraStyled>
                  </Box>
                </Box>
              </DialogContent>
            </Box>
          </Dialog>
          <Dialog
            onClose={() => handelWhitePaperDialog("close")}
            open={openWhitePaperDialog}
          >
            <Box sx={{ padding: "20px" }}>
              <Box
                sx={{ float: "right", cursor: "pointer" }}
                onClick={() => handelWhitePaperDialog("close")}
              >
                <CloseIcon />
              </Box>
              <Box sx={{ margin: "10px 0px" }}>
                <h4>Enter Your Email to Get White Paper</h4>
              </Box>
              <TextField
                placeholder="Enter Your Email"
                fullWidth
                type="email"
                name="whitePaperEmail"
                onChange={handleChange}
                value={whitePaperEmail}
                helperText={
                  whitePaperFiledError && whitePaperFiledError
                    ? whitePaperFiledError
                    : ""
                }
                error={Boolean(whitePaperFiledError)}
              />
              <Box sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handelWhitePaper}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Container>
      </Box>
    );
};

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default Home;
