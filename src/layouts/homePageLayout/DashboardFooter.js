import React from "react";
import {
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box, styled, typography } from "@mui/system";
import Logo2 from "../../assets/images/fflogo.png";
import Logo from "../../assets/images/fflogo1.png";

import twitter from "../../assets/images/twitter.png";
import insta from "../../assets/images/insta.png";
import facebook from "../../assets/images/facebook.png";
import telegram from "../../assets/images/telegram.png";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import RUPAYlogo from "../../assets/image/logo.json";
import Lottie from "lottie-web";
import { Input } from "@mui/material";

const RootStyled = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  padding: "50px 0px",
}));

const DashboardFooter = (props) => {
   React.useEffect(() => {
     var params = {
       container: document.getElementById("logo-inm1"),
       renderer: "svg",
       loop: true,
       autoplay: true,
       animationData: RUPAYlogo,
     };

     var logoImg;

     logoImg = Lottie.loadAnimation(params);
   }, []);
    return (
      <RootStyled id="contactus" className="footer">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ margin: "20px 0px" }}>
                {/* <img src={Logo} height="50px" /> */}
                <NavLink to="/">
                  <Box
                    sx={{
                      alignItems: "center",
                      maxWidth: "230px",
                    }}
                    id="logo-inm1"
                  ></Box>
                </NavLink>
                <p>Your best crypto partner.</p>
                <Stack spacing={5} direction="row" mt={4} alignItems="center">
                  <a href="/" target="_blank">
                    <img src={"images/in.png"} height="21px" width="21px" />
                  </a>
                  <a href="" target="_blank">
                    <img src={"images/fb.png"} height="21px" width="12px" />
                  </a>
                  <a href="" target="_blank">
                    <img src={"images/insta.png"} height="18px" width="18px" />
                  </a>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ margin: "20px 0px" }} className="footer-link">
                <NavLink
                  // to="tokenomics"
                  to="/"
                >
                  Buy/Sell
                </NavLink>
                <NavLink to="/">Trade Now</NavLink>
                <NavLink to="/">Pricing</NavLink>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box sx={{ margin: "20px 0px" }} className="footer-link">
                <NavLink to="/">Wallets</NavLink>
                <NavLink to="/">Company</NavLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ marginTop: {md:"100px",xs:"50px"} }}>
                <p>
                  Subscribe to get update and notify our exchange and products
                </p>
                <Box className="footer-email">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    disableUnderline={true}
                    sx={{ width: { md: "81%", xs: "78%" } }}
                  />
                  <Button
                    className="sent"
                    // variant="outlined"
                  >
                    Sent
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={12} sm={6} md={7}></Grid>
            {/* <Grid item sx={12} sm={6} md={5}>
            <Typography variant="h6" mb={3}>
              Newsletter
            </Typography>
            <Stack direction="row" spacing={3}>
              <TextField
                sx={{ background: "white", borderRadius: 1 }}
                placeholder="user@email.com"
              />
              <Button size="large" variant="containedDark" color="">
                Subscribe
              </Button>
            </Stack>
          </Grid> */}
          </Grid>
        </Container>
      </RootStyled>
    );
};

export default DashboardFooter;
