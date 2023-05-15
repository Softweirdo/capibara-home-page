// import {
//     getOwnerAddress
// } from "../utility/contractMethods/stackFactoryConract";

// const AdminAddress;
// getOwnerAddress().then(data => {
//     console.log('%c 🥘 data: ', 'font-size:20px;background-color: #B03734;color:#fff;', data);
//     AdminAddress = data;
//     return data;
// })
// export let AdminAddress;

// getOwnerAddress().then(data => {
//     AdminAddress = data;
// })

module.exports = {
    chainId: 56,
    IcoAddress: "0x3561D038Bc717800887f6C9c7D191Ec7cBA010B3",
    IcoAddressOld: "0xFDfc1233526726Fb93cb395337594bFf493110e5",
    VestingAddress: "0x65e3Caa9a97eBF783f7c343D9F3A7c92d4400Ac1",
    date: "2021-12-23",

    scanUrl: "https://bscscan.com/address",
    scanUrlTx: "https://bscscan.com/tx",
    serverUrl: "https://6npxnxsne1.execute-api.us-east-2.amazonaws.com/dev",
    SERVER_URL: "https://707bx22ka7.execute-api.us-east-2.amazonaws.com/dev",
    EMAIL_PATTERN: /^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,
};
