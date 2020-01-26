import React, { useState } from 'react';
import TransactionHistory from './TransactionHistory';
import TopCoins from "./TopCoins";
import PurchasePanel from "./PurchasePanel";

require('dotenv').config();

function MoneyTime() {

  // Showing top ten coins (with initial hardcoded data)
  const [topTenCoins, setTopTenCoins] = useState([
    {name: 'Bitcoin', id: 1, currentPrice: 12647.058451682824},
    {name: 'Ethereum', id: 1027, currentPrice: 245.17382970904882},
    {name: 'XRP', id: 52, currentPrice: 0.3435530530220539},
    {name: 'Bitcoin Cash', id: 1831, currentPrice: 503.2941101748042},
    {name: 'Bitcoin SV', id: 3602, currentPrice: 462.13046736163125},
    {name: 'Tether', id: 825, currentPrice: 1.4612764487611172},
    {name: 'Litecoin', id: 2, currentPrice: 84.80672594810672},
    {name: 'EOS', id: 1765, currentPrice: 5.311233640081649},
    {name: 'Binance Coin', id: 1839, currentPrice: 25.819805795833606},
    {name: 'Stellar', id: 512, currentPrice: 0.09170290621192892}
  ]);

  // For selecting and purchasing coins
  const [selectedCoinId, setSelectedCoinId] = useState(0);
  const [unitToBuy, setUnitToBuy] = useState(0);
  const [totalCostToBuy, setTotalCostToBuy] = useState(0);

  // All Transaction History (with initial hardcoded data)
  const [transactions, setTransactions] = useState([
    {
      name: 'Bitcoin',
      id: 1,
      currentPrice: null,
      history: [
        {
          unit: 1,
          purchasePrice: 13000.058451682824,
        },
        {
          unit: 2,
          purchasePrice: 12000.058451682824
        },
        {
          unit: 3,
          purchasePrice: 11000.058451682824
        }]
    },
    {
      name: 'Ethereum',
      id: 1027,
      currentPrice: null,
      history: [
        {
          unit: 4,
          purchasePrice: 800.17382970904882
        },
        {
          unit: 5,
          purchasePrice: 600.17382970904882
        },
        {
          unit: 6,
          purchasePrice: 500.17382970904882
        }]
    }
  ]);

  return (
    <div className="container">
      <TopCoins
        topTenCoins = {topTenCoins}
        setTopTenCoins = {setTopTenCoins}
      />

      <PurchasePanel
        setSelectedCoinId = { setSelectedCoinId }
        selectedCoinId = { selectedCoinId }
        topTenCoins = { topTenCoins }
        setUnitToBuy = { setUnitToBuy }
        totalCostToBuy = { totalCostToBuy }
        unitToBuy = { unitToBuy }
        setTotalCostToBuy = { setTotalCostToBuy }
        transactions = { transactions }
        setTransactions = { setTransactions }
      />

      <TransactionHistory
        transactions = {transactions}
        setTransactions = { setTransactions }
      />
    </div>
  )
};

export default MoneyTime;
