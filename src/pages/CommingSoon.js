import { Container, Divider, Box, Grid, TextField, Button, TextareaAutosize, FormControl, FormHelperText } from '@mui/material';
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
    textAlign: 'center',
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
        marginRight: '10px'
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

const CommingSoon = () => {
    

    return (
      <Container maxWidth="lg">
        <ContainerDiv>
          <Box sx={{ mt: 10 }}>
            <Grid container direction="row">
              <h1 style={{ margin: "auto" }}>Coming Soon</h1>
            </Grid>
          </Box>
        </ContainerDiv>
      </Container>
    );
}

export default CommingSoon;