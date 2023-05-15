/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "./DashboardFooter";
import { Box } from "@mui/system";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BG from "../../assets/images/bg3.jpg"
import DashboardSidebar from "./DashboardSidebar";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 72;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  flexDirection: "column",
  backgroundImage: `url(${BG})`,
  backgroundPosition: 'top',
  backgroundSize: '75%'
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    // minHeight: "100%",
  backdropFilter: 'blur(3px)',

    paddingTop: APP_BAR_MOBILE,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("lg")]: {
        paddingTop: APP_BAR_DESKTOP,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------
const PeraStyled = styled("p")(({ theme }) => ({
    lineHeight: "40px",
}));
export default function HomePageLayout() {
    const [openConnectDialog, setOpenConnectDialog] = useState(false);

    const handelOpenConnectDialog = () => {
        setOpenConnectDialog(true);
    };
    const handelCloseConnectDialog = () => {
        setOpenConnectDialog(false);
    };
    return (
      <RootStyle>
        <Grid container>
          <Grid
            item
            md={1}
            sm={1}
          >
            <DashboardSidebar
              onClose={handelCloseConnectDialog}
              open={handelOpenConnectDialog}
            />
          </Grid>
          <Grid item md={11} sm={11}>
            <DashboardNavbar
              onClose={handelCloseConnectDialog}
              open={handelOpenConnectDialog}
            />
            <MainStyle>
              <Outlet
                onClose={handelCloseConnectDialog}
                open={handelOpenConnectDialog}
              />
            </MainStyle>
            {/* <DashboardFooter
              onClose={handelCloseConnectDialog}
              open={handelOpenConnectDialog}
            /> */}
          </Grid>
        </Grid>

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
                    visit{" "}
                    <a href="https://trustwallet.com/" target="_blank">
                      www.trustwallet.com.
                    </a>
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
                    Step 5 : Scroll down to very bottom and click on add custom
                    token
                  </PeraStyled>
                  <PeraStyled>
                    Step 6 : In add custom token screen select network to “Smart
                    Chain”
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
                    Step 11 : Open{" "}
                    <a href="https://www.fairface.io/" target="_blank">
                      'www.fairface.io'
                    </a>{" "}
                    in your phone browser.
                  </PeraStyled>
                  <PeraStyled>
                    Step 12 : Click on ‘Participate in ICO’ button.
                  </PeraStyled>

                  <PeraStyled>
                    Step 13 : Click on ‘Connect Wallet’ button on top right
                    corner you will see four options.
                  </PeraStyled>
                  <PeraStyled>
                    Step 14 : on Android phone select ‘Trust Wallet’ / on IPhone
                    select ‘Wallet Connect’
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
                    Step 17 : Cleck on Approve. Please wait few seconds and you
                    will see the FAF tokens in your trust wallet account.
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
                    <a href="https://metamask.io/download.html" target="_blank">
                      https://metamask.io/download.html
                    </a>
                  </PeraStyled>
                  <PeraStyled>Step 2 :Open an account in MetaMask.</PeraStyled>
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
                    tokens in your MetaMask wallet before proceeding to buy FAF
                    token. Less than $1 worth of BNB to buy $10000 USDT worth of
                    FAF tokens. Preferred exchanges to buy USDT BEP20 and Smart
                    Chain BNB are Binance or Gate.
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
                    Step 18 : on Android phone select ‘Trust Wallet’ / on IPhone
                    select ‘Wallet Connect’
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
      </RootStyle>
    );
}
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
