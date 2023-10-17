import React, { useState, useEffect } from 'react';

function App() {
  const [bitcoinValue, setBitcoinValue] = useState(0);
  const [ethereumValue, setEthereumValue] = useState(0);
  const [rubliValue, setRubliValue] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    // Fetch data from CoinGecko API when the component mounts
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=btc%2Ceth%2Ceur%2Crub&include_last_updated_at=true')
      .then(response => response.json())
      .then(data => {
        setCoinData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const exchangeEuro = (argEuroValue) => {
    const euro = parseFloat(argEuroValue);
    let usd = 0;
    
    if (isNaN(euro) || euro <= 0) {
      // Handle invalid input
      setBitcoinValue(0);
      setEthereumValue(0);
      setRubliValue(0);
      setUsdValue(0);
      setLastUpdated('Invalid input, please enter a number');
    } else if (coinData) {
      // Use fetched data for calculations
      
      const euroToUsd = 1 / coinData.usd.eur;
      usd = euro * euroToUsd;
      
      setUsdValue((euro * euroToUsd));
      
      setBitcoinValue((usd * coinData.usd.btc));
      setEthereumValue((usd * coinData.usd.eth));
      setRubliValue((usd * coinData.usd.rub));

      setLastUpdated(new Date(coinData.usd.last_updated_at).toLocaleTimeString('en-US') + ' in GMT');
    }
    
  };

  return (
    <div>
      <label>
        Type the value in euros : <br />
        <input
          onChange={e => exchangeEuro(e.target.value) }
          type="text"
          id="euro"
        />
      </label>
      <br />
      <span>Bitcoin</span> <span>{bitcoinValue}</span>
      <br />
      <span>Ethereum</span> <span>{ethereumValue}</span>
      <br />
      <span>Rubli</span> <span>{rubliValue}</span>
      <br />
      <span>USD</span> <span>{usdValue}</span>
      <br />
      <span>Last Prices updated at</span> <span>{lastUpdated}</span>
    </div>
  );
}

export default App;