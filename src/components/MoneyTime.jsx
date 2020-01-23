import React, { useState } from 'react';
import axios from 'axios';

require('dotenv').config();

function MoneyTime() {

  // Set dummy data for dev and test
  // TODO: Use MongoDB Atlas as data source.
  const [topTenCoins, setTopTenCoins] = useState([
    {name: 'Bitcoin', id: 1,currentPrice: 12628.123 },
    {name: 'Ethereum', id: 1027, currentPrice: 244.863 },
    {name: 'XRP', id: 52, currentPrice: 0.344 },
    {name: 'Bitcoin Cash', id: 1831, currentPrice: 500.125 },
    {name: 'Bitcoin SV', id: 3602, currentPrice: 459.981 } ,
    {name: 'Tether', id: 825, currentPrice: 1.459 },
    {name: 'Litecoin', id: 2, currentPrice: 84.060 } ,
    {name: 'EOS', id: 1765, currentPrice: 5.338 } ,
    {name: 'Binance Coin', id: 1839, currentPrice: 25.534 },
    {name: 'Stellar', id: 512, currentPrice: 0.091 }
  ]);
  // For editing transactions
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState([-1, -1]);
  const [unitToEdit, setUnitToEdit] = useState(null);
  const [priceToEdit, setPriceToEdit] = useState(null);

  // For selecting and purchasing coins
  const [selectedCoinId, setSelectedCoinId] = useState(0);
  const [unitToBuy, setUnitToBuy] = useState(0);
  const [totalCostToBuy, setTotalCostToBuy] = useState(0);

  // For updating current value
  const [updateTime, setUpdateTime] = useState('N/A');
  const [currentValueOfAll, setCurrentValueOfAll] = useState('N/A');

  // All Transaction History (with test data);
  const [transactions, setTransactions] = useState([
    {
      name: 'Bitcoin',
      id: 1,
      currentPrice: null,
      history: [
        {
          unit: 1,
          purchasePrice: 13000
        },
        {
          unit: 2,
          purchasePrice: 12000
        },
        {
          unit: 3,
          purchasePrice: 11000
        }]
    },
    {
      name: 'Ethereum',
      id: 1027,
      currentPrice: null,
      history: [
        {
          unit: 4,
          purchasePrice: 800
        },
        {
          unit: 5,
          purchasePrice: 600
        },
        {
          unit: 6,
          purchasePrice: 500
        }]
    }
  ]);

  function calTotalUnitPerType (index)  {
    let sum = 0;
    transactions[index].history.forEach(tran => {
      sum += +tran.unit;
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

  function calTotalCostOfAll() {
    let sum = 0;
    if (transactions.length > 0) {
      transactions.forEach(tran => {
        tran.history.forEach(tran => {
          sum += tran.unit * tran.purchasePrice;
        });
      })
    }
    return sum;
  };

  async function calCurrentValueOfAll(e) {
    e.preventDefault();
    if (transactions.length > 0) {
      let sum = 0;
      let idArr = [];
      transactions.forEach(tran => {
        console.log(tran.id)
        idArr.push(tran.id);
      });
      console.log(idArr);

      // Fetch current value
      const res = await axios.get(`http://localhost:1368/current?idArr=${idArr}`);

      let data = res.data.data;
      transactions.forEach((tran, index) => {
        tran.currentPrice = data[tran.id].quote.AUD.price;
        sum += calTotalUnitPerType(index) * tran.currentPrice;
      });

      setCurrentValueOfAll(sum);
    }
  }

  function onDelete(tranIndex, historyIndex) {
    const newTransactions =  [...transactions];

    newTransactions[tranIndex].history.splice(historyIndex, 1);

    if (newTransactions[tranIndex].history.length === 0) {
      newTransactions.splice(tranIndex, 1);
    };

    setTransactions(newTransactions);
  };

  function onSave(tranIndex, historyIndex) {
    console.log(tranIndex);
    console.log(historyIndex);
    //
    const newTransactions =  [...transactions];
    console.log(newTransactions)
    newTransactions[tranIndex].history[historyIndex].unit = unitToEdit;
    newTransactions[tranIndex].history[historyIndex].purchasePrice = priceToEdit;
    setTransactions(newTransactions);

    // Roll back to normal mode
    setIsEditing(false)
    setEditingCardIndex([-1, -1]);

  };

  function onEdit(tranIndex, historyIndex) {
    console.log(tranIndex);
    console.log(historyIndex);
    if (isEditing)
      return alert('Please only edit one in a time.')

    setIsEditing(true);
    setEditingCardIndex([tranIndex, historyIndex]);

    setUnitToEdit(transactions[tranIndex].history[historyIndex].unit);
    setPriceToEdit(transactions[tranIndex].history[historyIndex].purchasePrice);

  };

  function handleFormUnitChange(e) {
    setUnitToEdit(e.target.value);
  }
  function handleFormPriceChange(e) {
    setPriceToEdit(e.target.value);
  }


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
      let id = item.id;
      let currentPrice = item.quote.AUD.price;
      newTopTenCoins.push({name, id, currentPrice});
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

      // Add transaction record into History
      const index = transactions.findIndex(item => item.name === topTenCoins[selectedCoinId].name)
      // Check whether have purchased this type of crypto
      if (index === -1) {
        const  newTransactions = [
          ...transactions,
          {
            name: topTenCoins[selectedCoinId].name,
            id: topTenCoins[selectedCoinId].id,
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

      <div className="row">
        <div className="col">
          <div className="alert alert-success" role='alert'>
            <p>Total Money you have invested: A${calTotalCostOfAll()}. </p>
            <p>And your assets are now worth: A${currentValueOfAll}. </p>
            <button  className='primary alert-primary'  onClick={event => calCurrentValueOfAll(event)}>Update Current Value</button>
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
              ID: {topTenCoins[index].id}.
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

      {/*Transaction History*/}
      <div className="alert alert-success" role='alert'>
        <p>Transactions History:</p>
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

                  { (tranIndex === editingCardIndex[0] && historyIndex === editingCardIndex[1]) ?

                    // Render edit mode:
                    <div>
                      <label>Unit: </label>
                      <input
                        type= "number"
                        value={ unitToEdit }
                        onChange={handleFormUnitChange}
                      />
                      <label htmlFor={ tran.purchasePrice }>Purchase Price: </label>
                      <input
                        type= "number"
                        value={ priceToEdit }
                        onChange={handleFormPriceChange}

                      />
                      <button type="button" className="btn btn-primary" onClick={() => onSave(tranIndex, historyIndex)}>Save</button>
                    </div>
                    :
                    //  Render normal mode:
                    <div>
                      <p>Unit: { tran.unit }</p>
                      <p>Purchase Price: { tran.purchasePrice }</p>
                      <p>Total Price: { tran.unit * tran.purchasePrice }</p>
                      <button
                        type="button"
                        className="alert alert-danger"
                        onClick={() => onDelete(tranIndex, historyIndex)}
                      >Delete</button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onEdit(tranIndex, historyIndex)}
                      >Edit</button>
                    </div>


                  }

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default MoneyTime;
