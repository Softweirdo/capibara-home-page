import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import {
  Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import SwapBox from "../components/SwapBox";
import HeaderConnect from "../components/wallet";
import { useDispatch, useSelector } from "react-redux";

const Wallet = () => {
    const { selectedAddress, latestBlockNumberState, walletType } = useSelector(
        (state) => state.accounts,
    );
    const [selectedWallet, setSelectedWallet] = React.useState("");
    const handleChange = (event) => {
        setSelectedWallet(event.target.value);
    };
    const [isConnected, setIsConnected] = React.useState(false);

    return (
      <>
        <Box sx={{ padding: { md: "40px", xs: "10px" } }}>
          <Grid container>
            <Grid item sm={12} md={8} xs={12}>
              <p className={"wallet-head"}>Lorem Ipsum</p>
              <p className={"wallet-text"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lobortis iaculis semper. Morbi vehicula, ipsum nec pellentesque aliquam, elit mauris suscipit eros, et gravida nibh tellus a est. Maecenas ut ante nisi. Phasellus sollicitudin mollis velit at consequat. Integer ac scelerisque ligula.
              </p>
              <p className="wallet-title">Details</p>
              <Grid container mb={1}>
                <Grid item sm={12} md={4} xs={12}>
                  <p className="wallet-sub-title">Token Symbol</p>
                  <p className="wallet-sub-title">
                    Market Cap at Exchange Listing 
                    
                    {/* (excl. liquidity) */}
                  </p>
                  <p className="wallet-sub-title">Private Round Sale Price</p>
                  <p className="wallet-sub-title">Public Sale Price</p>
                  <p className="wallet-sub-title">Token Address</p>
                </Grid>
                <Grid item sm={12} md={8} xs={12}>
                  <p className="wallet-sub-text">CPI</p>
                  <p className="wallet-sub-text">$24,00,000.00<br /></p>
                  {/* <p className="wallet-sub-text">&nbsp;</p> */}
                  <p className="wallet-sub-text">$0.30</p>
                  <p className="wallet-sub-text">$0.32</p>
                  <p className="wallet-sub-text">
                    0xb155d5cb7a43c0ef16bd6c8907c66ce062937122
                  </p>
                </Grid>
              </Grid>
              <p className="wallet-title">Vesting Schedule</p>
              <Grid container mt={2}>
                <Grid item sm={12} md={4} xs={12}>
                  <p className="wallet-sub-text">Seed Round Sale</p>
                  <p className="wallet-sub-text">Strategic Round Sale </p>
                  <p className="wallet-sub-text">Private Round Sale </p>
                </Grid>
                <Grid item sm={12} md={8} xs={12}>
                  <p className="wallet-sub-text">
                    10% Each Month after Listing
                  </p>
                  <p className="wallet-sub-text">
                    10% Each Month after Listing{" "}
                  </p>
                  <p className="wallet-sub-text">
                    10% Each Month after Listing{" "}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={4} p={2} xs={12}>
              {selectedAddress ? (
                <>
                  <Box>
                    <SwapBox />
                  </Box>
                </>
              ) : (
                <>
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Select Wallet
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={selectedWallet}
                      onChange={handleChange}
                      label="Select Wallet"
                      fullWidth
                    >
                      <MenuItem value={"TRUST"}>Trust Wallet</MenuItem>
                      <MenuItem value={"METAMASK"}>Meta Mask</MenuItem>
                      <MenuItem value={"WALLET-CONNECT"}>
                        Wallet connect
                      </MenuItem>
                      <MenuItem value={"BINANCE"}>Binance Wallet</MenuItem>
                    </Select>
                  </FormControl>
                  <Box className="connect-box">
                    <Button
                      onClick={() => {
                        setIsConnected(true);
                      }}
                      className="c-btn buy-button"
                      style={{ width: "auto",color: "black",
                      textShadow: '2px 2px #937a7ade' }}
                    >
                      Connect Wallet
                    </Button>
                  </Box>
                  <b style={{ fontSize: "12px" }}>
                    Notes : You must have ‘USDT BEP20’ and ‘Smart Chain BNB’
                    tokens in your wallet before proceeding to buy CPI token.
                  </b>
                </>
              )}
            </Grid>
          </Grid>
          {isConnected ? (
            <HeaderConnect walletType={isConnected && selectedWallet} />
          ) : (
            ""
          )}
        </Box>
      </>
    );
};
export default Wallet;
