import React, { useState } from 'react';
import axios from 'axios';

require('dotenv').config();

function MoneyTime() {

  // Set dummy data for dev and test
  // TODO: Use MongoDB Atlas as data source.
  const [topTenCoins, setTopTenCoins] = useState([
    {name: 'Bitcoin', currentPrice: 12628.123 },
    {name: 'Ethereum',  currentPrice: 244.863 },
    {name: 'XRP', currentPrice: 0.344 },
    {name: 'Bitcoin Cash', currentPrice: 500.125 },
    {name: 'Bitcoin SV', currentPrice: 459.981 } ,
    {name: 'Tether', currentPrice: 1.459 },
    {name: 'Litecoin', currentPrice: 84.060 } ,
    {name: 'EOS', currentPrice: 5.338 } ,
    {name: 'Binance Coin', currentPrice: 25.534 },
    {name: 'Stellar', currentPrice: 0.091 }
  ]);
  const [selectedCoinId, setSelectedCoinId] = useState(0);
  const [unitToBuy, setUnitToBuy] = useState(0);
  const [updateTime, setUpdateTime] = useState('N/A')
  const [totalCostToBuy, setTotalCostToBuy] = useState(0);
  const [transactions, setTransactions] = useState([
    {
      name: 'Bitcoin',
      history: [
        {
          id: 1,
          unit: 1,
          purchasePrice: 13000
        },
        {
          id: 2,
          unit: 3,
          purchasePrice: 12000
        },
        {
          id: 3,
          unit: 5,
          purchasePrice: 11000
        }]
    },
    {
      name: 'Ethereum',
      history: [
        {
          id: 4,
          unit: 1,
          purchasePrice: 800
        },
        {
          id: 5,
          unit: 2,
          purchasePrice: 600
        },
        {
          id: 6,
          unit: 3,
          purchasePrice: 500
        }]
    }
  ]);

  function calTotalUnitPerType (index)  {
    let sum = 0;
    transactions[index].history.forEach(tran => {
      sum += tran.unit;
    });
    return sum;
  };

  function calTotalPaidPerType (index)  {
    let sum = 0;
    transactions[index].history.forEach(tran => {
      sum += tran.unit * tran.purchasePrice;
    });
    return sum;
  };

  function calTotalOfAll() {
    let sum = 0;
    if (transactions.length > 0) {
      transactions.forEach((tran, index) => {
        transactions[index].history.forEach(tran => {
          sum += tran.unit * tran.purchasePrice;
        });
      })
    }
    return sum;
  };

  function onDelete(tranIndex, historyIndex) {
    const newTransactions =  [...transactions];

    newTransactions[tranIndex].history.splice(historyIndex, 1);

    if (newTransactions[tranIndex].history.length === 0) {
      newTransactions.splice(tranIndex, 1);
    };

    setTransactions(newTransactions);
    console.log(transactions)
    // console.log(historyIndex)
  };

  async function fetchCryptoAPI(e) {
    e.preventDefault();
    console.log('Fetching Crypto API...');

    // Below did not work very well since too many request in a shot time will let the app get banned
    // const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=aud');

    // Use local proxy to fetch data since coinmarketcap.com bans Front End request using Node.js
    const res = await axios.get('http://localhost:1368/api');
    console.log(res.data.data);

    let newTopTenCoins = [];
    res.data.data.forEach(item => {
      let name = item.name;
      let currentPrice = item.quote.AUD.price;
      newTopTenCoins.push({name, currentPrice});
    });
    setTopTenCoins(newTopTenCoins);
    setUpdateTime(new Date(res.data.data[0].last_updated).toLocaleString());
  }

  function CalculateTotalPurchaseCost(e) {
    e.preventDefault();
    if (unitToBuy > 0) {
      let sum = 0;
      console.log(selectedCoinId);
      sum = topTenCoins[selectedCoinId].currentPrice * unitToBuy;
      setTotalCostToBuy(sum);
    } else {
      alert('Please enter some number to BuyBuyBuy~~~');
    }
  }

  function handleBuyBuyBuy(e) {
    e.preventDefault();
    if (unitToBuy > 0) {

      const index = transactions.findIndex(item => item.name === topTenCoins[selectedCoinId].name)
      if (index === -1) {
        const  newTransactions = [
          ...transactions,
          {
            name: topTenCoins[selectedCoinId].name,
            history: [{
              unit: unitToBuy,
              purchasePrice: topTenCoins[selectedCoinId].currentPrice
            }]
          }
        ];
        setTransactions(newTransactions);
      } else {
        const  newTransactionsPerType = {...transactions[index]};
        newTransactionsPerType.history.push({
          unit: unitToBuy,
          purchasePrice: topTenCoins[selectedCoinId].currentPrice
        })

        const newTransactions = [
          ...transactions.slice(0, index),
          newTransactionsPerType,
          ...transactions.slice(index + 1, transactions.length)
        ];

        setTransactions(newTransactions);
      };

    } else {
      alert('Please enter some number to BuyBuyBuy~~~');
    };

  };

  const cardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '1rem'
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Hey</h1>
        </div>
        <div className="col text-right">
          <h1>MoneyTime</h1>
        </div>
      </div>

      {/*Transaction History*/}
      <div className="row">
        <div className="col">
          <div className="alert alert-success" role='alert'>
            <p>Total Money you have paid: A${calTotalOfAll()}. Transactions History:</p>
            {transactions.map((item, tranIndex) =>
              <div key={tranIndex}>
                <h4 className='text-center'>
                  Coin Type: {transactions[tranIndex].name},
                  Unit Owned: { calTotalUnitPerType(tranIndex) },
                  Total Paid: { calTotalPaidPerType(tranIndex) }
                </h4>

                <div style = { cardStyle } >
                  { transactions[tranIndex].history.map((tran, historyIndex) =>
                    <div className='card text-center' key={historyIndex}>
                      <p>ID: { tran.id || 'N/A' }</p>
                      <p>Unit: { tran.unit }</p>
                      <p>Purchase Price: { tran.purchasePrice }</p>
                      <p>Total Price: { tran.unit * tran.purchasePrice }</p>
                      <button className='alert alert-danger' onClick={() => onDelete(tranIndex, historyIndex)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*Top ten coins*/}
      <div>
        <h3>Top Ten Coins: (Last update at: {updateTime})</h3><button  className='primary alert-primary'  onClick={(e) => fetchCryptoAPI(e)}>Update coins and prices</button>
        <ol>
          {topTenCoins.map((coin, index) =>
            <li key={index}>
              Name: {topTenCoins[index].name}.
              Current Price: { topTenCoins[index].currentPrice || 'Not available. Please update.'}
            </li>
          )}
        </ol>
      </div>

      {/*  FORM */}
      <div>
        <form onSubmit={(e) => handleBuyBuyBuy(e)}>
          <label>
            <p>Pick your favorite Coin:</p>
            <select value={selectedCoinId} onChange={e => setSelectedCoinId(e.target.value)}>
              {topTenCoins.map((coin, index) =>
                <option key={index} value = {index}>{topTenCoins[index].name}</option>
              )}
            </select>
            <label>Unit to buy: </label>
            <input type="number" name="unit" onChange={e => setUnitToBuy(e.target.value)}/>
            <label>TotalCostToBuy: {totalCostToBuy}</label>
          </label>
          <button
            className='primary alert-success'
            onClick={(e) => CalculateTotalPurchaseCost(e)}
          >
            Calculate Total</button>
          <div>
            <button
              className='alert alert-danger'
              type="submit"
            >
              BuyBuyBuy</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default MoneyTime;
