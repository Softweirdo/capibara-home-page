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
    marginTop: '0px'
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

const ContactUs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=> {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
    },[])
    const SignupSchema = Yup.object().shape({
      name: Yup.string().required("Filed can not be empty"),
      email: Yup.string()
        .email("Invalid email")
        .required("Filed can not be empty"),
      message: Yup.string().required("Filed can not be empty"),
      mobile: Yup.string().required("Filed can not be empty"),
    });

    const formik = useFormik({
        initialValues: {
            name:"",
            email: '',
            mobile: '',
            message: '',
        },
        validationSchema:SignupSchema,
        onSubmit: (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try{
             const requestBody = {
                 data:{
                     name:values.name,
                     email: values.email,
                     phone: values.mobile,
                     message: values.message
                    }
             }
             contactus(requestBody)
            .then(response => {
              dispatch(showToastMessage(response.message, 'success'))
              setStatus({ success: false });
              setSubmitting(false);
              formik.resetForm();  
            }, error => {   
             setStatus({ success: false });
             setSubmitting(false);
               dispatch(showToastMessage("something went wrong !", 'error'))
            })
         }
         catch (error){
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
         }
        },
      });

    return (
      <Container maxWidth="lg">
        <ContainerDiv>
          <Box>
            <h1>Contact Us</h1>
            <DividerStyled
              color="primary"
              width="50px"
              sx={{ backgroundColor: "", padding: "1px" }}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Grid container direction="row">
              <Grid item xs={12} md={6}>
                <form onSubmit={formik.handleSubmit}>
                  <TextFiledBox>
                    <TextFiledLabel htmlFor="name">
                      <img src={userIcon} />
                      Name
                    </TextFiledLabel>
                    <TextFiledStyled
                      fullWidth
                      placeholder="Enter your name"
                      size="medium"
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      helperText={
                        formik.errors.name && formik.touched.name
                          ? formik.errors.name
                          : ""
                      }
                      error={Boolean(formik.errors.name)}
                    />
                  </TextFiledBox>
                  <TextFiledBox>
                    <TextFiledLabel htmlFor="email">
                      <img src={emailIcon} />
                      Email Address
                    </TextFiledLabel>
                    <TextFiledStyled
                      fullWidth
                      placeholder="Enter your email"
                      size="medium"
                      id="email"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      helperText={
                        formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : ""
                      }
                      error={Boolean(formik.errors.email)}
                    />
                  </TextFiledBox>
                  <TextFiledBox>
                    <TextFiledLabel htmlFor="mobile">
                      <img src={phoneIcon} />
                      Phone Number
                    </TextFiledLabel>
                    {/* <TextFiledStyled
                                        fullWidth
                                        placeholder="Enter your phone number"
                                        size="medium"
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.mobile}
                                        helperText={formik.errors.mobile && formik.touched.mobile ? formik.errors.mobile: ""}
                                        error={Boolean(formik.errors.mobile)}
                                        /> */}
                    <FormControl
                      error={Boolean(formik.errors.mobile)}
                      fullWidth
                    >
                      <MUiPhoneNumberStyled
                        sx={{ marginTop: "10px" }}
                        error={Boolean(formik.errors.mobile)}
                        value={formik.values.mobile}
                        size="medium"
                        variant="outlined"
                        name="mobile"
                        // autoFormat={false}
                        defaultCountry={"us"}
                        onChange={(value) =>
                          formik.setFieldValue("mobile", value)
                        }
                        countryCodeEditable={true}
                      />
                      <FormHelperText>
                        {formik.errors.mobile && formik.touched.mobile
                          ? formik.errors.mobile
                          : ""}
                      </FormHelperText>
                    </FormControl>
                  </TextFiledBox>
                  <TextFiledBox>
                    <TextFiledLabel htmlFor="lastName">
                      <img src={messageIcon} />
                      Message
                    </TextFiledLabel>
                    <FormControl
                      error={Boolean(formik.errors.message)}
                      fullWidth
                    >
                      <TextAreaStyled
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Message"
                        name="message"
                        type="text"
                        onChange={formik.handleChange}
                        // style={{ width: 200 }}
                        value={formik.values.message}
                        // helperText={formik.errors.mobile && formik.touched.mobile ? formik.errors.mobile: ""}
                        // error={Boolean(formik.errors.mobile)}
                      />
                      <FormHelperText>
                        {formik.errors.message && formik.touched.message
                          ? formik.errors.message
                          : ""}
                      </FormHelperText>
                    </FormControl>
                  </TextFiledBox>

                  <TextFiledBox sx={{ mt: 3 }}>
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </TextFiledBox>
                </form>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src={contactusImg} />
              </Grid>
            </Grid>
          </Box>
        </ContainerDiv>
      </Container>
    );
}

export default ContactUs;