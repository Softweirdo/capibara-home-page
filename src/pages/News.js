import { Container, Divider, Box, Grid, TextField, Button, TextareaAutosize, FormControl, FormHelperText, Typography } from '@mui/material';
import {breakpoints, styled } from '@mui/system';
import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MUiPhoneNumber from 'material-ui-phone-number';

import contactusImg from '../assets/images/contactus.png';
import phoneIcon from '../assets/images/phone.png';
import messageIcon from '../assets/images/message.png';
import emailIcon from '../assets/images/email-icon.png';
import userIcon from '../assets/images/userIcon.png';

import { Link } from 'react-router-dom';
import { PHONE_REGEX } from '../config';

import { signUp, contactus, getCountryCode } from '../api/apiService';
import { showToastMessage } from "../redux/actions/toastNotification";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const ContainerDiv = styled("div")(({theme})=> ({
    marginTop: '0px',
}))
const DividerStyled = styled(Divider)(({theme}) => ({
    background: theme.palette.primary.main,
    padding:'1px',
    width: '50px'
}))
const TextFiledBox = styled(Box)(({theme}) => ({
    width: '60%',
    margin: "20px 0px",
    "@media(max-width: 768px)":{
        width: '100%'
    }
}))

const TextFiledStyled = styled(TextField)
(({theme}) => ({
    ".MuiInputBase-root": {
        background: theme.palette.grey[1000],
    },
    margin: '10px 0px',
}))

const TextFiledLabel = styled('label')(({theme}) => ({
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    "> img": {
        width: "25px",
        marginTop: '10px'
    }
}))

const TextAreaStyled = styled(TextareaAutosize)(({theme}) => ({
    width: '100% !important',
    height: '100px !important',
    background: '#e0e0e0',
    border: '1px solid #bbbbbb',
    borderRadius: '8px',
    padding: '10px',
    marginTop: "10px",
    "@media(max-width: 768px)":{
        width: '100%'
    },
    ":focus": {
        border: '1px solid red !important',
    }
}))


const LinkBox = styled(Box)(({theme}) => ({
    "h5": {
        margin: '10px 0px'
    },
    
}))

const LinkStyled = styled(Link)(({theme}) => ({
    color: theme.palette.primary.main,
}))

const MUiPhoneNumberStyled = styled(MUiPhoneNumber)(({theme}) => ({
    '.MuiOutlinedInput-root':{
        background: theme.palette.grey[1000],
    }
}))

const News = () => {
    

    return (
      <Container maxWidth="lg">
        <ContainerDiv>
          <Box sx={{ mt: 5 }}>
            <Box sx={{ marginBottom: "40px" }}>
              <Typography variant="h2">News</Typography>
              <Divider
                sx={{
                  borderWidth: 4,
                  backgroundColor: "#FAD759",
                  borderRadius: "5px",
                }}
                width="130px"
              />
            </Box>
            <Grid container style={{ display: "block" }}>
              <h2>
                Earn Free Crypto with Fairface by Writing Reviews for
                Businesses.
              </h2>
              <a
                href={
                  "https://www.digitaljournal.com/pr/earn-free-crypto-with-fairface-by-writing-reviews-for-businesses"
                }
                target="_blank"
                style={{ display: "block" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  mt={2}
                  sx={{
                    marginTop: "15px",
                    height: "55px",
                  }}
                >
                  {" "}
                  Digital Journal
                </Button>
              </a>
              <a
                href={
                  "https://finance.yahoo.com/news/earn-free-crypto-fairface-writing-085000471.html"
                }
                target="_blank"
                style={{ display: "block" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  mt={2}
                  sx={{
                    marginTop: "15px",
                    height: "55px",
                  }}
                >
                  {" "}
                  Yahoo Finance
                </Button>
              </a>
              <a
                href={
                  "https://news.yahoo.com/news/earn-free-crypto-fairface-writing-085000471.html"
                }
                target="_blank"
                style={{ display: "block" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  mt={2}
                  sx={{
                    marginTop: "15px",
                    height: "55px",
                  }}
                >
                  {" "}
                  Yahoo News
                </Button>
              </a>
              <a
                href={
                  "https://money.yahoo.com/news/earn-free-crypto-fairface-writing-085000471.html"
                }
                target="_blank"
                style={{ display: "block" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  mt={2}
                  sx={{
                    marginTop: "15px",
                    height: "55px",
                  }}
                >
                  {" "}
                  Yahoo Money
                </Button>
              </a>
            </Grid>
          </Box>
        </ContainerDiv>
      </Container>
    );
}

export default News;