import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState,useEffect } from 'react';
import Card from './card';


const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [pageReloaded, setPageReloaded] = useState(false);

  
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check wallet connection status here
      // If wallet is connected and page has not been reloaded, set modalOpen to false and reload the page
      if (!pageReloaded) {
      //  window.location.reload();
      setModalOpen(false);
      }
    };
    checkWalletConnection();
  }, []);


  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleContributeClick = () => {
    // handle the contribute action here
  };

  const handleApproveClick = () => {
    // handle the approve action here
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }}>
      <ConnectButton />
        <button
        
          className="button"
          onClick={toggleDarkMode}
          style={{
            color: 'black',
            display: 'flex', 
            justifyContent: 'flex-end', 
            backgroundColor: 'white',
            borderRadius: '11px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginLeft: '8px',
            padding: '12px',
            paddingRight: '8px',
            fontWeight: 'bold',
          }}
        >
          Toggle Dark/Light
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%'  }}>
        <Card />
      </div>
    </div>
  );
};

export default App;
