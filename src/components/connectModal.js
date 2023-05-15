import React, { useState } from "react";
// import { modalAction } from "../redux/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "./spinner";
import closeIcon from "../assets/CloseIcon.svg";
// import { tokenApprove } from "../utility/contractMethods/token";
// import {
//     depositToken,
//     depositTokenReferral,
// } from "../utility/contractMethods/stack";
import { showToastMessage } from "../redux/actions/toastNotification";
// import { addData } from "../service/index";
// import { addUser, UserDeposit } from "../service/index";
import { Button } from "react-bootstrap";
const ConnectModal = (props) => {
    return (
        <div className="card-shadows">
            <div className="wallet-card">
                <div className="wallet-header">
                    <p>Connect Wallet</p>
                    <p className="close" onClick={props.close}>
                        <img src={closeIcon} alt="closeIcon" />
                    </p>
                </div>
                <Button
                    className="modal-btn"
                    onClick={(e) => {
                        props.setWalletType("METAMASK");
                        props.close();
                    }}
                    // onClick={openModal}
                >
                    <svg
                        viewBox="0 0 40 40"
                        width="40px"
                        color="text"
                        xmlns="http://www.w3.org/2000/svg"
                        class="sc-bdnxRM la-Dshj"
                    >
                        <path
                            d="M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z"
                            fill="#E17726"
                        ></path>
                        <path
                            d="M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z"
                            fill="#E27625"
                        ></path>
                        <path
                            d="M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z"
                            fill="#D5BFB2"
                        ></path>
                        <path
                            d="M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z"
                            fill="#D5BFB2"
                        ></path>
                        <path
                            d="M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z"
                            fill="#233447"
                        ></path>
                        <path
                            d="M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z"
                            fill="#233447"
                        ></path>
                        <path
                            d="M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z"
                            fill="#CC6228"
                        ></path>
                        <path
                            d="M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z"
                            fill="#CC6228"
                        ></path>
                        <path
                            d="M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z"
                            fill="#CC6228"
                        ></path>
                        <path
                            d="M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z"
                            fill="#CC6228"
                        ></path>
                        <path
                            d="M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z"
                            fill="#E27525"
                        ></path>
                        <path
                            d="M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z"
                            fill="#E27525"
                        ></path>
                        <path
                            d="M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z"
                            fill="#E27525"
                        ></path>
                        <path
                            d="M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z"
                            fill="#E27525"
                        ></path>
                        <path
                            d="M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z"
                            fill="#F5841F"
                        ></path>
                        <path
                            d="M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z"
                            fill="#F5841F"
                        ></path>
                        <path
                            d="M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z"
                            fill="#C0AC9D"
                        ></path>
                        <path
                            d="M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z"
                            fill="#161616"
                        ></path>
                        <path
                            d="M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z"
                            fill="#763E1A"
                        ></path>
                        <path
                            d="M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z"
                            fill="#763E1A"
                        ></path>
                        <path
                            d="M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z"
                            fill="#F5841F"
                        ></path>
                        <path
                            d="M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z"
                            fill="#F5841F"
                        ></path>
                        <path
                            d="M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z"
                            fill="#F5841F"
                        ></path>
                    </svg>
                    Meta Mask
                </Button>
                <Button
                    className="modal-btn"
                    onClick={(e) => {
                        props.setWalletType("METAMASK");
                        props.close();
                    }}
                    // onClick={openModal}
                >
                    <img src="https://raw.githubusercontent.com/dhavalmp194/crypto-icons/main/cryptocurrency-icons-master/32179889.png" />
                    &nbsp; Trust Wallet
                </Button>
                <Button
                    className="modal-btn"
                    onClick={(e) => {
                        props.setWalletType("BINANCE");
                        props.close();
                    }}
                >
                    <svg
                        viewBox="0 0 40 40"
                        width="40px"
                        color="text"
                        xmlns="http://www.w3.org/2000/svg"
                        class="sc-bdnxRM la-Dshj"
                    >
                        <path
                            d="M14.2487 9.59637L10.7888 7.58546L20.1999 2.08337L29.6387 7.58546L26.1787 9.59637L20.1999 6.13313L14.2487 9.59637ZM32.1022 13.0596V17.1094L35.5622 15.0985V11.0487L32.1022 9.00986L28.6422 11.0208L32.1022 13.0596ZM16.7399 11.0487L20.1999 13.0596L23.6599 11.0487L20.1999 9.00986L16.7399 11.0487ZM29.6387 14.5119L26.1787 12.501L20.1999 15.9643L14.2487 12.501L10.7888 14.5119V18.5617L16.7399 22.0249V28.9514L20.1999 30.9623L23.6599 28.9514V22.0249L29.6387 18.5617V14.5119ZM32.1022 26.9405L26.1511 30.4038V34.4535L35.5899 28.9514V17.9752L32.1022 20.014V26.9405ZM26.1511 27.527L29.611 25.5161V21.4384L26.1511 23.4493V27.527ZM16.7399 31.8561V35.9058L20.1999 37.9168L23.6599 35.9058V31.8561L20.1999 33.867L16.7399 31.8561ZM4.80992 15.0985L8.2699 17.1094V13.0596L11.7299 11.0487L8.29758 9.00986L4.8376 11.0208V15.0985H4.80992ZM8.29758 20.014L4.8376 18.0031V28.9794L14.2764 34.4814V30.4317L8.29758 26.9405V20.014ZM14.2487 23.4773L10.7888 21.4664V25.5161L14.2487 27.527V23.4773Z"
                            fill="#F1BA0D"
                        ></path>
                    </svg>
                    Binance &nbsp;&nbsp;&nbsp;
                </Button>
                <Button
                    className="modal-btn"
                    onClick={(e) => {
                        props.setWalletType("WALLET-CONNECT");
                        props.close();
                    }}
                >
                    <svg
                        viewBox="0 0 40 40"
                        width="40px"
                        color="text"
                        xmlns="http://www.w3.org/2000/svg"
                        class="sc-bdnxRM la-Dshj"
                    >
                        <path
                            d="M14.2487 9.59637L10.7888 7.58546L20.1999 2.08337L29.6387 7.58546L26.1787 9.59637L20.1999 6.13313L14.2487 9.59637ZM32.1022 13.0596V17.1094L35.5622 15.0985V11.0487L32.1022 9.00986L28.6422 11.0208L32.1022 13.0596ZM16.7399 11.0487L20.1999 13.0596L23.6599 11.0487L20.1999 9.00986L16.7399 11.0487ZM29.6387 14.5119L26.1787 12.501L20.1999 15.9643L14.2487 12.501L10.7888 14.5119V18.5617L16.7399 22.0249V28.9514L20.1999 30.9623L23.6599 28.9514V22.0249L29.6387 18.5617V14.5119ZM32.1022 26.9405L26.1511 30.4038V34.4535L35.5899 28.9514V17.9752L32.1022 20.014V26.9405ZM26.1511 27.527L29.611 25.5161V21.4384L26.1511 23.4493V27.527ZM16.7399 31.8561V35.9058L20.1999 37.9168L23.6599 35.9058V31.8561L20.1999 33.867L16.7399 31.8561ZM4.80992 15.0985L8.2699 17.1094V13.0596L11.7299 11.0487L8.29758 9.00986L4.8376 11.0208V15.0985H4.80992ZM8.29758 20.014L4.8376 18.0031V28.9794L14.2764 34.4814V30.4317L8.29758 26.9405V20.014ZM14.2487 23.4773L10.7888 21.4664V25.5161L14.2487 27.527V23.4773Z"
                            fill="#F1BA0D"
                        ></path>
                    </svg>
                    Wallet Connect &nbsp;&nbsp;&nbsp;
                </Button>
            </div>
        </div>
    );
};
export default ConnectModal;
