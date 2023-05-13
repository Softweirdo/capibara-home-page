import React from 'react';

import './index.css';
import { handleApproveClick, getContribution, isApproved, getConnectedAccount, getBUSDBalance, buyFromPresale, getBUSDcontractBalance } from './ethFunctions';
import Web3 from 'web3';
import { useEffect, useState, useRef } from 'react';

export default function CardWithInputAndButtons() {
    const [approved, setApproved] = useState(false);
    const [balance, setBalance] = useState('');
    const [contractBalance, setContractBalance] = useState('');
    const [contribution, setContribution] = useState('');
    const [amount, setAmount] = useState('');  // update the type here

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const wei = Web3.utils.toWei(value);
        setAmount(wei);  // update the value here
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const handleBuyClick = () => {
        // Perform buy logic here...
        buyFromPresale(amount);
      
        // Clear the input field after 1 second
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }, 3000);  // 1000 milliseconds = 1 second
      };
      

    useEffect(() => {
        async function fetchData() {
            const account = await getConnectedAccount();
            const approval = await isApproved(account);
            console.log(approval,account)
            setApproved(approval);
              // Get the balance of BUSD in the connected account's wallet
              const balance = await getBUSDBalance();
              const ETHbalance = Web3.utils.fromWei(balance);
              setBalance(parseFloat(ETHbalance).toLocaleString('en-US', { minimumFractionDigits: 2 }));
              
              // Get the balance of BUSD in the connected account's wallet
              const contractBalance = await getBUSDcontractBalance();
              const ETHcontractBalance = Web3.utils.fromWei(contractBalance);
              setContractBalance(parseFloat(ETHcontractBalance).toLocaleString('en-US', { minimumFractionDigits: 2 }));

                // Get the contribution of the connected account
              const contribution = await getContribution(account);
              const ETHcontribution = Web3.utils.fromWei(contribution);
              setContribution(parseFloat(ETHcontribution).toLocaleString('en-US', { minimumFractionDigits: 2 }));
          }
      fetchData();
    }, []);
    
    console.log(setApproved)
  return (
    <div className="card mb-3 - blue-bg">
      <div className="card-body">
        <h5 className="card-title">Seed Sale for Droplits</h5>
        <p className="card-text">
          Total contribution {contractBalance} BUSD
        </p>
        <p className="card-text">
          Your contribution {contribution} BUSD
        </p>
        <p className="card-text">
          Your balance {balance} BUSD
        </p>
        <p className="card-text">
        Choose your contribution amount
        </p>
        <p className="card-text">
        Click 'Approve' and then 'Buy'
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '35%',
            margin: 'auto',
          }}
        >
          <input
            type="number"
            min="0"
            max="1000"
            step="10"
            className="form-control"
            placeholder="Input field"
            onChange={handleAmountChange} // added
            ref={inputRef}
          />
          <div
            className="mt-3"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
     
            {approved ? null : (
            <button
              type="button"
              className="btn btn-primary mr-3"
              style={{ marginTop: '10px', width: '100%', marginBottom: '10px',  }}
              onClick={handleApproveClick}
            >
              Approve
            </button>
          )}
            {!approved ? null : (
            <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
            onClick={handleBuyClick}
            
        >
            Buy
        </button>

             )}
          </div>
        </div>
      </div>
    </div>
  );
}
