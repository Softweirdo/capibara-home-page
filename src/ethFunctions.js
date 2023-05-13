import Web3 from 'web3';
import { ABI_BUSD,ABI_PRESALE } from './ABIs';

const BUSD_ADDRESS = '0x5d5789924BF6E011454F84292d499c8860532E56'
const PRESALE_ADDRESS = '0x559ff7EF9165a87cb5F7A9e45EBDa3A86Fa0DE94'

export const getContribution = async (address) => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_PRESALE, PRESALE_ADDRESS);

  // Call the contribution function using the contract instance
  const contribution = await contract.methods.contribution(address).call();

  // Return the contribution
  return contribution;
};

// Buys from the presale contract
export const buyFromPresale = async (amount) => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_PRESALE, PRESALE_ADDRESS);

  // Call the Buy function using the contract instance
  const tx = await contract.methods.Buy(amount).send({
    from: account,
  });

  console.log(`Transaction hash: ${tx.transactionHash}`);
};

// Returns the balance of BUSD in the connected account's wallet
export const getBUSDBalance = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the balanceOf function using the contract instance
  const balance = await contract.methods.balanceOf(account).call();

  // Return the balance
  return balance;
};

// Returns the balance of BUSD in the connected account's wallet
export const getBUSDcontractBalance = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get contract
  const account = PRESALE_ADDRESS;

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the balanceOf function using the contract instance
  const balance = await contract.methods.balanceOf(account).call();

  // Return the balance
  return balance;
};


// returns a bool to determine if approved

export const isApproved = async (spender) => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Create an instance of the contract using the ABI
  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the allowance function using the contract instance
  const allowance = await contract.methods.allowance(account, PRESALE_ADDRESS).call();
  
  console.log("spender ", spender)
  console.log("account ", account)
  console.log("allowance ", allowance)
  // Return true if the allowance is greater than 0, false otherwise
  return allowance > 0;
};

// gets the account that is connected to the presale dapp

export const getConnectedAccount = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);

  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  return account;
};


// sending approve to the presale contract

export const handleApproveClick = async () => {
  // Create a Web3 instance
  const web3 = new Web3(window.ethereum);


  // Get the current account
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const contract = new web3.eth.Contract(ABI_BUSD, BUSD_ADDRESS);

  // Call the approve function using the contract instance
  const tx = await contract.methods.approve(PRESALE_ADDRESS, web3.utils.toTwosComplement('-1')).send({
    from: account,
  });

  console.log(`Transaction hash: ${tx.transactionHash}`);
};
